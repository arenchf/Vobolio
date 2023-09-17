import React, { useContext, useState } from "react";
import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import Flag, { flagByLanguage, flagOptions } from "../../models/Flag";
import Select, { SingleValue } from "react-select";
import { toast } from "react-toastify";
import axiosInstance from "../../axios";
import AuthContext from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";

function NewDictionaryPage() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [dictionary, setDictionary] = useState<{
        name: string;
        language: string;
    }>({ name: "", language: "es" });

    const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
        setDictionary({ ...dictionary, name: e.currentTarget.value });
    };

    const handleLanguageSelect = (newValue: SingleValue<Flag>) => {
        if (newValue)
            setDictionary({ ...dictionary, language: newValue?.value });
    };

    const handleCreateNewDictionary = () => {
        if (dictionary.name.length < 3) {
            toast.error("Dictionary's name must have atleast 3 characters.");
        } else {
            axiosInstance
                .post(
                    `api/v1/users/${auth?.user?.username}/dictionaries/`,
                    dictionary
                )
                .then((response) => {
                    console.log(response);
                    // dispatch(addDictionary(response.data));
                    toast.success("Dictionary created!");
                    // setNewDictionaryToggle(false);
                    navigate("/dictionaries");
                })
                .catch((error) => {
                    toast.error("An error while creating dictionary happened.");
                });
        }
    };

    return (
        <div className="flex-grow">
            <Navbar
                beforeTitle={
                    <button
                        className="btn btn-primary btn-sm btn-circle text-white"
                        onClick={() => navigate(-1)}
                    >
                        <IconArrowLeft></IconArrowLeft>
                    </button>
                }
            >
                New Dictionary
            </Navbar>
            <div className="max-w-lg m-auto flex flex-col gap-4">
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Dictionary Name</span>
                    </label>
                    <input
                        type="text"
                        placeholder="My Dictionary"
                        // name="email"
                        // value={editedUser.email}
                        onChange={handleNameInput}
                        className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                    />
                </div>
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Select Language</span>
                    </label>
                    <Select
                        onChange={handleLanguageSelect}
                        // menuIsOpen={true}
                        // className="!bg-front"
                        classNames={{
                            menu: () => "!bg-front",
                            option: ({ isFocused, isSelected }) =>
                                `${
                                    isFocused || isSelected ? "!bg-primary" : ""
                                }`,
                            control: ({ isFocused }) =>
                                ` !bg-front !text-text input input-bordered !rounded-lg p-0 !border-base-content !border-opacity-20 !shadow-none w-full ${
                                    isFocused ? "!ring-2 !ring-primary" : ""
                                }`,
                            singleValue: () =>
                                "!text-text flex flex-row gap-4 items-center text-lg",
                            input: () => "!text-text px-10 ",
                        }}
                        id="flagSelect"
                        defaultValue={flagByLanguage("es")}
                        options={flagOptions}
                    ></Select>
                </div>

                <button
                    onClick={handleCreateNewDictionary}
                    className="rounded-full btn-block btn-primary text-white btn mt-4"
                >
                    <IconPlus></IconPlus>
                    Create
                </button>
            </div>
        </div>
    );
}

export default NewDictionaryPage;

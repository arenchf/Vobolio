import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Dictionary from "../../models/Dictionary";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import Select, { SingleValue } from "react-select";
import { IconArrowLeft, IconPencil, IconX } from "@tabler/icons-react";
import Flag, { flagByLanguage, flagOptions } from "../../models/Flag";
import { editDc } from "../../slices/dcSlice";
import { useAppDispatch } from "../../store";
import Navbar from "../../components/Navbar/Navbar";

type RouteParams = {
    dictionaryId: string;
};

function EditDictionaryPage() {
    const { dictionaryId } = useParams<RouteParams>();
    const [dictionary, setDictionary] = useState<Dictionary | null>(null);
    const [original, setOriginal] = useState<Dictionary | null>(null);
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance
            .get(`api/v1/dictionaries/${dictionaryId}/`)
            .then((response) => {
                setOriginal(response.data);
                setDictionary(response.data);
                setIsLoading(false);
            })
            .catch((error) => toast.error("Error"));
    }, [dictionaryId]);

    const handleLanguageSelect = (newValue: SingleValue<Flag>) => {
        if (newValue && dictionary)
            setDictionary({ ...dictionary, language: newValue?.value });
    };

    const handleNameInput = (e: React.FormEvent<HTMLInputElement>) => {
        if (dictionary)
            setDictionary({ ...dictionary, name: e.currentTarget.value });
    };

    const handleDeleteDictionary = () => {
        toast.error("NOT IMPLEMENTED");
    };

    const handleEditDictionary = () => {
        if (dictionary)
            if (dictionary.name.length < 3) {
                toast.error(
                    "Dictionary's name must have atleast 3 characters."
                );
            } else {
                axiosInstance
                    .put(`api/v1/dictionaries/${original?.id}/`, {
                        language: dictionary.language,
                        name: dictionary.name,
                    })
                    .then((response) => {
                        console.log("response.data", response.data);
                        toast.success("Dictionary changed!");
                        dispatch(editDc(response.data));
                        navigate("/dictionaries");
                    })
                    .catch((error) => {
                        toast.error(
                            "An error while editing dictionary happened."
                        );
                    });
            }
    };

    return (
        <div className="flex-grow">
            <Navbar
                beforeTitle={
                    <button
                        className="btn btn-circle btn-primary btn-sm text-white"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <IconArrowLeft></IconArrowLeft>
                    </button>
                }
            >
                {isLoading ? `Loading` : `Edit ${dictionary?.name}`}
            </Navbar>
            <div className="max-w-lg m-auto flex flex-col gap-4">
                {!isLoading && original && dictionary ? (
                    <>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Dictionary Name
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="My Dictionary"
                                // name="email"
                                // value={editedUser.email}
                                defaultValue={dictionary.name}
                                onChange={handleNameInput}
                                className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                            />
                        </div>
                        {/* <Input
                            inputAttributes={{
                                placeholder: "My Dictionary",
                                onInput: handleNameInput,
                                defaultValue: dictionary.name,
                            }}
                            label="Dictionary Name:"
                            type="text"
                        /> */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Select Language
                                </span>
                            </label>
                            <Select
                                onChange={handleLanguageSelect}
                                // className="flag-select"
                                id="flagSelect"
                                classNames={{
                                    menu: () => "!bg-front",
                                    option: ({ isFocused, isSelected }) =>
                                        `${
                                            isFocused || isSelected
                                                ? "!bg-primary"
                                                : ""
                                        }`,
                                    control: ({ isFocused }) =>
                                        ` !bg-front !text-text input input-bordered !rounded-lg p-0 !border-base-content !border-opacity-20 !shadow-none w-full ${
                                            isFocused
                                                ? "!ring-2 !ring-primary"
                                                : ""
                                        }`,
                                    singleValue: () =>
                                        "!text-text flex flex-row gap-4 items-center text-lg",
                                    input: () => "!text-text px-10 ",
                                }}
                                defaultValue={flagByLanguage(
                                    original?.language
                                )}
                                options={flagOptions}
                                // styles={{
                                //     control: (baseStyles, state) => ({
                                //         ...baseStyles,
                                //         borderColor: colors.borderColor,
                                //         outlineColor: colors.mainColor,
                                //     }),
                                // }}
                            ></Select>
                        </div>

                        <button
                            onClick={handleEditDictionary}
                            className="btn btn-primary btn-block mt-4 text-white"
                        >
                            <IconPencil></IconPencil>
                            Edit
                        </button>

                        <button
                            onClick={() => {
                                handleDeleteDictionary();
                            }}
                            className="btn bg-danger btn-block text-white hover:bg-danger/90 active:brightness-125"
                        >
                            <IconX></IconX>
                            Delete
                        </button>
                    </>
                ) : (
                    <Spinner></Spinner>
                )}
            </div>
        </div>
    );
}

export default EditDictionaryPage;

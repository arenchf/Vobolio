import React, { FormEvent, useEffect, useState } from "react";

import { IconArrowLeft, IconPlus } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import CreatableSelect from "react-select/creatable";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import Category from "../../models/Category";
import { MultiValue } from "react-select";
import { INewWord } from "../../models/Word";
import Navbar from "../../components/Navbar/Navbar";
type RouteParams = {
    dictionaryId: string;
};

function NewWordPage() {
    const { dictionaryId } = useParams<RouteParams>();
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>();
    const [newWord, setNewWord] = useState<INewWord>();
    const navigate = useNavigate();

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setNewWord({
            ...newWord,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const [selectedCategories, setSelectedCategories] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);

    const handleCategoryChange = (
        categories: MultiValue<{ value: string; label: string }>
    ) => {
        setSelectedCategories([...categories]);
    };

    const handleCreateCategory = (inputVal: string) => {
        console.log(inputVal);
        axiosInstance
            .post(`api/v1/dictionaries/${dictionaryId}/categories/`, {
                name: inputVal,
            })
            .then((response) => {
                setSelectedCategories([
                    ...selectedCategories,
                    { value: response.data.name, label: response.data.name },
                ]);
                if (categories) {
                    setCategories([...categories, response.data]);
                } else {
                    setCategories([response.data]);
                }
                setIsCategoryLoading(false);
            })
            .catch((error) => {
                toast.error("Error on creating category!");
                setIsCategoryLoading(false);
            });
        setIsCategoryLoading(true);
    };

    const handleCreateNewWord = () => {
        console.log("categories", selectedCategories);
        if (!newWord || !newWord.word) {
            toast.error("No word name");
        } else {
            axiosInstance
                .post(`api/v1/dictionaries/${dictionaryId}/words/`, {
                    ...newWord,
                    categories: categories
                        ?.filter((val) => {
                            if (
                                selectedCategories?.find(
                                    (e) => e.value === val.name
                                )
                            ) {
                                return val.id;
                            }
                        })
                        .map((el) => el.id),
                })
                .then((response) => {
                    // console.log(response);

                    toast.success("Word created!");
                    navigate(`/dictionaries/${dictionaryId}`);
                })
                .catch((error) => {
                    toast.error("An error while creating dictionary happened.");
                });
        }
    };

    useEffect(() => {
        axiosInstance
            .get(`api/v1/dictionaries/${dictionaryId}/categories/`)
            .then((response) => {
                // console.log(response.data.results);
                setCategories(response.data.results);
            });
    }, []);

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
                New Word
            </Navbar>
            <form
                className="flex flex-col p-4 m-auto max-w-lg gap-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleCreateNewWord();
                }}
            >
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Word</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Word"
                        name="word"
                        onChange={handleInput}
                        className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                    />
                </div>
                {/* <Input
                    inputAttributes={{
                        placeholder: "Word",
                        onInput: handleInput,
                    }}
                    id="newWordWord"
                    name="word"
                    label="Word:"
                /> */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Translation</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Translation"
                        name="translation"
                        onChange={handleInput}
                        className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                    />
                </div>
                {/* <Input
                    inputAttributes={{
                        placeholder: "Translation",
                        onInput: handleInput,
                    }}
                    id="newWordTranslation"
                    name="translation"
                    label="Translation:"
                /> */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Example Sentence</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Example Sentence"
                        name="sentence"
                        onChange={handleInput}
                        className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                    />
                </div>
                {/* <Input
                    inputAttributes={{
                        placeholder: "Example Sentence",
                        onInput: handleInput,
                    }}
                    id="newWordSentence"
                    name="sentence"
                    label="Example Sentence:"
                /> */}
                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Sentence Translation</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Sentence Translation"
                        name="sentence_translation"
                        onChange={handleInput}
                        className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                    />
                </div>
                {/* <Input
                    inputAttributes={{
                        placeholder: "Sentence Translation",
                        onInput: handleInput,
                    }}
                    id="newWordSentenceTranslation"
                    name="sentence_translation"
                    label="Sentence Translation:"
                /> */}

                <div className="form-control w-full">
                    <label className="label">
                        <span className="label-text">Select Language</span>
                    </label>
                    <CreatableSelect
                        // isClearable
                        // isDisabled={isLoading}
                        isLoading={isCategoryLoading}
                        onChange={(newValue) => handleCategoryChange(newValue)}
                        onCreateOption={handleCreateCategory}
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
                            multiValue: () => `!bg-primary`,
                            multiValueLabel: () => `!text-white`,
                            input: () => "!text-text  ",
                        }}
                        options={categories?.map((val, index) => {
                            return { label: val.name, value: val.name };
                        })}
                        isMulti={true}
                        value={selectedCategories}
                    />
                </div>
                <button
                    type="submit"
                    // onClick={() => {
                    //     handleCreateNewWord();
                    // }}
                    className="btn btn-primary btn-block text-white mt-4"
                >
                    <IconPlus></IconPlus>
                    Create
                </button>
            </form>
        </div>
    );
}

export default NewWordPage;

import React, { FormEvent, useEffect, useState } from "react";
// import "./EditWord.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Word from "../../models/Word";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { IconArrowLeft, IconPencil, IconX } from "@tabler/icons-react";
import Category from "../../models/Category";
import CreatableSelect from "react-select/creatable";
import { MultiValue } from "react-select";
import Navbar from "../../components/Navbar/Navbar";

type RouteParams = {
    wordId: string;
};

function EditWordPage() {
    const { wordId } = useParams<RouteParams>();
    const navigate = useNavigate();
    const { state } = useLocation();
    const [word, setWord] = useState<Word | null>(state?.word ?? null);
    const [original, setOriginal] = useState<Word | null>(state?.word ?? null);
    const [isLoading, setIsLoading] = useState(word ? false : true);
    const [isCategoryLoading, setIsCategoryLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>();

    const [selectedCategories, setSelectedCategories] = useState<
        {
            value: string;
            label: string;
        }[]
    >(
        word?.categories
            ? word.categories?.map((val) => {
                  return { value: val.name, label: val.name };
              })
            : []
    );

    const handleCategoryChange = (
        categories: MultiValue<{ value: string; label: string }>
    ) => {
        setSelectedCategories([...categories]);
    };

    useEffect(() => {
        console.log("word", word);
        if (!word) {
            // console.log("finding word");
            axiosInstance
                .get(`api/v1/words/${wordId}/`)
                .then((response) => {
                    // console.log(response.data);
                    setWord(response.data);
                    setOriginal(response.data);
                    setIsLoading(false);
                    setSelectedCategories(
                        response.data.categories?.map((val: Category) => {
                            return { value: val.name, label: val.name };
                        })
                    );
                })
                .catch((error) => toast.error("Error on finding word"));
        } else if (word) {
            axiosInstance
                .get(`api/v1/dictionaries/${word.dictionary}/categories/`)
                .then((response) => {
                    setCategories(response.data.results);
                });
        }
    }, [isLoading]);

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setWord({
            ...word,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    const handleCreateCategory = (inputVal: string) => {
        console.log(inputVal);
        axiosInstance
            .post(`api/v1/dictionaries/${word?.dictionary}/categories/`, {
                name: inputVal,
            })
            .then((response) => {
                setSelectedCategories([
                    ...selectedCategories,
                    {
                        value: response.data.name,
                        label: response.data.name,
                    },
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

    const handleDeleteWord = () => {
        axiosInstance
            .delete(`api/v1/words/${word?.id}/`)
            .then((response) => {
                toast.success("Word deleted!");
                navigate(`/dictionaries/${word?.dictionary}`);
            })
            .catch((error) => {
                toast.error("Error while deleting word!");
            });
    };

    const handleEditWord = () => {
        console.log("word", word);
        axiosInstance
            .put(`api/v1/words/${word?.id}/`, {
                ...word,
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
                toast.success("Word edited!");
                navigate(`/dictionaries/${word?.dictionary}`);
            })
            .catch((error) => {
                toast.error("An error while creating dictionary happened.");
            });
    };

    return (
        <div className="flex-grow">
            <Navbar
                beforeTitle={
                    <button
                        className="btn btn-sm btn-circle btn-primary text-white"
                        onClick={() => {
                            navigate(-1);
                        }}
                    >
                        <IconArrowLeft></IconArrowLeft>
                    </button>
                }
            >
                {word ? `Edit ${word.word}` : "Loading"}
            </Navbar>
            <div
                className="max-w-lg m-auto flex flex-col gap-4"
                // onSubmit={(e) => {
                //     e.preventDefault();
                //     handleEditWord();
                // }}
            >
                {!isLoading && word ? (
                    <>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Word</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Word"
                                name="word"
                                // value={editedUser.email}
                                defaultValue={word.word}
                                onChange={handleInput}
                                className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                            />
                        </div>
                        {/* <Input
                            inputAttributes={{
                                placeholder: "Word",
                                onInput: handleInput,
                                defaultValue: word.word,
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
                                defaultValue={word.translation}
                                onChange={handleInput}
                                className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                            />
                        </div>
                        {/* <Input
                            inputAttributes={{
                                placeholder: "Translation",
                                onInput: handleInput,
                                defaultValue: word.translation,
                            }}
                            id="newWordTranslation"
                            name="translation"
                            label="Translation:"
                        /> */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Example Sentence
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Example Sentence"
                                name="sentence"
                                defaultValue={word.sentence}
                                onChange={handleInput}
                                className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                            />
                        </div>
                        {/* <Input
                            inputAttributes={{
                                placeholder: "Example Sentence",
                                onInput: handleInput,
                                defaultValue: word.sentence,
                            }}
                            id="newWordSentence"
                            name="sentence"
                            label="Example Sentence:"
                        /> */}
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">
                                    Sentence Translation
                                </span>
                            </label>
                            <input
                                type="text"
                                placeholder="Sentence Translation"
                                name="sentence_translation"
                                defaultValue={word.sentence_translation}
                                onChange={handleInput}
                                className="input input-bordered w-full focus:outline-primary focus:outline-offset-0 bg-front outline-offset-0"
                            />
                        </div>
                        {/* <Input
                            inputAttributes={{
                                placeholder: "Sentence Translation",
                                onInput: handleInput,
                                defaultValue: word.sentence_translation,
                            }}
                            id="newWordSentenceTranslation"
                            name="sentence_translation"
                            label="Sentence Translation:"
                        /> */}

                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Categories</span>
                            </label>
                            <CreatableSelect
                                // isClearable
                                // isDisabled={isLoading}
                                isLoading={isCategoryLoading}
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
                                    multiValue: () => `!bg-primary`,
                                    multiValueLabel: () => `!text-white`,
                                    input: () => "!text-text",
                                    valueContainer: () => "!px-4",
                                    placeholder: () => "!text-gray-400 ",
                                }}
                                // styles={{
                                //     option: (base, state) => ({
                                //         ...base,
                                //         // backgroundColor:
                                //         //     "rgb(249, 159, 56, 0.7)",
                                //         // color: colors.mainColor,
                                //         backgroundColor:
                                //             "var(--background-color)",
                                //         ":hover": {
                                //             backgroundColor:
                                //                 "rgb(249, 159, 56, 0.7)",
                                //         },
                                //         "::selection": {
                                //             backgroundColor: "red",
                                //         },
                                //     }),

                                //     control: (baseStyles, state) => ({
                                //         ...baseStyles,

                                //         boxShadow: "none",
                                //         ":hover": {
                                //             borderColor: colors.mainColor,
                                //         },
                                //         ":focus": {
                                //             border: "none",
                                //             // backgroundColor: "red",
                                //         },
                                //         borderColor: state.isFocused
                                //             ? colors.mainColor
                                //             : colors.borderColor,
                                //         transition: "all 0s",
                                //         outline: state.isFocused
                                //             ? "5px solid rgb(249, 159, 56, 0.5)"
                                //             : "none",
                                //     }),
                                // }}
                                onChange={(newValue) =>
                                    handleCategoryChange(newValue)
                                }
                                onCreateOption={handleCreateCategory}
                                options={categories?.map((val, index) => {
                                    return { label: val.name, value: val.name };
                                })}
                                isMulti={true}
                                value={selectedCategories}
                            />
                        </div>
                        <button
                            onClick={handleEditWord}
                            className="btn btn-primary btn-block text-white mt-4"
                        >
                            <IconPencil></IconPencil>
                            Edit
                        </button>
                        <button
                            onClick={handleDeleteWord}
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

export default EditWordPage;

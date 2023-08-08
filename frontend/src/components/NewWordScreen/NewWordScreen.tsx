import React, {
    Dispatch,
    FormEvent,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import "./NewWordScreen.scss";
import Header from "../Header/Header";
import { IconArrowLeft } from "@tabler/icons-react";
// import Select from "react-select/dist/declarations/src/Select";
import { MultiValue, SingleValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import AuthContext from "../../contexts/AuthContext";
import Category from "../../models/Category";
import Word, { NewWord } from "../../models/Word";
import axiosInstance from "../../axios";
import { useAppDispatch, useAppSelector } from "../../store";
import { toast } from "react-toastify";
import { addWord } from "../../slices/wordSlice";

interface INewWordScreen {
    newWordToggle: boolean;
    setNewWordToggle: Dispatch<SetStateAction<boolean>>;
}

function NewWordScreen({ newWordToggle, setNewWordToggle }: INewWordScreen) {
    const [categories, setCategories] = useState<Category[]>();
    const [selectedCategories, setSelectedCategories] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);
    const [newWord, setNewWord] = useState<NewWord>();
    const dictionarySlice = useAppSelector((state) => state.dictionarySlice);
    const dispatch = useAppDispatch();

    const handleClickBack = () => {
        setNewWordToggle(false);
    };
    const auth = useContext(AuthContext);

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setNewWord({
            ...newWord,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };
    const handleChange = (
        categories: MultiValue<{ value: string; label: string }>
    ) => {
        console.log("r", categories);
        setSelectedCategories([...categories]);
    };
    const handleCreateCategory = (inputVal: string) => {
        console.log(inputVal);
        axiosInstance
            .post(
                `api/v1/dictionaries/${dictionarySlice.selectedDictionary?.id}/categories/`,
                { name: inputVal }
            )
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
            })
            .catch((error) => {});
    };

    const handleCreateNewWord = () => {
        console.log("categories", selectedCategories);
        if (!newWord || !newWord.word) {
            toast.error("No word name");
        } else {
            axiosInstance
                .post(
                    `api/v1/dictionaries/${dictionarySlice.selectedDictionary?.id}/words/`,
                    {
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
                    }
                )
                .then((response) => {
                    console.log(response);
                    dispatch(addWord(response.data));
                    toast.success("Word created!");
                    setNewWordToggle(false);
                })
                .catch((error) => {
                    toast.error("An error while creating dictionary happened.");
                });
        }
    };

    useEffect(() => {
        axiosInstance
            .get(
                `api/v1/dictionaries/${dictionarySlice.selectedDictionary?.id}/categories/`
            )
            .then((response) => {
                console.log(response.data.results);
                setCategories(response.data.results);
            });
    }, []);

    return (
        <div className="new-word-screen screen">
            <Header
                title="Create New Word"
                left={
                    <button onClick={handleClickBack} className="header-button">
                        <IconArrowLeft size={24} />
                    </button>
                }
                searchButton={false}
            />
            <div className="new-word-content content">
                <div className="input-group">
                    <label htmlFor="newWordWord">Word:</label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="word"
                        id="newWordWord"
                        placeholder="Word"
                        onInput={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="newWordWord">Translation:</label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="translation"
                        id="newWordTranslation"
                        placeholder="Translation"
                        onInput={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="newWordSentence">Example Sentence:</label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="sentence"
                        id="newWordSentence"
                        placeholder="Example Sentence"
                        onInput={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="newWordSentenceTranslation">
                        Example Sentence Translation:
                    </label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="sentence_translation"
                        id="newWordSentenceTranslation"
                        placeholder="Example Sentence Translation"
                        onInput={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="categorySelect">Select Category:</label>

                    <CreatableSelect
                        isClearable
                        // isDisabled={isLoading}
                        // isLoading={isLoading}
                        onChange={(newValue) => handleChange(newValue)}
                        onCreateOption={handleCreateCategory}
                        options={categories?.map((val, index) => {
                            return { label: val.name, value: val.name };
                        })}
                        isMulti={true}
                        value={selectedCategories}
                    />
                </div>
                <div className="input-group">
                    <button
                        className="form-button button"
                        onClick={handleCreateNewWord}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewWordScreen;

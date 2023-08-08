import React, {
    Dispatch,
    FormEvent,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import Header from "../Header/Header";
import "./EditWordScreen.scss";
import Word, { NewWord } from "../../models/Word";
import { useAppDispatch, useAppSelector } from "../../store";
import Category from "../../models/Category";
import CreatableSelect from "react-select/creatable";
import { IconArrowLeft } from "@tabler/icons-react";
import { MultiValue } from "react-select";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import { editWord } from "../../slices/wordSlice";

interface IEditWordScreen {
    handleClickBack: () => void;
}

function EditWordScreen({ handleClickBack }: IEditWordScreen) {
    const [categories, setCategories] = useState<Category[]>();
    const [currentWord, setCurrentWord] = useState<NewWord | null>();
    const [selectedCategories, setSelectedCategories] = useState<
        {
            value: string;
            label: string;
        }[]
    >([]);

    const wordSlice = useAppSelector((state) => state.wordSlice);
    const dispatch = useAppDispatch();

    const handleInput = (e: FormEvent<HTMLInputElement>) => {
        setCurrentWord({
            ...currentWord,
            [e.currentTarget.name]: e.currentTarget.value,
        });
    };

    // useEffect(()=>{},)

    useEffect(() => {
        // if (!wordSlice?.selectedWord) {
        console.log("setting current word");
        if (!currentWord) {
            setCurrentWord({
                ...wordSlice.selectedWord,
                categories: wordSlice.selectedWord?.categories?.map(
                    (val) => val.id
                ),
            });
        }
    }, [wordSlice.selectedWord, categories, currentWord]);

    useEffect(() => {
        if (categories && currentWord && currentWord.categories) {
            let catOptions = categories
                .filter((cat) => currentWord.categories?.includes(cat.id))
                .map((cat) => ({ value: cat.name, label: cat.name }));
            console.log("catOptions", catOptions);
            setSelectedCategories([...catOptions]);
        }
    }, [currentWord, categories]);

    const handleChange = (
        categories: MultiValue<{ value: string; label: string }>
    ) => {
        setSelectedCategories([...categories]);
    };

    const handleEditWord = () => {
        console.log("categories", selectedCategories);
        if (!currentWord || !currentWord.word) {
            toast.error("No word name");
        } else {
            if (wordSlice.selectedWord?.dictionary)
                axiosInstance
                    .put(
                        `api/v1/dictionaries/${wordSlice.selectedWord?.dictionary.id}/words/`,
                        {
                            ...currentWord,
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
                        dispatch(editWord(response.data));
                        toast.success("Word created!");
                        handleClickBack();
                    })
                    .catch((error) => {
                        toast.error(
                            "An error while creating dictionary happened."
                        );
                    });
        }
    };

    const handleCreateCategory = (inputVal: string) => {
        console.log(inputVal);
        if (wordSlice.selectedWord?.dictionary) {
            axiosInstance
                .post(
                    `api/v1/dictionaries/${wordSlice.selectedWord?.dictionary.id}/categories/`,
                    { name: inputVal }
                )
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
                })
                .catch((error) => {});
        }
    };

    return (
        <div className="edit-word-screen screen">
            <Header
                title="Edit Word"
                left={
                    <button onClick={handleClickBack} className="header-button">
                        <IconArrowLeft size={24} />
                    </button>
                }
                searchButton={false}
            />
            <div className="edit-word-content content">
                <div className="input-group">
                    <label htmlFor="editWordWord">Word:</label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="word"
                        id="editWordWord"
                        placeholder="Word"
                        value={wordSlice.selectedWord?.word}
                        onInput={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="editWordTranslation">Translation:</label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="translation"
                        id="editWordTranslation"
                        placeholder="Translation"
                        value={wordSlice.selectedWord?.translation}
                        onInput={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="editWordSentence">Example Sentence:</label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="sentence"
                        id="editWordSentence"
                        placeholder="Example Sentence"
                        value={wordSlice.selectedWord?.sentence}
                        onInput={handleInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="editWordSentenceTranslation">
                        Example Sentence Translation:
                    </label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="sentence_translation"
                        id="editWordSentenceTranslation"
                        placeholder="Example Sentence Translation"
                        value={wordSlice.selectedWord?.sentence_translation}
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
                        // value={selectedCategories}
                        // value=
                    />
                </div>
                <div className="input-group">
                    <button
                        className="form-button button"
                        onClick={handleEditWord}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditWordScreen;

import React, { useEffect, useState } from "react";
import "./DictionaryScreen.scss";
import Dictionary from "../../models/Dictionary";
import Header from "../Header/Header";
import { useAppDispatch, useAppSelector } from "../../store";
import {
    clearDictionaries,
    clearSelectedDictionary,
} from "../../slices/dictionarySlice";
import {
    IconArrowLeft,
    IconEdit,
    IconPencil,
    IconPlus,
} from "@tabler/icons-react";
import {
    addMultipleWords,
    clearSelectedWords,
    clearWords,
} from "../../slices/wordSlice";
import axiosInstance from "../../axios";
import NewWordScreen from "../NewWordScreen/NewWordScreen";
import WordList from "../WordList/WordList";
import EditDictionaryScreen from "../EditDictionaryScreen/EditDictionaryScreen";
import EditWordScreen from "../EditWordScreen/EditWordScreen";

interface IDictionaryScreen {
    selectedDictionary: Dictionary | null;
}

function DictionaryScreen({ selectedDictionary }: IDictionaryScreen) {
    const wordSlice = useAppSelector((state) => state.wordSlice);
    const dictionarySlice = useAppSelector((state) => state.dictionarySlice);
    const dispatch = useAppDispatch();
    const [newWordToggle, setNewWordToggle] = useState(false);
    const [editDictionaryToggle, setEditDictionaryToggle] = useState(false);
    const [editWordToggle, setEditWordToggle] = useState(false);

    const handleClickBack = () => {
        dispatch(clearSelectedDictionary());
        dispatch(clearWords());
        dispatch(clearSelectedWords());
    };

    const handleAddNewWorldButton = () => {
        // console.log("TODO");
        setNewWordToggle(true);
    };

    useEffect(() => {
        if (selectedDictionary && wordSlice.words.length === 0) {
            axiosInstance
                .get(
                    `api/v1/dictionaries/${selectedDictionary.id}/words/?limit=10&offset=0`
                )
                .then((response) => {
                    dispatch(
                        addMultipleWords({
                            wordArray: response.data["results"],
                            offset: true,
                        })
                    );
                });
        }
    }, [dispatch, selectedDictionary, wordSlice.words]);

    if (newWordToggle) {
        return (
            <NewWordScreen
                newWordToggle={newWordToggle}
                setNewWordToggle={setNewWordToggle}
            ></NewWordScreen>
        );
    } else if (editDictionaryToggle) {
        return (
            <EditDictionaryScreen
                handleClickBack={() => {
                    setEditDictionaryToggle(false);
                }}
            />
        );
    } else if (editWordToggle) {
        return (
            <EditWordScreen
                handleClickBack={() => {
                    setEditWordToggle(false);
                }}
            ></EditWordScreen>
        );
    } else {
        return (
            <div className="screen dictionary-details-screen">
                <Header
                    className="dictionary-details-header"
                    title={selectedDictionary?.name}
                    left={
                        <button
                            onClick={handleClickBack}
                            className="header-button"
                        >
                            <IconArrowLeft size={24} />
                        </button>
                    }
                    afterTitle={
                        <button
                            onClick={() => {
                                setEditDictionaryToggle(true);
                            }}
                            className="header-button"
                        >
                            <IconPencil size={24} />
                        </button>
                    }
                    searchButton={false}
                />
                <WordList
                    onEdit={() => {
                        setEditWordToggle(true);
                    }}
                    onAddNew={handleAddNewWorldButton}
                ></WordList>
                <div className="dictionary-details"></div>
            </div>
        );
    }
}

export default DictionaryScreen;

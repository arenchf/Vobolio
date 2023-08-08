import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import Dictionary from "../../models/Dictionary";
import AuthContext from "../../contexts/AuthContext";
import { useAppDispatch, useAppSelector } from "../../store";
import { IconArrowLeft } from "@tabler/icons-react";
import Select, { ActionMeta, SingleValue } from "react-select";
import Flag, { flagByLanguage, flagOptions } from "../../models/Flag";
import { toast } from "react-toastify";
import axiosInstance from "../../axios";
import { editDictionary, selectDictionary } from "../../slices/dictionarySlice";
import "./EditDictionaryScreen.scss";
interface IEditDictionaryScreen {
    handleClickBack: () => void;
}

function EditDictionaryScreen({ handleClickBack }: IEditDictionaryScreen) {
    const [editDictionaryName, setEditDictionaryName] = useState<string>("");
    const [selectedFlag, setSelectedFlag] = useState<Flag | undefined>(
        flagByLanguage("es")
    );

    const auth = useContext(AuthContext);

    const selectedDictionary = useAppSelector(
        (store) => store.dictionarySlice.selectedDictionary
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (selectedDictionary) {
            setEditDictionaryName(selectedDictionary?.name);
            setSelectedFlag(flagByLanguage(selectedDictionary.language));
        }
    }, [selectedDictionary]);

    const handleNameInput = (event: React.FormEvent<HTMLInputElement>) => {
        setEditDictionaryName(event.currentTarget.value);
    };
    const handleLanguageSelect = (
        newValue: SingleValue<Flag>,
        actionMeta: ActionMeta<Flag>
    ) => {
        if (newValue) {
            setSelectedFlag(newValue);
        }
    };
    const handleSaveDictionary = () => {
        if (!editDictionaryName) {
            toast.error("No dictionary name");
        } else {
            axiosInstance
                .put(`api/v1/dictionaries/${selectedDictionary?.id}/`, {
                    language: selectedFlag
                        ? selectedFlag.code
                        : selectedDictionary?.language,
                    name: editDictionaryName,
                })
                .then((response) => {
                    console.log(response);
                    dispatch(editDictionary(response.data));
                    dispatch(selectDictionary(response.data));
                    toast.success("Dictionary changed!");
                    handleClickBack();
                })
                .catch((error) => {
                    toast.error("An error while creating dictionary happened.");
                });
        }
    };

    return (
        <div className="screen edit-dictionary-screen">
            <Header
                className="edit-dictionary-header"
                title={`Edit ${selectedDictionary?.name}`}
                left={
                    <button onClick={handleClickBack} className="header-button">
                        <IconArrowLeft size={24} />
                    </button>
                }
            />

            <div className="edit-dictionary content">
                <div className="input-group">
                    <label htmlFor="newDictionaryName">Dictionary Name:</label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="name"
                        id="newDictionaryName"
                        placeholder="My Dictionary"
                        value={editDictionaryName}
                        onInput={handleNameInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="flagSelect">Select Flag:</label>
                    <Select
                        onChange={handleLanguageSelect}
                        className="flag-select"
                        id="flagSelect"
                        defaultValue={flagByLanguage(
                            selectedDictionary
                                ? selectedDictionary.language
                                : "es"
                        )}
                        options={flagOptions}
                        styles={{
                            control: (baseStyles, state) => ({
                                ...baseStyles,
                                borderColor: "#ccc",
                                outlineColor: "#f99f38",
                            }),
                        }}
                    ></Select>
                </div>
                <div className="input-group">
                    <button
                        className="form-button button"
                        onClick={handleSaveDictionary}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditDictionaryScreen;

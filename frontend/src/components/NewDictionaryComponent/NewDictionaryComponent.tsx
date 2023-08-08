import React, {
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import "./NewDictionaryComponent.scss";
import Header from "../Header/Header";
import { useAppDispatch, useAppSelector } from "../../store";
import { IconArrowLeft } from "@tabler/icons-react";
import Select, { ActionMeta, SingleValue } from "react-select";
import Flag, { flagOptions, flagByLanguage } from "../../models/Flag";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/AuthContext";
import DictionarySlice, { addDictionary } from "../../slices/dictionarySlice";

interface INewDictionaryComponent {
    newDictionaryToggle: boolean;
    setNewDictionaryToggle: Dispatch<SetStateAction<boolean>>;
}

function NewDictionaryComponent({
    newDictionaryToggle,
    setNewDictionaryToggle,
}: INewDictionaryComponent) {
    const selectedDictionary = useAppSelector(
        (state) => state.dictionarySlice.selectedDictionary
    );

    const auth = useContext(AuthContext);

    const dispatch = useAppDispatch();
    const dictionarySlice = useAppSelector((state) => state.dictionarySlice);

    const [selectedFlag, setSelectedFlag] = useState<Flag | undefined>(
        flagByLanguage("es")
    );
    const [newDictionaryName, setNewDictionaryName] = useState<string>("");

    const handleClickBack = () => {
        setNewDictionaryToggle(false);
    };
    const handleNameInput = (event: React.FormEvent<HTMLInputElement>) => {
        // console.log(event.currentTarget.value);
        setNewDictionaryName(event.currentTarget.value);
    };

    const handleLanguageSelect = (
        newValue: SingleValue<Flag>,
        actionMeta: ActionMeta<Flag>
    ) => {
        if (newValue) {
            setSelectedFlag(newValue);
        }
    };

    const handleCreateNewDictionary = () => {
        if (!newDictionaryName) {
            toast.error("No dictionary name");
        } else {
            axiosInstance
                .post(`api/v1/users/${auth?.user?.username}/dictionaries/`, {
                    language: selectedFlag ? selectedFlag.code : "es",
                    name: newDictionaryName,
                })
                .then((response) => {
                    console.log(response);
                    dispatch(addDictionary(response.data));
                    toast.success("Dictionary created!");
                    setNewDictionaryToggle(false);
                })
                .catch((error) => {
                    toast.error("An error while creating dictionary happened.");
                });
        }
    };

    return (
        <div className="screen new-dictionary-screen">
            <Header
                title="Create New Dictionary"
                left={
                    <button onClick={handleClickBack} className="header-button">
                        <IconArrowLeft size={24} />
                    </button>
                }
                searchButton={false}
            />
            <div className="new-dictionary content">
                <div className="input-group">
                    <label htmlFor="newDictionaryName">Dictionary Name:</label>
                    <input
                        className="text-input form-input"
                        type="text"
                        name="name"
                        id="newDictionaryName"
                        placeholder="My Dictionary"
                        onInput={handleNameInput}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="flagSelect">Select Flag:</label>
                    <Select
                        onChange={handleLanguageSelect}
                        className="flag-select"
                        id="flagSelect"
                        defaultValue={flagByLanguage("es")}
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
                        onClick={handleCreateNewDictionary}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewDictionaryComponent;

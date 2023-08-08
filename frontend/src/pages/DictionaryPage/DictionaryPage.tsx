import React, { useContext, useState } from "react";
import "./DictionaryPage.scss";
import DictionaryList from "../../components/DictionaryList/DictionaryList";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import DictionaryScreen from "../../components/DictionaryScreen/DictionaryScreen";
import { useAppSelector } from "../../store";
import NewDictionaryComponent from "../../components/NewDictionaryComponent/NewDictionaryComponent";

function DictioanaryPage() {
    const dictionarySlice = useAppSelector((state) => state.dictionarySlice);
    const [newDictionaryToggle, setNewDictionaryToggle] = useState(false);

    return (
        <div className="page page-dashboard">
            {!newDictionaryToggle ? (
                <>
                    {!dictionarySlice.selectedDictionary ? (
                        <DictionaryList
                            newDictionaryToggle={newDictionaryToggle}
                            setNewDictionaryToggle={setNewDictionaryToggle}
                        ></DictionaryList>
                    ) : (
                        <>
                            <DictionaryScreen
                                selectedDictionary={
                                    dictionarySlice.selectedDictionary
                                }
                            ></DictionaryScreen>
                        </>
                    )}
                </>
            ) : (
                <>
                    <NewDictionaryComponent
                        newDictionaryToggle={newDictionaryToggle}
                        setNewDictionaryToggle={setNewDictionaryToggle}
                    ></NewDictionaryComponent>
                </>
            )}
        </div>
    );
}

export default DictioanaryPage;

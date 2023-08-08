import React, {
    useEffect,
    UIEvent,
    useRef,
    useCallback,
    useState,
    useContext,
} from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import DictionaryListItem from "../DictionaryListItem/DictionaryListItem";
import axiosInstance from "../../axios";
import DictionarySlice, {
    addMultipleDictionaries,
    clearDictionaries,
    clearSelectedDictionary,
    selectDictionary,
    setTotalDictionaries,
} from "../../slices/dictionarySlice";
import "./DictionaryList.scss";
import Dictionary from "../../models/Dictionary";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import Header from "../Header/Header";
import { IconPlus } from "@tabler/icons-react";
import Avatar from "../../pages/Avatar/Avatar";
import { Dispatch, SetStateAction } from "react";

interface IDictionaryList {
    newDictionaryToggle: boolean;
    setNewDictionaryToggle?: Dispatch<SetStateAction<boolean>>;
}

function DictionaryList({
    newDictionaryToggle,
    setNewDictionaryToggle,
}: IDictionaryList) {
    const dictionarySlice = useAppSelector((state) => state.dictionarySlice);
    const dispatch = useAppDispatch();
    const auth = useContext<IAuthContext | null>(AuthContext);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        // if (!dictionarySlice.count) {
        console.log("re");
        axiosInstance
            .get(
                `api/v1/users/${auth?.user?.username}/dictionaries/?limit=10&offset=0`
            )
            .then((response) => {
                dispatch(
                    addMultipleDictionaries({
                        dictionaryArray: response.data.results,
                        offset: true,
                    })
                );
                dispatch(setTotalDictionaries(response.data.count));
            });
        // }
        // return  () => {
        //     dispatch(clearDictionaries())
        // }
    }, [dispatch, auth]);

    useEffect(() => {}, [dictionarySlice]);

    const loadMore = () => {
        axiosInstance
            .get(
                `api/v1/users/${auth?.user?.username}/dictionaries/?limit=10&offset=${dictionarySlice.offset}`
            )
            .then((response) => {
                dispatch(
                    addMultipleDictionaries({
                        dictionaryArray: response.data.results,
                        offset: true,
                    })
                );
                dispatch(setTotalDictionaries(response.data.count));
            });
    };

    const handleSelectDictionary = (dictionary: Dictionary) => {
        if (dictionarySlice.selectedDictionary === dictionary) {
            dispatch(clearSelectedDictionary());
        } else {
            dispatch(selectDictionary({ dictionary: dictionary }));
        }
    };

    return (
        <div className="screen dictionary-list-screen">
            <Header
                className="dictionary-list-header"
                title={`Hi, ${auth?.user?.username}!`}
                isSearching={isSearching}
                searchButton={false}
                // searchButton={true}
                left={
                    setNewDictionaryToggle ? (
                        <div className="button-responsive">
                            <button
                                onClick={() => {
                                    setNewDictionaryToggle(true);
                                }}
                                className="header-button squared w-gt-768"
                            >
                                New Dictionary
                            </button>
                            <button
                                onClick={() => {
                                    setNewDictionaryToggle(true);
                                }}
                                className="header-button w-lt-768"
                            >
                                <IconPlus size={24} />
                            </button>
                        </div>
                    ) : (
                        <></>
                    )
                }
                right={
                    <Avatar
                        size="avatar-m"
                        src={`${axiosInstance.defaults.baseURL}${auth?.user?.img}`}
                        username={auth?.user?.username}
                    ></Avatar>
                }
                // onSearchButton={() => {
                //     setIsSearching(!isSearching);
                // }}
            />

            <div className="dictionary-list content">
                <div className="dictionary-list-items">
                    {Array.from(dictionarySlice.dictionaries).map(
                        (dictionary) => (
                            <DictionaryListItem
                                onClick={() => {
                                    handleSelectDictionary(dictionary);
                                }}
                                key={dictionary.id}
                                learned_words={dictionary.learned_words}
                                total_words={dictionary.total_words}
                                language={dictionary.language}
                                id={dictionary.id}
                                name={dictionary.name}
                            />
                        )
                    )}
                </div>
                {}
                {dictionarySlice.total === 0 && setNewDictionaryToggle ? (
                    <button
                        className="load-more-button"
                        onClick={() => {
                            setNewDictionaryToggle(true);
                        }}
                    >
                        Create a Dictionary
                    </button>
                ) : dictionarySlice.count !== dictionarySlice.total ? (
                    <button className="load-more-button" onClick={loadMore}>
                        Load More
                    </button>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default DictionaryList;

import React, { useState, useEffect, useContext } from "react";
import {
    Icon,
    IconCards,
    IconList,
    IconSwipe,
    IconWriting,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import AuthContext from "../../contexts/AuthContext";
import Dictionary from "../../models/Dictionary";
import { useAppDispatch, useAppSelector } from "../../store";
import { addMultiDcs, clearDcs, initState } from "../../slices/dcSlice";
import {
    addMultiWords,
    // setTrainingDictionary,
    // setTrainingInfo,
} from "../../slices/trainingSlice";
import Navbar from "../../components/Navbar/Navbar";
import DictionaryListItem from "../../components/DictionaryListItem/DictionaryListItem";
import TrainingMode, { trainingModes } from "../../models/TrainingMode";
import InfiniteScroll from "react-infinite-scroller";

const TrainingSetupPage = () => {
    const auth = useContext(AuthContext);
    const dispatch = useAppDispatch();
    const dictionarySlice = useAppSelector((store) => store.dcSlice);
    const trainingSlice = useAppSelector((store) => store.trainingSlice);
    const [selectedMode, setSelectedMode] = useState<TrainingMode | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState<string | null>();
    const [sorting, setSorting] = useState<string>("last");
    const [selectedDictionary, setSelectedDictionary] =
        useState<Dictionary | null>();
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(0);

    const handleInitPage = () => {
        console.log(`Searching for ${searchInput}`);
        setIsLoading(true);
        dispatch(clearDcs());
        axiosInstance
            .get(
                `api/v1/users/${
                    auth?.user?.username
                }/dictionaries/?sort=${sorting}&search=${searchInput ?? ""}`
            )
            .then((response) => {
                dispatch(
                    initState({
                        ...response.data,
                        dictionaries: response.data.results,
                    })
                );
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error("E-50398: Unknown Error!");
            });
    };

    // useEffect(() => {
    //     // if(trainingSlice.words.length !== 0){
    //     //     navigate()
    //     // }
    //     axiosInstance
    //         .get(`api/v1/users/${auth?.user?.username}/dictionaries/`)
    //         .then((response) => {
    //             setIsloading(false);
    //             dispatch(clearDcs());
    //             dispatch(addMultiDcs(response.data.results));
    //             // setCurrentStep(2);
    //         })
    //         .catch((error) => toast.error);
    // }, []);

    // useEffect(() => {
    //     console.log("currentStep", currentStep);
    // }, [currentStep]);

    const handleSelectTrainingMode = (mode: TrainingMode) => {
        setSelectedMode(mode);
        if (
            selectedDictionary &&
            mode.minWords &&
            selectedDictionary.total_words < mode.minWords
        ) {
            setSelectedDictionary(null);
            setCurrentStep(1);
        } else if (selectedDictionary) {
            setCurrentStep(2);
        } else {
            setCurrentStep(1);
        }
    };

    const handleSelectDictionary = (dictionary: Dictionary) => {
        if (dictionary === selectedDictionary) {
            setSelectedDictionary(null);
        } else {
            if (
                selectedMode?.minWords &&
                dictionary.total_words < selectedMode.minWords
            ) {
                toast.error(
                    `For ${selectedMode.label} mode you need a dictionary with at least ${selectedMode.minWords} words.`
                );
            } else {
                setSelectedDictionary(dictionary);
                setCurrentStep(2);
            }
        }
    };

    useEffect(() => {
        handleInitPage();
    }, [sorting]);

    const fetchNext = () => {
        console.log("ASDASD");
        if (dictionarySlice.next) {
            axiosInstance
                .get(dictionarySlice.next)
                .then((response) => {
                    console.log("response", response);
                    dispatch(
                        initState({
                            ...response.data,

                            dictionaries: [...dictionarySlice.dictionaries],
                        })
                    );
                    dispatch(addMultiDcs(response.data.results));
                })
                .catch((error) => console.log("error", error));
        }
    };

    return (
        <div className="flex-grow">
            <Navbar>Training</Navbar>
            <div className="max-w-xl p-4 m-auto flex flex-col gap-2">
                <div className="overflow-x-auto flex flex-row items-center justify-center">
                    <ul className="steps w-full mb-4">
                        <li
                            onClick={() => {
                                setCurrentStep(0);
                            }}
                            className={`step cursor-pointer ${
                                currentStep > 0
                                    ? "step-success text-success"
                                    : ""
                            } ${
                                currentStep === 0
                                    ? "step-border text-primary before:!bg-primary after:border-2 after:border-primary"
                                    : ""
                            }`}
                        >
                            Select Training Mode
                        </li>
                        <li
                            onClick={() => {
                                if (selectedMode) setCurrentStep(1);
                            }}
                            className={`step cursor-pointer ${
                                currentStep > 1
                                    ? "step-success text-success"
                                    : ""
                            } ${
                                currentStep === 1
                                    ? "step-border text-primary before:!bg-primary after:border-2 after:border-primary"
                                    : ""
                            }`}
                        >
                            Select Dictionary
                        </li>
                        <li
                            onClick={() => {
                                if (selectedMode && selectedDictionary)
                                    setCurrentStep(2);
                            }}
                            className={`step cursor-pointer ${
                                currentStep > 2
                                    ? "step-success text-success"
                                    : ""
                            } ${
                                currentStep === 2
                                    ? "step-border text-primary before:!bg-primary after:border-2 after:border-primary"
                                    : ""
                            }`}
                        >
                            Start Training
                        </li>
                    </ul>
                </div>
                {currentStep === 0 ? (
                    <div className=" w-full p-4  flex flex-col gap-4 bg-front rounded-box">
                        {trainingModes.map((mode, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        handleSelectTrainingMode(mode);
                                    }}
                                    key={index}
                                    // className={`carousel-item ${
                                    className={`${
                                        mode.className
                                    } w-full cursor-pointer h-24 rounded-2xl flex flex-row  items-center justify-center font-bold ${
                                        mode === selectedMode
                                            ? "ring ring-primary animate-shake"
                                            : ""
                                    }`}
                                >
                                    {mode.icon ? (
                                        <mode.icon
                                            className="opacity-30"
                                            size={60}
                                        ></mode.icon>
                                    ) : (
                                        ""
                                    )}
                                    <span className="-ml-4">{mode.label}</span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <></>
                )}

                {currentStep === 1 ? (
                    <InfiniteScroll
                        useWindow={false}
                        pageStart={0}
                        loadMore={fetchNext}
                        hasMore={dictionarySlice.next ? true : false}
                        loader={
                            <div className="loader" key={0}>
                                Loading ...
                            </div>
                        }
                    >
                        <div className="flex flex-col gap-2">
                            {dictionarySlice.dictionaries.map((val) => (
                                <DictionaryListItem
                                    dictionary={val}
                                    className={`cursor-pointer ${
                                        selectedDictionary === val
                                            ? "ring ring-primary animate-shake"
                                            : ""
                                    }`}
                                    onClick={() => {
                                        handleSelectDictionary(val);
                                    }}
                                    key={val.id}
                                ></DictionaryListItem>
                            ))}
                        </div>
                    </InfiniteScroll>
                ) : (
                    // dictionarySlice.dictionaries.length > 0 ? (
                    //     <>
                    //         <div className="dictionary-list flex flex-col gap-4">
                    //             {dictionarySlice.dictionaries.map((val) => (
                    //                 <DictionaryListItem
                    //                     dictionary={val}
                    //                     className={`cursor-pointer ${
                    //                         selectedDictionary === val
                    //                             ? "ring ring-primary animate-shake"
                    //                             : ""
                    //                     }`}
                    //                     onClick={() => {
                    //                         handleSelectDictionary(val);
                    //                     }}
                    //                     key={val.id}
                    //                 ></DictionaryListItem>
                    //             ))}
                    //         </div>
                    //     </>
                    // ) : (
                    //     <button className="btn btn-primary w-full text-white">
                    //         Create Dictionary
                    //     </button>
                    // )
                    <></>
                )}

                {currentStep === 2 ? (
                    <>
                        <button
                            className="btn btn-primary w-full text-white"
                            onClick={() => {
                                if (selectedMode && selectedDictionary) {
                                    // dispatch(setTrainingInfo(selectedMode));
                                    // dispatch(
                                    //     setTrainingDictionary(
                                    //         selectedDictionary
                                    //     )
                                    // );
                                    navigate(
                                        `/training/${selectedDictionary.id}/${selectedMode.path}`
                                    );
                                }
                            }}
                        >
                            Start Training
                        </button>
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default TrainingSetupPage;

import React, { useState, useEffect } from "react";
import Dictionary from "../../models/Dictionary";
import {
    IconArrowLeft,
    IconArrowsSort,
    IconEdit,
    IconFilter,
    IconPencil,
    IconPlus,
    IconSearch,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import Spinner from "../../components/Spinner/Spinner";
import Word from "../../models/Word";
import { toast } from "react-toastify";
import WordListItem from "../../components/WordListItem/WordListItem";
import Navbar from "../../components/Navbar/Navbar";
import { useAppDispatch, useAppSelector } from "../../store";
import { addMultipleWords, clearWordSlice } from "../../slices/wordSlice";

type RouteParams = {
    dictionaryId: string;
};

function DictionaryDetailPage() {
    const { dictionaryId } = useParams<RouteParams>();
    const [dictionary, setDictionary] = useState<Dictionary>();
    const [words, setWords] = useState<Word[]>();
    const wordSlice = useAppSelector((store) => store.wordSlice);
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState<string | null>();
    const [sorting, setSorting] = useState<string>("last");
    const [filtering, setFiltering] = useState<string>("no_filter");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     axiosInstance
    //         .get(`api/v1/dictionaries/${dictionaryId}/`)
    //         .then((response) => {
    //             // console.log("response.data", response.data);
    //             setDictionary(response.data);
    //             axiosInstance
    //                 .get(
    //                     `api/v1/dictionaries/${dictionaryId}/words/?limit=10&offset=0`
    //                 )
    //                 .then((response) => {
    //                     console.log(response.data);
    //                     setWords(response.data.results);
    //                     setIsLoading(false);
    //                 })
    //                 .catch((error) => {
    //                     toast.error("Error loading words!");
    //                 });
    //         })
    //         .catch((error) => {
    //             toast.error("Error loading dictionary!");
    //         });
    // }, [dictionaryId]);

    const handleInitPage = () => {
        console.log(`Searching for ${searchInput}`);
        setIsLoading(true);
        dispatch(clearWordSlice());
        axiosInstance
            .get(`api/v1/dictionaries/${dictionaryId}/`)
            .then((response) => {
                setDictionary(response.data);
            });
        axiosInstance
            .get(
                `api/v1/dictionaries/${dictionaryId}/words/?filter=${filtering}&sort=${sorting}&search=${
                    searchInput ?? ""
                }`
            )
            .then((response) => {
                console.log("response.data.results", response.data.results);
                // dispatch(clearDcs());
                dispatch(addMultipleWords(response.data.results));
                // setWords(response.data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                toast.error("E-50398: Unknown Error!");
            });
    };

    useEffect(() => {
        handleInitPage();
    }, [sorting, filtering]);

    const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value);
    };

    return (
        <div className="flex-grow">
            {dictionary ? (
                <Navbar
                    beforeTitle={
                        <button
                            className="btn btn-primary btn-circle btn-sm text-white"
                            onClick={() => {
                                navigate("/dictionaries");
                            }}
                        >
                            <IconArrowLeft></IconArrowLeft>
                        </button>
                    }
                    navbarEnd={
                        <div className="flex flex-row gap-6 pr-3">
                            <button
                                className="btn btn-sm text-primary p-0  bg-transparent border-none hover:bg-transparent"
                                onClick={() => {
                                    navigate(
                                        `/dictionaries/${dictionaryId}/edit`
                                    );
                                }}
                            >
                                <IconEdit></IconEdit>
                                {/* Edit Dictionary */}
                            </button>
                            <button
                                className="btn btn-sm text-primary p-0 bg-transparent border-none hover:bg-transparent"
                                onClick={() => {
                                    navigate(
                                        `/dictionaries/${dictionaryId}/words/add`
                                    );
                                }}
                            >
                                <IconPlus></IconPlus>
                                {/* Edit Dictionary */}
                            </button>
                        </div>
                    }
                >
                    {dictionary.name}
                </Navbar>
            ) : (
                <Navbar
                    beforeTitle={
                        <button
                            className="btn btn-primary btn-circle btn-sm text-white"
                            onClick={() => {
                                navigate("/dictionaries");
                            }}
                        >
                            <IconArrowLeft></IconArrowLeft>
                        </button>
                    }
                >
                    <div className="h-full w-32 bg-active animate-pulse rounded-3xl"></div>
                </Navbar>
            )}

            <div className="flex flex-col gap-2 p-4 max-w-xl m-auto">
                <div className="flex flex-row justify-between gap-2 mb-2">
                    <div className="dropdown">
                        <label
                            tabIndex={0}
                            className="btn border-none hover:bg-transparent bg-transparent text-primary"
                        >
                            <IconArrowsSort></IconArrowsSort>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-front rounded-box w-52"
                        >
                            <li>
                                <button
                                    onClick={() => {
                                        setSorting("last");
                                    }}
                                    className={`${
                                        sorting === "last" ? "bg-active" : ""
                                    }`}
                                >
                                    Last Used
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setSorting("new");
                                    }}
                                    className={`${
                                        sorting === "new" ? "bg-active" : ""
                                    }`}
                                >
                                    Newest First
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setSorting("old");
                                    }}
                                    className={`${
                                        sorting === "old" ? "bg-active" : ""
                                    }`}
                                >
                                    Oldest First
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setSorting("highest");
                                    }}
                                    className={`${
                                        sorting === "highest" ? "bg-active" : ""
                                    }`}
                                >
                                    Highest Progress First
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setSorting("lowest");
                                    }}
                                    className={`${
                                        sorting === "lowest" ? "bg-active" : ""
                                    }`}
                                >
                                    Lowest Progress First
                                </button>
                            </li>
                        </ul>
                    </div>
                    <form
                        className="join shadow w-full rounded-full"
                        onSubmit={(e) => {
                            e?.preventDefault();
                            handleInitPage();
                        }}
                    >
                        <div className="w-full transition-all flex-grow-0">
                            <div className="w-full">
                                <input
                                    onSubmit={() => {
                                        handleInitPage();
                                    }}
                                    onChange={handleSearchInput}
                                    className="input rounded-full join-item w-full border-none bg-front focus:outline-primary focus:outline-offset-0 "
                                    placeholder="Search"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`btn join-item rounded-full text-primary bg-front border-none hover:bg-primary hover:text-white peer`}
                        >
                            <IconSearch></IconSearch>
                        </button>
                    </form>
                    <div className="dropdown dropdown-end">
                        <label
                            tabIndex={0}
                            className="btn border-none hover:bg-transparent bg-transparent text-primary"
                        >
                            <IconFilter></IconFilter>
                        </label>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-front rounded-box w-52"
                        >
                            <li>
                                <button
                                    onClick={() => {
                                        setFiltering("no_filter");
                                    }}
                                    className={`${
                                        filtering === "no_filter"
                                            ? "bg-active"
                                            : ""
                                    }`}
                                >
                                    No Filter
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setFiltering("complete");
                                    }}
                                    className={`${
                                        filtering === "complete"
                                            ? "bg-active"
                                            : ""
                                    }`}
                                >
                                    Only Complete
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        setFiltering("incomplete");
                                    }}
                                    className={`${
                                        filtering === "incomplete"
                                            ? "bg-active"
                                            : ""
                                    }`}
                                >
                                    Only Incomplete
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {!isLoading ? (
                    <>
                        {wordSlice.words.map((word, index) => (
                            <WordListItem
                                word={word}
                                key={index}
                                className="cursor-pointer shadow"
                                onClick={() =>
                                    navigate(`/words/${word.id}/`, {
                                        state: { word: word },
                                    })
                                }
                            ></WordListItem>
                        ))}
                        {/* <Floater
                            floatingButtons={[
                                {
                                    inside: <IconPlus></IconPlus>,
                                    title: "New Word",
                                    // label: "New Word",
                                    onClick: () => {
                                        navigate(
                                            `/dictionaries/${dictionaryId}/words/add`
                                        );
                                    },
                                },
                            ]}
                        ></Floater> */}
                    </>
                ) : (
                    <>
                        <div className="flex items-center flex-row gap-3 justify-between overflow-hidden bg-active animate-pulse w-full px-4 py-1 h-20  rounded-3xl"></div>
                        <div className="flex items-center flex-row gap-3 justify-between overflow-hidden bg-active animate-pulse w-full px-4 py-1 h-20  rounded-3xl"></div>
                        <div className="flex items-center flex-row gap-3 justify-between overflow-hidden bg-active animate-pulse w-full px-4 py-1 h-20  rounded-3xl"></div>
                    </>
                )}
            </div>
        </div>
    );
}

export default DictionaryDetailPage;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axios";
import { useAppDispatch, useAppSelector } from "../../store";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import { addMultiDcs, clearDcs, initState } from "../../slices/dcSlice";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { IconArrowsSort, IconPlus, IconSearch } from "@tabler/icons-react";
import DictionaryListItem from "../../components/DictionaryListItem/DictionaryListItem";
import Navbar from "../../components/Navbar/Navbar";
// import InfiniteScroll from "react-infinite-scroll-component";
import InfiniteScroll from "react-infinite-scroller";
import { error } from "console";

type RouteParams = {
    username?: string;
};

function DictionaryListPage() {
    const { username } = useParams<RouteParams>();
    const [isLoading, setIsLoading] = useState(true);
    const [searchInput, setSearchInput] = useState<string | null>();
    const [sorting, setSorting] = useState<string>("last");
    const navigate = useNavigate();
    const dcSlice = useAppSelector((state) => state.dcSlice);
    const dictionaries = useAppSelector((state) => state.dcSlice.dictionaries);
    const dispatch = useAppDispatch();
    const auth = useContext<IAuthContext | null>(AuthContext);

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
                // console.log("response.data.results", response.data.results);
                // dispatch(clearDcs());
                // dispatch
                dispatch(
                    initState({
                        ...response.data,
                        dictionaries: response.data.results,
                    })
                );
                // dispatch(setCount)
                // dispatch(addMultiDcs(response.data.results));
                setIsLoading(false);
            })
            .catch((error) => {
                toast.error("E-50398: Unknown Error!");
            });
    };

    const fetchNext = () => {
        // axiosInstance.get();
        console.log("aa");
        // console.log(dcSlice.next);
        if (dcSlice.next)
            axiosInstance
                .get(dcSlice.next)
                .then((response) => {
                    console.log("response", response);
                    dispatch(
                        initState({
                            ...response.data,

                            dictionaries: [...dcSlice.dictionaries],
                        })
                    );
                    dispatch(addMultiDcs(response.data.results));
                })
                .catch((error) => console.log("error", error));
    };

    const handleRefresh = () => {
        console.log("refresh");
    };

    useEffect(() => {
        handleInitPage();
    }, [sorting]);

    const handleSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
        setSearchInput(e.currentTarget.value);
    };

    return (
        <div className="flex-grow">
            <Navbar
                navbarEnd={
                    <button
                        onClick={() => {
                            navigate("add/");
                        }}
                        className="btn btn-sm text-primary bg-transparent border-none hover:bg-transparent"
                    >
                        <IconPlus></IconPlus>
                    </button>
                }
            >
                Dictionaries
            </Navbar>

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
                                        setSorting("words");
                                    }}
                                    className={`${
                                        sorting === "words" ? "bg-active" : ""
                                    }`}
                                >
                                    Most Words
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
                </div>
                <InfiniteScroll
                    pageStart={0}
                    className=""
                    useWindow={false}
                    loadMore={fetchNext}
                    hasMore={dcSlice.next ? true : false}
                    loader={
                        <div className="loader" key={0}>
                            Loading ...
                        </div>
                    }
                >
                    <div className="flex flex-col gap-2">
                        {dictionaries.map((val) => (
                            <DictionaryListItem
                                dictionary={val}
                                className="cursor-pointer shadow"
                                onClick={() => {
                                    navigate(`/dictionaries/${val.id}`);
                                }}
                                key={val.id}
                            ></DictionaryListItem>
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    );
}

export default DictionaryListPage;

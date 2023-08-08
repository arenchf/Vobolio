import React, { useState, useContext, useEffect } from "react";
import "./Dashboard.scss";

import axiosInstance from "../../axios";
import DictionaryList from "../../components/DictionaryList/DictionaryList";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import Header from "../../components/Header/Header";
import Avatar from "../Avatar/Avatar";
import { useAppDispatch, useAppSelector } from "../../store";
import DictionarySlice, {
    setTotalDictionaries,
} from "../../slices/dictionarySlice";
import { useNavigate } from "react-router";

function Dashboard() {
    const auth = useContext<IAuthContext | null>(AuthContext);
    const dispatch = useAppDispatch();
    const dictionarySlice = useAppSelector((store) => store.dictionarySlice);
    const navigate = useNavigate();
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (auth) {
            axiosInstance
                .get(
                    `api/v1/users/${auth?.user?.username}/dictionaries/?limit=0&offset=0`
                )
                .then((response) => {
                    dispatch(setTotalDictionaries(response.data.count));
                });
        }
    }, [dictionarySlice, auth, dispatch]);

    return (
        <div className="page-dashboard">
            <Header
                title={`Hi, ${auth?.user?.username}!`}
                // isSearching={isSearching}
                searchButton={false}
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
            ></Header>
            <div className="dashboard-content content">
                <div
                    onClick={() => {
                        navigate("/dictionaries");
                    }}
                    className="widget widget-dictionaries-db rounded bg-secondary"
                >
                    <div className="widget-title">
                        Your <br /> Dictionaries
                    </div>
                    <div className="widget-body ">{dictionarySlice.total}</div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

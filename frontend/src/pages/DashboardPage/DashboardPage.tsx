import React, { useState, useContext, useEffect } from "react";
// import "./Dashboard.scss";

import axiosInstance from "../../axios";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import { NavLink, useNavigate } from "react-router-dom";
import {
    IconAbc,
    IconBook2,
    IconChevronLeft,
    IconChevronRight,
    IconVocabulary,
} from "@tabler/icons-react";
import User from "../../models/User";
import { DayPicker, Row, RowProps } from "react-day-picker";
import "react-day-picker/dist/style.css";

import {
    add,
    addDays,
    addWeeks,
    eachDayOfInterval,
    endOfWeek,
    format,
    formatDuration,
    formatISO,
    getMonth,
    getWeek,
    getYear,
    isSameDay,
    isWithinInterval,
    parseISO,
    startOfWeek,
    sub,
    subDays,
    subWeeks,
} from "date-fns";
import { is } from "date-fns/locale";
import DictionaryListItem from "../../components/DictionaryListItem/DictionaryListItem";
import Dictionary from "../../models/Dictionary";

interface TrainingActivity {
    created_at: string;
    right_answers: number;
    total_answers: number;
}

function DashboardPage() {
    const auth = useContext<IAuthContext | null>(AuthContext);
    const [userInfo, setUserInfo] = useState<User | null>();

    const [calendarWeek, setCalendarWeek] = useState<number>(0);
    const navigate = useNavigate();
    const [dictionaries, setDictionaries] = useState<Dictionary[]>([]);

    const [activityCalendar, setActivityCalendar] = useState<{
        dates: { day: Date; activity: TrainingActivity | null }[];
        month: string;
        year: string;
    }>();

    const [trainingActivity, setTrainingActivity] =
        useState<TrainingActivity[]>();

    useEffect(() => {
        if (auth) {
            axiosInstance
                .get(`api/v1/users/${auth.user?.username}/`)
                .then((response) => {
                    setUserInfo(response.data);
                    // console.log("response", response.data);
                })
                .catch((error) => console.log("error", error));
        }
    }, []);
    const handleNextWeekClick = () => {
        setCalendarWeek(calendarWeek + 1);
    };
    const handlePreviousWeekClick = () => {
        setCalendarWeek(calendarWeek - 1);
    };

    useEffect(() => {
        axiosInstance
            .get(`api/v1/users/${auth?.user?.username}/activity/`)
            .then((resp) => {
                setTrainingActivity(resp.data);
                // console.log("resp", resp);
            })
            .catch((error) => {
                console.log("error", error);
            });
        axiosInstance
            .get(`api/v1/users/${auth?.user?.username}/dictionaries/?sort=last`)
            .then((response) => {
                console.log("response", response);
                setDictionaries(response.data.results);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        let today = new Date();
        let curWeek = add(today, { weeks: calendarWeek });
        let end = endOfWeek(curWeek, { weekStartsOn: 1 });
        let start = startOfWeek(curWeek, { weekStartsOn: 1 });
        let days: { day: Date; activity: TrainingActivity | null }[] = [];
        if (trainingActivity) {
            // console.log("g");
            eachDayOfInterval({ start, end }).forEach((day) => {
                // console.log("a");
                let isSame = false;
                trainingActivity.forEach((activity) => {
                    if (isSameDay(parseISO(activity.created_at), day)) {
                        isSame = true;
                        days.push({ day: day, activity: activity });
                        // return;
                    }
                });
                if (!isSame) days.push({ day: day, activity: null });
            });
        }
        // console.log("days", days);
        setActivityCalendar({
            dates: days,
            month: format(curWeek, "LLLL"),
            year: getYear(curWeek).toString(),
        });
    }, [calendarWeek, trainingActivity]);

    useEffect(() => {
        // console.log("activityCalendar", activityCalendar);
    }, [activityCalendar]);
    return (
        <div className="flex-grow">
            <Navbar
                navbarEnd={
                    <NavLink to={"/profile"} className="avatar">
                        <div className="w-12 rounded-full">
                            <img
                                src={`${axiosInstance.defaults.baseURL}${auth?.user?.img}`}
                                alt={`Avatar ${auth?.user?.username}`}
                            ></img>
                        </div>
                    </NavLink>
                }
            >
                Hi, {auth?.user?.username}!
            </Navbar>
            <div className="flex flex-col gap-2 max-w-screen-lg m-auto flex-wrap justify-center p-4">
                <div className="flex flex-row flex-grow gap-2 flex-wrap">
                    <div>
                        <div className="text-lg font-bold">Stats</div>
                        <div className="stat px-0">
                            <div className="stat-figure text-primary">
                                <IconBook2 className="w-10 h-10"></IconBook2>
                            </div>
                            <div className="stat-title">Total Dictionaries</div>
                            <div className="stat-value">
                                {userInfo?.dictionary_count}
                            </div>
                        </div>
                        <div className="stat px-0">
                            <div className="stat-figure text-primary">
                                <IconVocabulary className="w-10 h-10"></IconVocabulary>
                            </div>
                            <div className="stat-title">Total Words</div>
                            <div className="stat-value">
                                {userInfo?.word_count}
                            </div>
                        </div>
                        <div className="stat px-0">
                            <div className="stat-figure text-success">
                                <IconAbc className="w-10 h-10"></IconAbc>
                            </div>
                            <div className="stat-title">Learned Words</div>
                            <div className="stat-value">
                                {userInfo?.learned_words_count}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col  flex-grow  h-fit gap-2 overflow-auto">
                        <div className="text-lg font-bold">
                            Training Activity
                        </div>
                        <div className="bg-front rounded-3xl  shadow p-4">
                            <div className="flex flex-row justify-end items-center ">
                                <div className="text-2xl h-full font-bold truncate">
                                    {activityCalendar?.year}{" "}
                                    {activityCalendar?.month}
                                </div>
                                <div className="flex flex-row flex-nowrap">
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={handlePreviousWeekClick}
                                    >
                                        <IconChevronLeft></IconChevronLeft>
                                    </button>
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={handleNextWeekClick}
                                    >
                                        <IconChevronRight></IconChevronRight>
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-row gap-1 justify-between p-2">
                                {activityCalendar?.dates.map((val, index) => (
                                    <div
                                        key={index}
                                        className={`tooltip ${
                                            index > 2
                                                ? "tooltip-left"
                                                : "tooltip-right"
                                        }`}
                                        data-tip={`Right Answers: ${
                                            val.activity?.right_answers ?? 0
                                        }`}
                                    >
                                        <button
                                            className={`btn bg-front text-text  active:bg-front hover:bg-front border-none w-full p-2 flex items-center justify-center font-bold select-none rounded-xl ${
                                                val.activity?.right_answers
                                                    ? "bg-success hover:bg-success active:!bg-success"
                                                    : ""
                                            }`}
                                            key={index}
                                        >
                                            {val.day.getDate()}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 ">
                    <div className="text-lg font-bold">Recent</div>
                    {dictionaries.slice(0, 5).map((val, index) => (
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
            </div>
        </div>
    );
}

export default DashboardPage;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
    IconBook2,
    IconBrain,
    IconChevronLeft,
    IconEdit,
    IconHome,
    IconMenu,
    IconMenu2,
    IconMoon,
    IconPencil,
    IconPlus,
    IconSun,
    IconUser,
    IconUsersGroup,
} from "@tabler/icons-react";
import Navbar from "../../components/Navbar/Navbar";
import coloredLogo from "../../logoColoredCroppedCompressed.png";
import ThemeContext, { IThemeContext } from "../../contexts/ThemeContext";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
function LandingPage() {
    const auth = useContext<IAuthContext | null>(AuthContext);
    const themeContext = useContext<IThemeContext | null>(ThemeContext);
    const [wordStack, setWordStack] = useState({
        total: 30,
        rightAnswers: 22,
        words: [
            {
                word: "Opportunity",
                answers: [
                    {
                        id: 1,
                        word: "Die Gesellschaft",
                    },
                    {
                        id: 2,
                        word: "Die Gelegenheit",
                    },
                    {
                        id: 3,
                        word: "Die Möglichkeit",
                    },
                    {
                        id: 4,
                        word: "Der Bericht",
                    },
                ],
            },
        ],
    });

    useEffect(() => {
        console.log("wordStack", wordStack);
    }, [wordStack]);

    const handleRightAnswer = () => {
        console.log("right");
        setWordStack({
            ...wordStack,
            rightAnswers: wordStack.rightAnswers + 1,
        });
    };

    const handleWrongAnswer = () => {};

    return (
        <div>
            <Navbar
                className="m-auto relative"
                beforeTitle={
                    <label
                        htmlFor="drawer"
                        className="btn btn-ghost drawer-button lg:hidden"
                    >
                        <IconMenu2></IconMenu2>
                    </label>
                }
                navbarEnd={
                    <div className="flex flex-row items-center justify-end">
                        <div className="">
                            <label className="swap swap-rotate btn btn-ghost">
                                <input
                                    type="checkbox"
                                    // className="hidden"
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        themeContext?.changeTheme(
                                            // themeContext?.theme === "dark"
                                            //     ? "light"
                                            //     : "dark"
                                            e.currentTarget.checked
                                                ? "dark"
                                                : "light"
                                        );
                                    }}
                                    checked={themeContext?.theme === "dark"}
                                />
                                <IconSun className="swap-off fill-yellow-500"></IconSun>
                                <IconMoon className="swap-on  fill-slate-400"></IconMoon>
                            </label>
                        </div>
                        <div className="hidden lg:block ">
                            <ul className="flex flex-row">
                                {auth?.user ? (
                                    <>
                                        <li>
                                            <Link to={"/home"}>
                                                <button className="btn btn-ghost active:bg-primary">
                                                    Dashboard
                                                </button>
                                            </Link>
                                        </li>
                                        <li>
                                            <button
                                                className="btn btn-ghost active:bg-primary"
                                                onClick={() => {
                                                    auth?.logout();
                                                }}
                                            >
                                                Logout
                                            </button>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <button
                                                className="btn btn-ghost active:bg-primary"
                                                onClick={() => {
                                                    auth?.login("demo", "demo");
                                                }}
                                            >
                                                Demo
                                            </button>
                                        </li>
                                        {/* <li>
                                            <Link to={"/login"}>
                                                <button className="btn btn-ghost active:bg-primary">
                                                    Login
                                                </button>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/register"}>
                                                <button className="btn btn-ghost active:bg-primary">
                                                    Register
                                                </button>
                                            </Link>
                                        </li> */}
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                }
                afterTitle={
                    <Link
                        to={"/"}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4"
                        // className="flex flex-row flex-1 items-center justify-center lg:block"
                    >
                        <img
                            className="h-10 object-contain"
                            src={coloredLogo}
                            alt="Logo"
                        />
                    </Link>
                }
            ></Navbar>

            <div className="max-w-screen-lg m-auto">
                <div className="flex flex-col w-full">
                    <div className="hero">
                        <div className="hero-content flex-col md:flex-row ">
                            <div className="text-center md:text-left">
                                <h1 className="text-5xl font-bold line-clamp-3">
                                    Create Dictionaries
                                </h1>
                                <p className="py-6">
                                    Unleash your language learning potential
                                    with our user-friendly dictionary creation
                                    tool. Build custom dictionaries tailored to
                                    your interests, whether it's travel,
                                    business, or personal growth. Crafting your
                                    dictionaries empowers you to curate content
                                    that matters most to you, making learning an
                                    enjoyable and relevant experience. With
                                    easy-to-use features, you can organize words
                                    seamlessly, making your language journey
                                    uniquely yours.
                                </p>
                            </div>
                            <div className="mockup-phone flex-shrink-0">
                                <div className="camera"></div>
                                <div className="display w-full">
                                    <div className="artboard h-[568px] max-w-xs w-full bg-back p-3 pt-7 flex flex-col">
                                        <div className="btn btn-sm pl-2 text-primary border-0 bg-back self-end hover:bg-back ">
                                            {/* <span className="normal-case">
                                            New Dictionary
                                        </span> */}
                                            <IconPlus></IconPlus>
                                        </div>
                                        <div className="text-2xl font-bold truncate flex-shrink-0">
                                            Dictionaries
                                        </div>
                                        <div className="dictionary-cards w-full  flex flex-col gap-2 select-none relative">
                                            <div className="dictionary-card flex items-center flex-row gap-3 justify-between bg-front w-full p-4 h-20 shadow-xl rounded-3xl ">
                                                <div className="left h-full flex flex-row gap-3 items-center">
                                                    <img
                                                        className="h-full rounded-2xl"
                                                        src={
                                                            "./assets/flags/1x1/de.svg"
                                                        }
                                                        alt="German Flag"
                                                    />
                                                    <div className="">
                                                        My German Dictionary
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary"
                                                    style={
                                                        {
                                                            "--value": 63,
                                                            "--size": "3rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    63%
                                                </div>
                                            </div>

                                            <div className="dictionary-card flex items-center flex-row gap-3 justify-between bg-front w-full p-4 h-20 shadow-xl rounded-3xl ">
                                                <div className="left h-full flex flex-row gap-3 items-center">
                                                    <img
                                                        // className="object-contain"
                                                        className="h-full rounded-2xl"
                                                        src={
                                                            "./assets/flags/1x1/de.svg"
                                                        }
                                                        alt="German Flag"
                                                    />
                                                    <div className="">
                                                        German B2
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary"
                                                    style={
                                                        {
                                                            "--value": 10,
                                                            "--size": "3rem",
                                                            // "--thickness": "0.25rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    10%
                                                </div>
                                            </div>
                                            <div className="dictionary-card flex items-center flex-row gap-3 justify-between bg-front w-full p-4 h-20 shadow-xl rounded-3xl ">
                                                <div className="left h-full flex flex-row gap-3 items-center">
                                                    <img
                                                        // className="object-contain"
                                                        className="h-full rounded-2xl"
                                                        src={
                                                            "./assets/flags/1x1/de.svg"
                                                        }
                                                        alt="German Flag"
                                                    />
                                                    <div className="">
                                                        German B1
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary"
                                                    style={
                                                        {
                                                            "--value": 100,
                                                            "--size": "3rem",
                                                            // "--thickness": "0.25rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    100%
                                                </div>
                                            </div>
                                            <div className="dictionary-card flex items-center flex-row gap-3 justify-between bg-front w-full p-4 h-20 shadow-xl rounded-3xl ">
                                                <div className="left h-full flex flex-row gap-3 items-center">
                                                    <img
                                                        // className="object-contain"
                                                        className="h-full rounded-2xl"
                                                        src={
                                                            "./assets/flags/1x1/gb.svg"
                                                        }
                                                        alt="English Flag"
                                                    />
                                                    <div className="">
                                                        English Dictionary
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary"
                                                    style={
                                                        {
                                                            "--value": 37,
                                                            "--size": "3rem",
                                                            // "--thickness": "0.25rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    37%
                                                </div>
                                            </div>
                                            <div className="dictionary-card flex items-center flex-row gap-3 justify-between bg-front  w-full p-4 h-20 shadow-xl rounded-3xl ">
                                                <div className="left h-full flex flex-row gap-3 items-center">
                                                    <img
                                                        // className="object-contain"
                                                        className="h-full rounded-2xl"
                                                        src={
                                                            "./assets/flags/1x1/es.svg"
                                                        }
                                                        alt="Spanish Flag"
                                                    />
                                                    <div className="">
                                                        Stephanie's Spanish
                                                        Dictionary (Copy)
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary"
                                                    style={
                                                        {
                                                            "--value": 63,
                                                            "--size": "3rem",
                                                            // "--thickness": "0.25rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    63%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btm-nav border-t border-border btm-nav-sm h-16 sticky pb-4 pt-1 bg-front">
                                        <button>
                                            <span className="indicator">
                                                <div className="indicator-item badge badge-sm badge-primary px-1 ">
                                                    1
                                                </div>
                                                <IconHome
                                                    height={"21px"}
                                                ></IconHome>
                                            </span>
                                            <span className="btm-nav-label">
                                                Home
                                            </span>
                                        </button>
                                        <button>
                                            <IconBook2
                                                className="stroke-primary"
                                                style={{
                                                    // fill: "",
                                                    // stroke: "white",
                                                    strokeWidth: 2.5,
                                                }}
                                            ></IconBook2>
                                            <span className="btm-nav-label text-primary">
                                                Dictionaries
                                            </span>
                                        </button>
                                        <button>
                                            <IconBrain></IconBrain>
                                            <span className="btm-nav-label">
                                                Train
                                            </span>
                                        </button>
                                        <button>
                                            <IconUsersGroup></IconUsersGroup>
                                            <span className="btm-nav-label">
                                                Social
                                            </span>
                                        </button>
                                        <button>
                                            <IconUser></IconUser>
                                            <span className="btm-nav-label">
                                                Profile
                                            </span>
                                        </button>
                                        <div className="absolute bottom-1 w-1/3 rounded-full cursor-default h-2 bg-border"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero ">
                        <div className="hero-content flex-col md:flex-row-reverse ">
                            <div className="text-center">
                                <h1 className="text-5xl font-bold w-full line-clamp-2">
                                    Add Words
                                </h1>
                                <p className="py-6">
                                    Elevate your vocabulary effortlessly by
                                    adding words to your personalized
                                    dictionaries. Every encounter with a new
                                    word becomes an opportunity for growth. Our
                                    intuitive interface lets you seamlessly
                                    input words, along with their meanings and
                                    contextual usage, enhancing your language
                                    exploration. Whether you stumble upon an
                                    unfamiliar term in a book or hear a
                                    captivating phrase in conversation, you can
                                    now collect and assimilate new vocabulary
                                    effortlessly.
                                </p>
                            </div>
                            <div className="mockup-phone flex-shrink-0">
                                <div className="camera"></div>
                                <div className="display w-full">
                                    <div className="artboard h-[568px] max-w-xs w-full bg-back p-3 pt-7 flex flex-col">
                                        <div className="flex flex-row justify-between">
                                            {/* <div className="btn btn-sm pl-2  text-primary border-0 glass hover:bg-white  ">
                                            <IconChevronLeft></IconChevronLeft>
                                        </div> */}
                                            <span></span>
                                            <div className="">
                                                <div className="btn btn-sm pl-2  text-primary border-0 bg-transparent hover:bg-transparent ">
                                                    <IconEdit></IconEdit>
                                                </div>
                                                <div className="btn btn-sm pl-2  text-primary border-0 bg-transparent hover:bg-transparent ">
                                                    {/* <span className="normal-case">
                                                New Word
                                            </span> */}
                                                    <IconPlus></IconPlus>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold line-clamp-2 flex-shrink-0">
                                            My German Dictionary
                                        </div>

                                        <div className="word-cards w-full  flex flex-col gap-2 select-none relative">
                                            <div className="word-card flex items-center flex-row gap-3  justify-between bg-front w-full px-4 py-1 h-20 shadow-xl rounded-3xl ">
                                                <div className="h-full flex flex-col">
                                                    <div className="font-semibold text-lg line-clamp-1">
                                                        Die Gesellschaft
                                                    </div>
                                                    <div className="line-clamp-1">
                                                        Society
                                                    </div>

                                                    <div className="categories text-sm flex flex-row gap-1">
                                                        <div className="badge badge-sm border-border">
                                                            Nomen
                                                        </div>
                                                        <div className="badge badge-sm border-border">
                                                            B2
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress text-sm text-primary flex-shrink-0"
                                                    style={
                                                        {
                                                            "--value": 0,
                                                            "--size": "3rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    0%
                                                </div>
                                            </div>
                                            <div className="word-card flex items-center flex-row gap-3  justify-between bg-front w-full px-4 py-1 h-20 shadow-xl rounded-3xl ">
                                                <div className="h-full flex flex-col">
                                                    <div className="font-semibold text-lg line-clamp-1">
                                                        entwickeln
                                                    </div>
                                                    <div className=" line-clamp-1">
                                                        to develop
                                                    </div>

                                                    <div className="categories text-sm flex flex-row gap-1">
                                                        <div className="badge badge-sm border-border">
                                                            Verben
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary flex-shrink-0"
                                                    style={
                                                        {
                                                            "--value": 68,
                                                            "--size": "3rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    68%
                                                </div>
                                            </div>
                                            <div className="word-card flex items-center flex-row gap-3  justify-between bg-front w-full px-4 py-1 h-20 shadow-xl rounded-3xl ">
                                                <div className="h-full flex flex-col ">
                                                    <div className="font-semibold text-lg line-clamp-1">
                                                        ermöglichen
                                                    </div>
                                                    <div className="line-clamp-1">
                                                        to enable
                                                    </div>

                                                    <div className="categories text-sm flex flex-row gap-1">
                                                        <div className="badge badge-sm border-border">
                                                            Verben
                                                        </div>
                                                        <div className="badge badge-sm border-border">
                                                            B1
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary flex-shrink-0"
                                                    style={
                                                        {
                                                            "--value": 22,
                                                            "--size": "3rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    22%
                                                </div>
                                            </div>
                                            <div className="word-card flex items-center flex-row gap-2 justify-between bg-front w-full px-4 py-1 h-20 shadow-xl rounded-3xl  overflow-hidden">
                                                <div className="h-full flex flex-col ">
                                                    {/* <div className="flex flex-col items-center h-full flex-wrap"> */}
                                                    <div className="font-semibold text-lg line-clamp-1">
                                                        Der Zusammenhang
                                                    </div>
                                                    <div className="line-clamp-1">
                                                        Context / Connection
                                                    </div>
                                                    {/* </div> */}
                                                    <div className="categories text-sm flex flex-row gap-1">
                                                        <div className="badge badge-sm border-border">
                                                            Nomen
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress text-primary text-sm flex-shrink-0"
                                                    style={
                                                        {
                                                            "--value": 100,
                                                            "--size": "3rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    100%
                                                </div>
                                            </div>
                                            <div className="word-card flex items-center flex-row gap-3  justify-between bg-front w-full px-4 py-1 h-20 shadow-xl rounded-3xl ">
                                                <div className="h-full flex flex-col">
                                                    <div className="font-semibold text-lg line-clamp-1">
                                                        kennenlernen
                                                    </div>
                                                    <div className="line-clamp-1">
                                                        to get to know / to meet
                                                    </div>

                                                    <div className="categories text-sm flex flex-row gap-1">
                                                        <div className="badge badge-sm border-border">
                                                            Verben
                                                        </div>
                                                        <div className="badge badge-sm border-border">
                                                            trennbar
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary flex-shrink-0"
                                                    style={
                                                        {
                                                            "--value": 10,
                                                            "--size": "3rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    10%
                                                </div>
                                            </div>
                                            <div className="word-card flex items-center flex-row gap-3  justify-between bg-front w-full px-4 py-1 h-20 shadow-xl rounded-3xl ">
                                                <div className="h-full flex flex-col">
                                                    <div className="font-semibold text-lg line-clamp-1">
                                                        geduldig
                                                    </div>
                                                    <div className="line-clamp-1">
                                                        patient
                                                    </div>

                                                    <div className="categories text-sm flex flex-row gap-1">
                                                        <div className="badge badge-sm border-border">
                                                            Adjektive
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    className="radial-progress flex-shrink-0  text-primary flex-shrink-0"
                                                    style={
                                                        {
                                                            "--value": 10,
                                                            "--size": "3rem",
                                                        } as React.CSSProperties
                                                    }
                                                >
                                                    10%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="btm-nav border-t btm-nav-sm h-16 sticky pb-4 pt-1 bg-front border-border">
                                        <button>
                                            <span className="indicator">
                                                <div className="indicator-item badge badge-sm badge-primary px-1 ">
                                                    1
                                                </div>
                                                <IconHome
                                                    height={"21px"}
                                                ></IconHome>
                                            </span>
                                            <span className="btm-nav-label">
                                                Home
                                            </span>
                                        </button>
                                        <button>
                                            <IconBook2
                                                className="stroke-primary"
                                                style={{
                                                    // fill: "",
                                                    // stroke: "white",
                                                    strokeWidth: 2.5,
                                                }}
                                            ></IconBook2>
                                            <span className="btm-nav-label text-primary">
                                                Dictionaries
                                            </span>
                                        </button>
                                        <button>
                                            <IconBrain></IconBrain>
                                            <span className="btm-nav-label">
                                                Train
                                            </span>
                                        </button>
                                        <button>
                                            <IconUsersGroup></IconUsersGroup>
                                            <span className="btm-nav-label">
                                                Social
                                            </span>
                                        </button>

                                        <button>
                                            <IconUser></IconUser>
                                            <span className="btm-nav-label">
                                                Profile
                                            </span>
                                        </button>
                                        <div className="absolute bottom-1 w-1/3 rounded-full cursor-default h-2 bg-gray-300"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="hero mb-6">
                        <div className="hero-content flex-col ">
                            <div className="text-center md:text-left">
                                <h1 className="text-5xl font-bold  w-full line-clamp-2">
                                    Train and Use Everywhere
                                </h1>
                                <p className="py-6">
                                    Imagine honing your language skills
                                    seamlessly, wherever life takes you. Our
                                    platform seamlessly adapts to your rhythm,
                                    empowering you to learn and practice on the
                                    go. Whether you're waiting for a friend,
                                    taking a break, or commuting, turn idle
                                    moments into productive learning
                                    experiences. Access your personalized
                                    dictionaries, engage in immersive training
                                    modules, and even connect with fellow
                                    learners, all from the palm of your hand.
                                    With cross-device compatibility, your
                                    progress and preferences sync effortlessly
                                    between mobile and web. This is more than a
                                    language-learning journey; it's a dynamic,
                                    accessible, and empowering experience that
                                    integrates seamlessly into your daily life.
                                    Embrace the freedom to train, learn, and
                                    socialize, anytime, anywhere. Your language
                                    mastery knows no boundaries – it's a
                                    constant companion on your incredible
                                    journey.
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row gap-3 w-full">
                                <div className="mockup-window border bg-base-200 border-border max-w-screen-xl w-full">
                                    <div className="drawer md:drawer-open">
                                        <input
                                            id="demo-drawer"
                                            type="checkbox"
                                            className="drawer-toggle"
                                        />
                                        <div className="drawer-content flex flex-col items-center bg-back">
                                            {/* Page content here */}

                                            <div className="navbar bg-front flex flex-row justify-between">
                                                <div className="flex gap-4 flex-row">
                                                    <button className="btn text-primary bg-primary/20 border-0 hover:bg-primary/30 md:hidden">
                                                        <IconMenu></IconMenu>
                                                    </button>
                                                    <h1 className="text-5xl font-bold ">
                                                        Training
                                                    </h1>
                                                </div>
                                                <div className="navitem bg-slate-200 rounded-full h-full w-12 shadow"></div>
                                            </div>
                                            <div className=" h-full bg-back w-full flex flex-col items-center gap-4 p-4 mb-8">
                                                <div className="flex flex-row gap-4 items-center">
                                                    <progress
                                                        className="progress progress-primary  w-28 sm:w-56 h-6 shadow-xl"
                                                        value={
                                                            wordStack.rightAnswers
                                                        }
                                                        max={wordStack.total}
                                                    ></progress>
                                                    <span>
                                                        {wordStack.rightAnswers}
                                                        /{wordStack.total}
                                                    </span>
                                                </div>
                                                <div className="stack max-w-xs w-full">
                                                    {wordStack.total -
                                                        wordStack.rightAnswers >
                                                    5 ? (
                                                        Array.from(
                                                            Array(5),
                                                            (e, i) => {
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className="card w-full h-fit p-4 bg-front shadow-xl"
                                                                    >
                                                                        <div className="w-full h-14 flex justify-center items-center text-2xl font-bold">
                                                                            {
                                                                                wordStack
                                                                                    .words[0]
                                                                                    .word
                                                                            }
                                                                        </div>
                                                                        <div className="answers w-full">
                                                                            <div
                                                                                className="join join-vertical w-full"
                                                                                onClick={
                                                                                    handleWrongAnswer
                                                                                }
                                                                            >
                                                                                <button className="btn bg-active border-border join-item normal-case active:bg-error">
                                                                                    {
                                                                                        wordStack
                                                                                            .words[0]
                                                                                            .answers[0]
                                                                                            .word
                                                                                    }
                                                                                </button>
                                                                                <button
                                                                                    className="btn bg-active border-border join-item normal-case active:bg-success"
                                                                                    onClick={
                                                                                        handleRightAnswer
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        wordStack
                                                                                            .words[0]
                                                                                            .answers[1]
                                                                                            .word
                                                                                    }
                                                                                </button>
                                                                                <button
                                                                                    className="btn bg-active border-border join-item normal-case active:bg-error"
                                                                                    onClick={
                                                                                        handleWrongAnswer
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        wordStack
                                                                                            .words[0]
                                                                                            .answers[2]
                                                                                            .word
                                                                                    }
                                                                                </button>
                                                                                <button
                                                                                    className="btn bg-active border-border join-item normal-case active:bg-error"
                                                                                    onClick={
                                                                                        handleWrongAnswer
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        wordStack
                                                                                            .words[0]
                                                                                            .answers[3]
                                                                                            .word
                                                                                    }
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : wordStack.total -
                                                          wordStack.rightAnswers <=
                                                      0 ? (
                                                        <div className="p-10 rounded-3xl bg-primary text-4xl font-bold text-white">
                                                            Well done, you have
                                                            answered all the
                                                            words correctly!
                                                        </div>
                                                    ) : (
                                                        Array.from(
                                                            Array(
                                                                wordStack.total -
                                                                    wordStack.rightAnswers
                                                            ),
                                                            (e, i) => {
                                                                return (
                                                                    <div
                                                                        key={i}
                                                                        className="card w-full h-fit p-4 bg-front shadow-xl"
                                                                    >
                                                                        <div className="w-full h-14 flex justify-center items-center text-2xl font-bold">
                                                                            {
                                                                                wordStack
                                                                                    .words[0]
                                                                                    .word
                                                                            }
                                                                        </div>
                                                                        <div className="answers w-full">
                                                                            <div
                                                                                className="join join-vertical w-full"
                                                                                onClick={
                                                                                    handleWrongAnswer
                                                                                }
                                                                            >
                                                                                <button className="btn bg-active border-border join-item normal-case active:bg-error">
                                                                                    {
                                                                                        wordStack
                                                                                            .words[0]
                                                                                            .answers[0]
                                                                                            .word
                                                                                    }
                                                                                </button>
                                                                                <button
                                                                                    className="btn bg-active border-border join-item normal-case active:bg-success"
                                                                                    onClick={
                                                                                        handleRightAnswer
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        wordStack
                                                                                            .words[0]
                                                                                            .answers[1]
                                                                                            .word
                                                                                    }
                                                                                </button>
                                                                                <button
                                                                                    className="btn bg-active border-border join-item normal-case active:bg-error"
                                                                                    onClick={
                                                                                        handleWrongAnswer
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        wordStack
                                                                                            .words[0]
                                                                                            .answers[2]
                                                                                            .word
                                                                                    }
                                                                                </button>
                                                                                <button
                                                                                    className="btn bg-active border-border join-item normal-case active:bg-error"
                                                                                    onClick={
                                                                                        handleWrongAnswer
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        wordStack
                                                                                            .words[0]
                                                                                            .answers[3]
                                                                                            .word
                                                                                    }
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="drawer-side hidden h-full">
                                            <label
                                                htmlFor="demo-drawer"
                                                className="drawer-overlay"
                                            ></label>
                                            <div className=" p-4 w-52 flex flex-col justify-between items-center h-full bg-front">
                                                <div className="flex flex-col items-center w-full">
                                                    <div className="logo bg-slate-200 w-3/4 h-12"></div>
                                                    <ul className="menu w-full flex flex-col items-center">
                                                        <li className="w-3/4 h-9 bg-slate-200  rounded-3xl"></li>
                                                        <li className="w-3/4 h-9 bg-slate-200  rounded-3xl"></li>
                                                        <li className="w-3/4 h-9 bg-slate-200  rounded-3xl"></li>
                                                        <li className="w-3/4 h-9 bg-slate-200  rounded-3xl"></li>
                                                    </ul>
                                                </div>
                                                <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;

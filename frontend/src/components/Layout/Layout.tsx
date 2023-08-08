import React, { useContext } from "react";
import "./Layout.scss";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";
import {
    IconHome,
    IconBooks,
    IconBrain,
    IconUsersGroup,
    IconChartHistogram,
    IconSearch,
    IconLogout2,
    IconUser,
} from "@tabler/icons-react";
import coloredLogo from "../../logoColoredCroppedCompressed.png";
import letterLogo from "../../logoLetterColoredCompressedCropped.png";
import Footer from "../Footer/Footer";

function Layout() {
    const auth = useContext<IAuthContext | null>(AuthContext);

    return (
        <div className="layout">
            <div className="sidebar">
                <div className="logo">
                    <Link to={"/"}>
                        <img
                            className="long-logo"
                            src={coloredLogo}
                            alt="Logo"
                        />
                        <img
                            className="letter-logo"
                            src={letterLogo}
                            alt="Logo"
                        />
                    </Link>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                to={"/home"}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                <IconHome size={24} />
                                <span>Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/dictionaries"}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                <IconBooks size={24} />
                                <span>Dictionaries</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/train"}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                <IconBrain size={24} />
                                <span>Train</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/social"}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                <IconUsersGroup size={24} />
                                <span>Social</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={"/profile"}
                                className={({ isActive }) =>
                                    isActive ? "active" : ""
                                }
                            >
                                <IconUser size={24} />
                                <span>Profile</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="logout">
                    <button onClick={() => auth?.logout()}>
                        <IconLogout2 size={24}></IconLogout2>
                    </button>
                </div>
            </div>

            <div className="main">
                <div className="page-wrapper">
                    <Outlet></Outlet>
                </div>
                <Footer></Footer>
            </div>
        </div>
    );
}

export default Layout;

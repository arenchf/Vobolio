import React, { useContext, useEffect, useState } from "react";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
import {
    IconBook2,
    IconBrain,
    IconHome,
    IconLogout2,
    IconMenu2,
    IconMoon,
    IconSettings,
    IconSun,
    IconUser,
    IconUsersGroup,
} from "@tabler/icons-react";
import { Link, NavLink, Outlet } from "react-router-dom";
import coloredLogo from "../../logoColoredCroppedCompressed.png";
import ThemeContext, { IThemeContext } from "../../contexts/ThemeContext";

function Layout() {
    const auth = useContext<IAuthContext | null>(AuthContext);
    const themeContext = useContext<IThemeContext | null>(ThemeContext);
    const [pwa, setPwa] = useState(false);

    useEffect(() => {
        let standalone = window.matchMedia("(display-mode: standalone)");
        if (standalone.matches) setPwa(true);
    }, []);

    return (
        <div className="drawer bg-back h-full lg:drawer-open ">
            <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col ml-0 lg:ml-60 overflow-y-scroll">
                <Outlet></Outlet>
                <div
                    className={`btm-nav border-t bg-front border-border btm-nav-md sticky bottom-0 lg:hidden flex-shrink-0 ${
                        pwa ? "pb-4 h-20" : ""
                    }`}
                >
                    <NavLink
                        to={"/home"}
                        className={({ isActive }) =>
                            isActive
                                ? `text-primary active border-none`
                                : `active:text-primary !pt-0`
                        }
                    >
                        <IconHome></IconHome>
                        <span className="btm-nav-label">Home</span>
                    </NavLink>
                    <NavLink
                        to={"/dictionaries"}
                        className={({ isActive }) =>
                            isActive
                                ? `text-primary active border-none`
                                : `active:text-primary !pt-0`
                        }
                    >
                        <IconBook2></IconBook2>
                        <span className="btm-nav-label">Dictionaries</span>
                    </NavLink>
                    <NavLink
                        to={"/training"}
                        className={({ isActive }) =>
                            isActive
                                ? `text-primary active border-none`
                                : `active:text-primary !pt-0`
                        }
                    >
                        <IconBrain></IconBrain>
                        <span className="btm-nav-label">Train</span>
                    </NavLink>
                    <NavLink
                        to={"/profile"}
                        className={({ isActive }) =>
                            isActive
                                ? `text-primary active border-none`
                                : `active:text-primary !pt-0`
                        }
                    >
                        <IconUser></IconUser>
                        <span className="btm-nav-label">Profile</span>
                    </NavLink>

                    <label
                        htmlFor="my-drawer-3"
                        className="items-center justify-center cursor-pointer"
                    >
                        <IconMenu2></IconMenu2>
                        <span className="btm-nav-label">Menu</span>
                    </label>
                </div>
            </div>
            <div className="drawer-side z-20 lg:z-auto  h-full">
                <label
                    htmlFor="my-drawer-3"
                    className="drawer-overlay "
                ></label>
                <div className="p-4 w-60 h-full  bg-front fixed flex flex-col justify-between">
                    <div className="flex flex-col">
                        <Link to={"/"}>
                            <img
                                className="h-10 object-contain m-auto"
                                src={coloredLogo}
                                alt="Logo"
                            />
                        </Link>
                        <div className="divider"></div>
                        <ul className="menu flex flex-col gap-2">
                            <li className="menu-item ">
                                <NavLink
                                    to={"/home"}
                                    className="menu-link flex flex-row gap-3 text-xl items-center "
                                >
                                    <IconHome className=""></IconHome>
                                    <span>Home</span>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink
                                    to={"/dictionaries"}
                                    className="menu-link flex flex-row gap-3 text-xl items-center"
                                >
                                    <IconBook2></IconBook2>
                                    <span>Dictionaries</span>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink
                                    to={"/training"}
                                    className="menu-link flex flex-row gap-3 text-xl items-center"
                                >
                                    <IconBrain></IconBrain>
                                    <span>Train</span>
                                </NavLink>
                            </li>
                            {/* <li className="menu-item">
                                <NavLink
                                    to={"/social"}
                                    className="menu-link flex flex-row gap-3 text-xl items-center"
                                >
                                    <IconUsersGroup></IconUsersGroup>
                                    <span>Social</span>
                                </NavLink>
                            </li> */}
                            <li className="menu-item">
                                <NavLink
                                    to={"/profile"}
                                    className="menu-link flex flex-row gap-3 text-xl items-center"
                                >
                                    <IconUser></IconUser>
                                    <span>Profile</span>
                                </NavLink>
                            </li>
                            {/* <li className="menu-item">
                                <NavLink
                                    to={"/settings"}
                                    className="menu-link flex flex-row gap-3 text-xl items-center"
                                >
                                    <IconSettings></IconSettings>
                                    <span>Settings</span>
                                </NavLink>
                            </li> */}
                        </ul>
                    </div>
                    <div className="flex flex-col gap-7">
                        <div className="flex flex-row justify-center items-center">
                            <label className="swap swap-rotate">
                                <input
                                    type="checkbox"
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        themeContext?.changeTheme(
                                            e.currentTarget.checked
                                                ? "dark"
                                                : "light"
                                        );
                                    }}
                                    checked={themeContext?.theme === "dark"}
                                />
                                <IconSun className="swap-off fill-yellow-500 w-8 h-8"></IconSun>
                                <IconMoon className="swap-on  fill-slate-400 w-8 h-8"></IconMoon>
                            </label>
                        </div>
                        <div
                            className="flex flex-row justify-center items-center -ml-2"
                            onClick={() => {
                                auth?.logout();
                            }}
                        >
                            <IconLogout2 className="w-8 h-8"></IconLogout2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;

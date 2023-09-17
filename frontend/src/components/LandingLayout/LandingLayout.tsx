import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import coloredLogo from "../../logoColoredCroppedCompressed.png";
import { IconClick, IconLogin, IconUserPlus } from "@tabler/icons-react";
import AuthContext, { IAuthContext } from "../../contexts/AuthContext";
// import ThemeContext, { IThemeContext } from "../../contexts/ThemeContext";

function LandingLayout() {
    // const theme = useContext<IThemeContext | null>(ThemeContext);
    const auth = useContext<IAuthContext | null>(AuthContext);

    return (
        <div className="drawer h-full">
            <input id="drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col transition-[margin] duration-300 ease-out overflow-y-scroll bg-back">
                <Outlet></Outlet>
            </div>
            <div className="drawer-side z-20 lg:hidden  h-full">
                <label htmlFor="drawer" className="drawer-overlay"></label>
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
                            {/* <li className="menu-item ">
                                <NavLink
                                    to={"/login"}
                                    className="menu-link flex flex-row gap-3 text-xl items-center active:!bg-active active:!text-primary hover:!bg-active focus:!bg-active"
                                >
                                    <IconLogin className=""></IconLogin>
                                    <span>Login</span>
                                </NavLink>
                            </li>
                            <li className="menu-item">
                                <NavLink
                                    to={"/register"}
                                    className="menu-link flex flex-row gap-3 text-xl items-center active:!bg-active active:!text-primary hover:!bg-active focus:!bg-active"
                                >
                                    <IconUserPlus></IconUserPlus>
                                    <span>Register</span>
                                </NavLink>
                            </li> */}
                            <li
                                className="menu-item"
                                onClick={() => {
                                    auth?.login("demo", "demo");
                                }}
                            >
                                {/* <button className="btn btn-ghost"> */}
                                <span className="text-lg gap-3 active:!bg-active active:!text-primary hover:!bg-active focus:!bg-active">
                                    <IconClick></IconClick>
                                    <span>Demo</span>
                                </span>
                                {/* </button> */}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingLayout;

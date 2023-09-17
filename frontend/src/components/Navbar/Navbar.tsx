import { IconMenu2, IconUser } from "@tabler/icons-react";
import React, { ReactNode, useContext, useEffect, useState } from "react";

interface INavbar extends React.HTMLAttributes<HTMLDivElement> {
    pageTitle?: string | ReactNode;
    beforeTitle?: ReactNode;
    afterTitle?: ReactNode;
    navbarEnd?: ReactNode;
    contentNode?: ReactNode;
    // drawerToggler?: boolean;
}

function Navbar({
    pageTitle,
    beforeTitle,
    afterTitle,
    navbarEnd,
    contentNode,
    // drawerToggler = true,
    ...props
}: INavbar) {
    return (
        <>
            <div
                className={`w-full navbar min-h-16 bg-front flex flex-row gap-4 justify-between items-center sticky top-0 z-10 shadow lg:shadow-none ${
                    props.className ?? ""
                }`}
            >
                <div className="max-w-screen-lg w-full m-auto">
                    <div className="flex flex-row gap-2 flex-1">
                        {beforeTitle}
                        {props.children ? (
                            <div className="px-2 break-all max-w-xs font-bold text-3xl line-clamp-1  ">
                                {props.children}
                            </div>
                        ) : (
                            <></>
                        )}
                        {afterTitle}
                    </div>
                    {navbarEnd}
                </div>
            </div>
        </>
    );
}

export default Navbar;
function setLastScrollY(scrollY: number) {
    throw new Error("Function not implemented.");
}

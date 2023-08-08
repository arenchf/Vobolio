import { IconX, IconSearch } from "@tabler/icons-react";
import React from "react";
import "./Header.scss";

interface IHeader {
    searchButton?: boolean;
    title?: string;
    left?: React.ReactElement;
    right?: React.ReactElement;
    afterTitle?: React.ReactElement;
    onSearchButton?: () => void;
    isSearching?: boolean;
    className?: string;
}

function Header({
    searchButton = false,
    title,
    left,
    right,
    onSearchButton,
    isSearching = false,
    className = "",
    afterTitle,
}: IHeader) {
    return (
        <div className={`c-header ${className}`}>
            <div className="left">
                {left ? left : <></>}
                {title ? <span className="title">{title}</span> : <></>}
                {afterTitle ? afterTitle : <></>}
            </div>
            <div className="right">
                {searchButton ? (
                    <button onClick={onSearchButton} className="header-button">
                        {isSearching ? (
                            <IconX size={24} />
                        ) : (
                            <IconSearch size={24} />
                        )}
                    </button>
                ) : (
                    <></>
                )}
                {right ? right : <></>}
            </div>
        </div>
    );
}

export default Header;

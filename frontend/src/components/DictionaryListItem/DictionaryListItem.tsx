import React from "react";
import "./DictionaryListItem.scss";
import { flagByLanguage } from "../../models/Flag";

type DictionaryListItemProps = {
    name: string;
    id: number;
    language: string;
    total_words: number;
    learned_words: number;
    onClick?: () => void;
};

function DictionaryListItem({
    name,
    id,
    language,
    total_words,
    learned_words,
    onClick,
}: DictionaryListItemProps) {
    let flag = flagByLanguage(language);

    return (
        <div className="c-dictionary" onClick={onClick}>
            <div className="left">
                <div className="flag-wrapper">
                    <img
                        src={`./assets/${flag?.flag_1x1}`}
                        alt={`${flag?.name} Flag`}
                    />
                </div>
                <div className="dictionary-name">{name}</div>
            </div>
            <div className="right">
                {/* <div className="word-count">
                    <div className="learned">{learned_words}</div>/
                    <div className="total">{total_words}</div>
                </div> */}
                <div className="word-percentage">
                    {total_words !== 0
                        ? (learned_words % total_words) * 100
                        : "0"}
                    %
                </div>
            </div>
        </div>
    );
}

export default DictionaryListItem;

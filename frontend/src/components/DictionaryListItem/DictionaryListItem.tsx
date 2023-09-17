import React, { HTMLAttributes, useEffect, useState } from "react";
// import "./DictionaryListItem.scss";
import { flagByLanguage } from "../../models/Flag";
import Dictionary from "../../models/Dictionary";

interface IDictionaryListItem extends React.HTMLAttributes<HTMLDivElement> {
    dictionary: Dictionary;
    onClick?: () => void;
    // attributes?: HTMLAttributes<HTMLDivElement>;
}

function DictionaryListItem({ dictionary, ...props }: IDictionaryListItem) {
    let flag = flagByLanguage(dictionary.language);

    return (
        <div
            {...props}
            className={`flex flex-row items-center gap-3 justify-between bg-front w-full p-4 h-20  rounded-3xl overflow-hidden ${
                props?.className ?? ""
            }`}
            // onClick={onClick}
        >
            <div className="left h-full flex flex-row gap-3 items-center">
                {/* <div className="flag-wrapper"> */}
                <img
                    className="h-full rounded-2xl"
                    src={`./assets/${flag?.flag_1x1}`}
                    alt={`${flag?.name} Flag`}
                />
                {/* </div> */}
                <div className="line-clamp-2">{dictionary.name}</div>
            </div>
            <div
                className="right radial-progress flex-shrink-0 text-primary"
                style={
                    {
                        "--value":
                            dictionary.total_words !== 0
                                ? (dictionary.learned_words /
                                      dictionary.total_words) *
                                  100
                                : 0,
                        "--size": "3rem",
                    } as React.CSSProperties
                }
            >
                {dictionary.total_words !== 0
                    ? Math.round(
                          (dictionary.learned_words / dictionary.total_words) *
                              100
                      )
                    : 0}
                %
                {/* <Progress
                    progress={
                        dictionary.total_words !== 0
                            ? (dictionary.learned_words /
                                  dictionary.total_words) *
                              100
                            : 0
                    }
                ></Progress> */}
            </div>
        </div>
    );
}

export default DictionaryListItem;

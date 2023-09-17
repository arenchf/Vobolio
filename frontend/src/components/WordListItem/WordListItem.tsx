import React from "react";
import Word from "../../models/Word";
import { IconDots } from "@tabler/icons-react";

interface IWordListItem extends React.HTMLAttributes<HTMLDivElement> {
    word: Word;
}

function WordListItem({ word, ...props }: IWordListItem) {
    return (
        <div
            {...props}
            className={`flex items-center flex-row gap-3 justify-between overflow-hidden bg-front w-full px-4 py-1 h-20  rounded-3xl ${
                props.className ?? ""
            }`}
        >
            <div className="h-full flex flex-col justify-center w-[calc(100%-3.5rem)]">
                <div className="font-semibold text-lg truncate">
                    {word.word}
                </div>
                <div className="">{word.translation}</div>

                {word.categories && word.categories?.length > 0 ? (
                    <div className="categories items-center text-sm flex flex-row gap-1 flex-shrink">
                        {word.categories?.slice(0, 3).map((val, index) => {
                            return (
                                <div
                                    className="word-category badge badge-sm border-border"
                                    key={index}
                                >
                                    {val.name}
                                </div>
                            );
                        })}
                        {word.categories.length > 3 ? (
                            <IconDots className="flex-shrink-0"></IconDots>
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div
                className="radial-progress text-sm text-primary"
                style={
                    {
                        "--value": word.progress,
                        "--size": "3rem",
                    } as React.CSSProperties
                }
            >
                {word.progress}%
            </div>
        </div>
    );
}

export default WordListItem;

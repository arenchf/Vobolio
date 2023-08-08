import React from "react";
import "./WordListItem.scss";
import Word from "../../models/Word";
import { IconEdit } from "@tabler/icons-react";

interface IWordListItem {
    word: Word;
    onClick: () => void;
}

function WordListItem({ word, onClick }: IWordListItem) {
    return (
        <div onClick={onClick} className="c-word-list-item">
            <div className="left">
                <div className="word-progress">{word.progress}%</div>
                <div className="word-main">
                    <div className="word-word">{word.word}</div>
                    <div className="word-translation">{word.translation}</div>
                </div>
            </div>
            <div className="right">
                {/* {word.created_at ? (
                    <div className="word-last-progress">
                        {new Date(word.created_at).toLocaleString()}
                    </div>
                ) : (
                    <></>
                )} */}
                <div className="word-edit-button">
                    <IconEdit size={24}></IconEdit>
                </div>
            </div>
        </div>
    );
}

export default WordListItem;

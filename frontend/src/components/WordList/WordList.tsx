import React from "react";
import "./WordList.scss";
import WordSlice, { selectWord } from "../../slices/wordSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import WordListItem from "../WordListItem/WordListItem";
import Word from "../../models/Word";
import {
    IconArrowsSort,
    IconFilter,
    IconPlus,
    IconSort09,
} from "@tabler/icons-react";

interface IWordList {
    onEdit: () => void;
    onAddNew: () => void;
}

function WordList({ onAddNew, onEdit }: IWordList) {
    const wordSlice = useAppSelector((state) => state.wordSlice);
    const dispatch = useAppDispatch();
    const loadMore = () => {};

    const handleSelectWord = (word: Word) => {
        console.log("selecting Word", word);
        dispatch(selectWord(word));
    };

    return (
        <div className="word-list content">
            <div className="word-filter">
                <div className="filter-button-group">
                    <button className="button btn-sm">
                        <IconFilter size={24}></IconFilter>
                    </button>
                    <button className="button btn-sm">
                        <IconArrowsSort size={24}></IconArrowsSort>
                    </button>
                </div>
                <input
                    className="input word-filter-search"
                    placeholder="Search"
                    type="text"
                ></input>

                <button className="button btn-sm" onClick={onAddNew}>
                    <IconPlus size={24}></IconPlus>
                </button>
            </div>
            <div className="word-list-items">
                {Array.from(wordSlice.words).map((word) => (
                    <WordListItem
                        onClick={() => {
                            handleSelectWord(word);
                            onEdit();
                        }}
                        key={word.id}
                        word={word}
                    />
                ))}
            </div>
            <button className="load-more-button" onClick={loadMore}>
                Load More
            </button>
        </div>
    );
}

export default WordList;

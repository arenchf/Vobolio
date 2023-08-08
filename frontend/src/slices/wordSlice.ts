import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Dictionary from "../models/Dictionary";
import Word from "../models/Word";

interface WordState {
    words: Word[];
    selectedWord: Word | null;
    count: number;
    offset: number;
}

const initialState: WordState = {
    offset: 0,
    count: 0,
    words: [],
    selectedWord: null,
};

export const WordSlice = createSlice({
    name: "word",
    initialState,
    reducers: {
        addWord: (state, action: PayloadAction<Word>) => {
            state.words.unshift(action.payload);
            state.count++;
        },
        editWord: (state, action: PayloadAction<Word>) => {
            state.words[
                state.words.findIndex((val) => val.id === action.payload.id)
            ] = action.payload;
        },
        clearWords: (state) => {
            return { ...initialState };
        },
        addMultipleWords: (
            state,
            action: PayloadAction<{ wordArray: Word[]; offset: boolean }>
        ) => {
            // console.log('ac', ac)
            action.payload.wordArray.forEach((val, index) => {
                if (state.words.indexOf(val) === -1) {
                    state.words.push(val);
                    state.count++;
                    if (action.payload.offset) {
                        state.offset++;
                    }
                }
            });
        },
        clearSelectedWords: (state) => {
            state.selectedWord = null;
        },
        selectWord: (state, action: PayloadAction<Word>) => {
            state.selectedWord = action.payload;
        },
    },
});

export default WordSlice;
export const {
    addWord,
    editWord,
    clearWords,
    addMultipleWords,
    selectWord,
    clearSelectedWords,
} = WordSlice.actions;

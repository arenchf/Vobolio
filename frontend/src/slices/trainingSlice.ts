import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Dictionary from "../models/Dictionary";
import Word from "../models/Word";
import TrainingMode from "../models/TrainingMode";

interface TrainingState {
    // selectedDictionary: Dictionary | null;
    words: Word[];
    rightAnswers: number;
    wrongAnswers: number;
    currentWordIndex: number;
    // info: TrainingMode | null;
    // dictionary: Dictionary | null;
    isActive: boolean;
}

const initialState: TrainingState = {
    // selectedDictionary: null,
    // dictionary: null,
    // info: null,
    words: [],
    rightAnswers: 0,
    wrongAnswers: 0,
    currentWordIndex: 0,
    isActive: false,
};

export const TrainingSlice = createSlice({
    name: "training",
    initialState,
    reducers: {
        // setTrainingDictionary: (state, action: PayloadAction<Dictionary>) => {
        //     state.selectedDictionary = action.payload;
        // },
        addMultiWords: (state, action: PayloadAction<Word[]>) => {
            action.payload.forEach((val, index) => {
                if (
                    state.words.filter((word) => word.id === val.id).length ===
                    0
                ) {
                    if (!val.earned) state.words.push(val);
                }
            });
        },
        // setTrainingInfo: (state, action: PayloadAction<TrainingMode>) => {
        //     state.info = action.payload;
        // },
        // setTrainingDictionary: (state, action: PayloadAction<Dictionary>) => {
        //     state.dictionary = action.payload;
        // },
        removeWord: (state, action: PayloadAction<Word>) => {
            state.words = {
                ...state.words.filter((word) => word !== action.payload),
            };
        },
        clear: (state) => {
            return { ...initialState };
        },
        rightAnswer: (state) => {
            state.rightAnswers++;
        },
        wrongAnswer: (state, action: PayloadAction<Word>) => {
            // console.log(action.payload);

            let index = state.words.findIndex(
                (item) => action.payload.id === item.id
            );

            state.wrongAnswers++;
            // console.log(index);
            const changedArr = [
                ...state.words.filter((a) => a !== state.words[index]),
                state.words[index],
            ];
            state.words = changedArr;
        },
        nextWord: (state) => {
            console.log("NEXT");
            state.currentWordIndex++;
        },
    },
});

export default TrainingSlice;
export const {
    addMultiWords,
    // setTrainingInfo,
    // setTrainingDictionary,
    removeWord,
    rightAnswer,
    wrongAnswer,
    nextWord,
    clear,
} = TrainingSlice.actions;

import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import DictionarySlice from "./slices/dictionarySlice";
import WordSlice from "./slices/wordSlice";
import DcSlice from "./slices/dcSlice";
import TrainingSlice from "./slices/trainingSlice";

export const store = configureStore({
    reducer: {
        // dictionarySlice: DictionarySlice.reducer,
        wordSlice: WordSlice.reducer,
        dcSlice: DcSlice.reducer,
        trainingSlice: TrainingSlice.reducer,
    },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;

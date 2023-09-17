import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Dictionary from "../models/Dictionary";

interface DictionaryState {
    dictionaries: Dictionary[];
    count: number;
    next: string | null;
    prev: string | null;
}

const initialState: DictionaryState = {
    dictionaries: [],
    count: 0,
    next: null,
    prev: null,
};

export const DcSlice = createSlice({
    name: "dc",
    initialState,
    reducers: {
        addDc: (state, action: PayloadAction<Dictionary>) => {
            if (
                state.dictionaries.filter((dc) => dc.id !== action.payload.id)
            ) {
                state.dictionaries.push(action.payload);
            }
        },
        initState: (state, action: PayloadAction<DictionaryState>) => {
            return { ...action.payload };
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload;
        },
        addMultiDcs: (state, action: PayloadAction<Dictionary[]>) => {
            action.payload.forEach((val, index) => {
                if (
                    state.dictionaries.filter((dict) => dict.id === val.id)
                        .length === 0
                ) {
                    state.dictionaries.push(val);
                }
            });
        },
        editDc: (state, action: PayloadAction<Dictionary>) => {
            let index = state.dictionaries.findIndex(
                (dict) => dict.id === action.payload.id
            );
            state.dictionaries[index] = action.payload;
        },
        clearDcs: (state) => {
            return { ...initialState };
        },
    },
});

export default DcSlice;
export const { addDc, addMultiDcs, clearDcs, editDc, initState, setCount } =
    DcSlice.actions;

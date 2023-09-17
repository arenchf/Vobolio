// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import Dictionary from "../models/Dictionary";

// interface DictionaryState {
//     dictionaries: Dictionary[];
//     count: number;
//     offset: number;
//     selectedDictionary: Dictionary | null;
//     total: number;
//     // newDictionary: NewDictionary | null;
// }

// const initialState: DictionaryState = {
//     total: 0,
//     count: 0,
//     offset: 0,
//     dictionaries: [],
//     selectedDictionary: null,
//     // newDictionary:null,
// };

// export const DictionarySlice = createSlice({
//     name: "dictionary",
//     initialState,
//     reducers: {
//         addDictionary: (state, action: PayloadAction<Dictionary>) => {
//             state.dictionaries.unshift(action.payload);
//             state.count++;
//         },
//         editDictionary: (state, action: PayloadAction<Dictionary>) => {
//             state.dictionaries[
//                 state.dictionaries.findIndex(
//                     (val) => val.id === action.payload.id
//                 )
//             ] = action.payload;
//         },
//         clearDictionaries: (state) => {
//             return { ...initialState };
//         },
//         setTotalDictionaries: (state, action: PayloadAction<number>) => {
//             state.total = action.payload;
//         },

//         addMultipleDictionaries: (
//             state,
//             action: PayloadAction<{
//                 dictionaryArray: Dictionary[];
//                 offset: boolean;
//             }>
//         ) => {
//             action.payload.dictionaryArray.forEach((val, index) => {
//                 if (
//                     state.dictionaries.filter((dict) => dict.id === val.id)
//                         .length === 0
//                 ) {
//                     console.log(
//                         val,
//                         "state.dictionaries.indexOf(val)",
//                         state.dictionaries.indexOf(val)
//                     );
//                     state.dictionaries.push(val);
//                     state.count++;
//                     if (action.payload.offset) {
//                         state.offset++;
//                     }
//                 }
//             });
//         },
//         clearSelectedDictionary: (state) => {
//             state.selectedDictionary = null;
//         },
//         selectDictionary: (
//             state,
//             action: PayloadAction<{ dictionary: Dictionary }>
//         ) => {
//             state.selectedDictionary = action.payload.dictionary;
//         },
//     },
// });

// export default DictionarySlice;
// export const {
//     addDictionary,
//     editDictionary,
//     clearDictionaries,
//     addMultipleDictionaries,
//     selectDictionary,
//     clearSelectedDictionary,
//     setTotalDictionaries,
// } = DictionarySlice.actions;

let text = "JSFDGSKFG";
export default test;

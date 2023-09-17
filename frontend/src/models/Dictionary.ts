import Word from "./Word";

// export default interface Dictionary {
//     id: number;
//     name: string;
//     language: string;
//     learned_words: number;
//     total_words: number;
// }

export default interface Dictionary {
    id: number;
    name: string;
    language: string;
    learned_words: number;
    total_words: number;
    words?: Word[];
}

// export interface NewDictionary {
//     name:string;
//     language:string;
// }

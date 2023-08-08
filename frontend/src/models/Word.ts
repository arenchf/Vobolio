import Dictionary from "./Dictionary";
import User from "./User";
import Category from "./Category";

export default interface Word {
    id?: number;
    word?: string;
    translation?: string;
    sentence?: string;
    sentence_translation?: string;
    dictionary?: Dictionary;
    progress?: number;
    earned?: boolean;
    categories?: Category[];
    created_at?: string;
    created_by?: User;
    last_progress_at?: string;
    last_decline?: string;
}

export interface NewWord {
    word?: string;
    translation?: string;
    sentence?: string;
    sentence_translation?: string;
    categories?: number[];
}

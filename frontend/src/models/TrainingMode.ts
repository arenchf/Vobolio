import {
    Icon,
    IconCards,
    IconList,
    IconSwipe,
    IconWriting,
} from "@tabler/icons-react";

export default interface TrainingMode {
    label: string;
    iconSize?: number;
    icon?: Icon;
    className?: string;
    minWords?: number;
    path: string;
}

const trainingModes: TrainingMode[] = [
    // {
    //     label: "Swipe",
    //     icon: IconSwipe,
    //     className: "bg-purple-400 text-white",
    //     minWords: 4,
    //     path: "swipe",
    // },
    {
        label: "Choice",
        icon: IconList,
        className: "bg-red-400 text-white",
        minWords: 4,
        path: "choice",
    },
    // {
    //     label: "Cards",
    //     icon: IconCards,
    //     className: "bg-blue-400 text-white",
    //     minWords: 4,
    //     path: "cards",
    // },

    // {
    //     label: "Fill In The Blank",
    //     icon: IconWriting,
    //     className: "bg-amber-400 text-white",
    //     minWords: 4,
    //     path: "fill",
    // },
];

export { trainingModes };

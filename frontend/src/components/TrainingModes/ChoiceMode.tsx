import React, { useEffect, useState } from "react";
import Word from "../../models/Word";
import { useAppDispatch, useAppSelector } from "../../store";

import shuffleArray from "../../util/shuffle";
import { toast } from "react-toastify";
import { rightAnswer, wrongAnswer, nextWord } from "../../slices/trainingSlice";
import axiosInstance from "../../axios";

interface IChoiceMode {
    word: Word;
    optionCount?: number;
}
const ChoiceMode = ({ word, optionCount = 4 }: IChoiceMode) => {
    const trainingSlice = useAppSelector((store) => store.trainingSlice);
    const dispatch = useAppDispatch();
    const [answer, setAnswer] = useState<{
        index: number;
        class: string;
    } | null>(null);

    const getChoiceOptionsForWord = (): Word[] => {
        let randomWords: Word[] = [];
        randomWords.push(word);

        let i = 0;
        let t = 0;
        while (i < optionCount - 1 && t < 50) {
            var randomWord =
                trainingSlice.words[
                    Math.floor(Math.random() * trainingSlice.words.length)
                ];
            if (!randomWords.includes(randomWord)) {
                randomWords.push(randomWord);
                i++;
            }
            t++;
        }
        if (t === 50) {
            toast.error("E-50367: Unknown Error!");
        }
        return shuffleArray(randomWords);
    };

    const handleClickOption = (answer: Word, index: number) => {
        if (word === answer) {
            // setAnswer({ index: index, class: "bg-success" });
            // setTimeout(() => {
            axiosInstance
                .post("api/v1/word/action/", {
                    action: "success",
                    word: word.id,
                })
                .then((response) => {
                    console.log("response.data", response.data);
                    dispatch(rightAnswer());
                    dispatch(nextWord());
                })
                .catch((error) => {
                    console.log("error", error);
                    dispatch(wrongAnswer(word));
                });
            // }, 2000);
        } else {
            dispatch(wrongAnswer(word));
        }
    };
    return (
        <>
            <div className="w-full h-20 rounded-xl bg-active flex flex-row justify-center items-center font-bold">
                {word.word}
            </div>
            <div className="flex flex-col gap-2">
                {getChoiceOptionsForWord().map((option, index) => {
                    return (
                        <div
                            className={`btn btn-ghost ${
                                answer?.index === index ? answer.class : ""
                            }`}
                            key={index}
                            onClick={() => handleClickOption(option, index)}
                        >
                            {option.translation}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ChoiceMode;

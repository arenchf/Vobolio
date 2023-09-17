import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {
    IconAlertCircle,
    IconArrowLeft,
    IconChecks,
    IconClick,
    IconClockEdit,
    IconDiscountCheckFilled,
    // IconVocabulary,
} from "@tabler/icons-react";
import axiosInstance from "../../axios";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../store";
import {
    addMultiWords,
    // removeWord,
    clear,
    // setTrainingInfo,
} from "../../slices/trainingSlice";
import { convertMSHoursCutted } from "../../util/ms";
// import TrainingMode, { trainingModes } from "../../models/TrainingMode";
import ChoiceMode from "../../components/TrainingModes/ChoiceMode";
import shuffleArray from "../../util/shuffle";

const TrainingPage = () => {
    const { dictionaryId, modeName } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [startTime, setStartTime] = useState(new Date());
    const [elapsedTime, setElapsedTime] = useState<number>();
    // const [trainingMode, setTrainingMode] = useState<TrainingMode | undefined>(
    //     trainingModes.find((val) => val.path === modeName)
    // );
    // const [words, setWords] = useState<Word[]>([]);
    // const [currentWordIdx, setCurrentWordIdx] = useState(0);
    const trainingSlice = useAppSelector((store) => store.trainingSlice);
    const dispatch = useAppDispatch();

    // const waitForClear = () =>
    //     new Promise<void>((resolve, reject) => {
    //         // do anything here
    //         dispatch(clear());
    //         resolve();
    //     });

    useEffect(() => {
        // dispatch(clear());
        // if (trainingMode)
        // if (!trainingSlice.info)
        axiosInstance
            .get(`api/v1/dictionaries/${dictionaryId}/words/`)
            .then((response) => {
                dispatch(addMultiWords(shuffleArray(response.data.results)));

                setIsLoading(false);
            })
            .catch((error) => {
                toast.error("E-300512: Unknown Error Occured!");
            });
    }, []);

    useEffect(() => {
        // console.log(
        //     "trainingSlice.currentWordIndex",
        //     trainingSlice.currentWordIndex
        // );
        if (trainingSlice.words.length === trainingSlice.currentWordIndex) {
            let endTime = new Date();
            setElapsedTime(endTime.getTime() - startTime.getTime());
        }
    }, [startTime, trainingSlice]);

    return (
        <div className="flex-grow">
            <Navbar
                beforeTitle={
                    <button
                        className="btn btn-circle btn-sm btn-primary text-white"
                        onClick={() => {
                            dispatch(clear());
                            navigate("/training");
                        }}
                    >
                        <IconArrowLeft></IconArrowLeft>
                    </button>
                }
            >
                Training
            </Navbar>
            <div className=" w-full flex flex-col items-center justify-center p-4">
                {isLoading ? (
                    <Spinner></Spinner>
                ) : (
                    <div className="max-w-xl w-full flex flex-col items-center justify-center">
                        <div className="bg-front w-full  min-h-16 rounded-box p-4 flex flex-col gap-4">
                            {trainingSlice.words.length ===
                            trainingSlice.currentWordIndex ? (
                                <div className="flex flex-col items-center">
                                    <IconDiscountCheckFilled className="w-20 h-20 text-success animate-bounce"></IconDiscountCheckFilled>
                                    <span className="text-2xl">Well Done!</span>

                                    <div className="stat">
                                        <div className="stat-figure text-primary">
                                            <IconClockEdit className="w-10 h-10"></IconClockEdit>
                                        </div>
                                        <div className="stat-title">
                                            Elapsed Time To Complete
                                        </div>
                                        <div className="stat-value line-clamp-2 w-full">
                                            {convertMSHoursCutted(
                                                elapsedTime ?? 0
                                            )}
                                        </div>
                                    </div>
                                    <div className="stat">
                                        <div className="stat-figure text-primary">
                                            <IconClick className="w-10 h-10"></IconClick>
                                        </div>
                                        <div className="stat-title">
                                            Total Answers
                                        </div>
                                        <div className="stat-value">
                                            {trainingSlice.rightAnswers +
                                                trainingSlice.wrongAnswers}
                                        </div>
                                    </div>

                                    <div className="stat">
                                        <div className="stat-figure text-success">
                                            <IconChecks className="w-10 h-10"></IconChecks>
                                        </div>
                                        <div className="stat-title">
                                            Right Answers
                                        </div>
                                        <div className="stat-value">
                                            {trainingSlice.rightAnswers}
                                        </div>
                                    </div>

                                    <div className="stat">
                                        <div className="stat-figure text-red-500">
                                            <IconAlertCircle className="w-10 h-10"></IconAlertCircle>
                                        </div>
                                        <div className="stat-title">
                                            False Answers
                                        </div>
                                        <div className="stat-value">
                                            {trainingSlice.wrongAnswers}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            dispatch(clear());
                                            navigate("/training");
                                        }}
                                        className="btn btn-primary w-full"
                                    >
                                        Go Back to Training
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-row gap-4 items-center mb-4 w-full">
                                        <progress
                                            className="progress progress-primary w-full h-6 "
                                            value={
                                                trainingSlice.currentWordIndex
                                            }
                                            max={trainingSlice.words.length}
                                        ></progress>
                                        <span>
                                            {trainingSlice.currentWordIndex}/
                                            {trainingSlice.words.length}
                                        </span>
                                    </div>
                                    <ChoiceMode
                                        word={
                                            trainingSlice.words[
                                                trainingSlice.currentWordIndex
                                            ]
                                        }
                                    ></ChoiceMode>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TrainingPage;

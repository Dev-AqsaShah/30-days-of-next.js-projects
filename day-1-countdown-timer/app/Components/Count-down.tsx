"use client";
import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Input, Button } from "@chakra-ui/react";


export default function Countdown() {
    const [duration, setDuration] = useState<number | string>("");
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    
    const handleSetDuration = (): void => {
        if (typeof duration === "number" && duration > 0) {
            setTimeLeft(duration);
            setIsActive(false);
            setIsPaused(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    // function to start the countdown timer
    const handleStart = (): void => {
        if (timeLeft > 0) {
            setIsActive(true);
            setIsPaused(false);
        }
    };

    // function to pause the countdown timer
    const handlePause = (): void => {
        if (isActive) {
            setIsPaused(true);
            setIsActive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    // function to reset the countdown timer
    const handleReset = (): void => {
        setIsActive(false);
        setIsPaused(false);
        setTimeLeft(typeof duration === "number" ? duration : 0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    // useEffect hook to manage the countdown interval
    useEffect(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, isPaused]);

    // function to format the time left into mm:ss format
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };

    // function to handle changes in the duration input field
    const handleDurationChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setDuration(Number(e.target.value) || "");
    };

    // JSX return statement rendering the countdown UI
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-blue-900">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                    COUNTDOWN TIMER
                </h1>
                <div className="flex items-center mb-6">
                    <Input
                        type="number"
                        id="duration"
                        placeholder="Enter duration in seconds"
                        value={duration}
                        onChange={handleDurationChange}
                        className="flex-1 mr-4 rounded-md border-blue-500 dark:border-blue-600 dark:bg-blue-700 dark:text-blue-800"
                    />
                    <Button
                        onClick={handleSetDuration}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200 bg-blue-400 flex-1 rounded-md"
                    >
                        Set Timer
                    </Button>
                </div>

                <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center ">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        onClick={handleStart}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200 bg-green-400 rounded-md flex-1"
                    >
                        {isPaused ? "Resume" : "Start"}
                    </Button>
                    <Button
                        onClick={handlePause}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200 bg-yellow-400 rounded-md flex-1"
                    >
                        Pause
                    </Button>
                    <Button
                        onClick={handleReset}
                        variant="outline"
                        className="text-gray-800 dark:text-gray-200 bg-red-400 rounded-md flex-1"
                    >
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
}

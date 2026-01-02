import { useState, useCallback, useRef, useEffect } from 'react';
import { TimerStateModel } from '../types/TimerStateModel.ts';
import { generateScramble } from '../utils/scrambleGenerator';

interface UseTimerReturn {
    timerState: TimerStateModel;
    scramble: string;
    inspectionTime: number;
    elapsedTime: number;
    finalTime: number | null;
    startInspection: () => void;
    startHoldSequence: () => void;
    startTimer: () => void;
    stopTimer: () => void;
    cancelHold: () => void;
    resetTimer: () => void;
    setTimerState: React.Dispatch<React.SetStateAction<TimerStateModel>>;
    holdStartTime: number | null;
    setHoldStartTime: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useTimer = (): UseTimerReturn => {
    const [timerState, setTimerState] = useState<TimerStateModel>(TimerStateModel.IDLE);
    const [scramble, setScramble] = useState<string>(generateScramble());
    const [inspectionTime, setInspectionTime] = useState<number>(15);
    const [elapsedTime, setElapsedTime] = useState<number>(0);
    const [holdStartTime, setHoldStartTime] = useState<number | null>(null);
    const [finalTime, setFinalTime] = useState<number | null>(null);

    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const inspectionRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const holdTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (inspectionRef.current) clearInterval(inspectionRef.current);
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        setTimerState(TimerStateModel.IDLE);
        setElapsedTime(0);
        setInspectionTime(15);
        setHoldStartTime(null);
        setFinalTime(null);
        setScramble(generateScramble());
    }, []);

    const startInspection = useCallback(() => {
        setTimerState(TimerStateModel.INSPECTION);
        setInspectionTime(15);

        inspectionRef.current = setInterval(() => {
            setInspectionTime((prev) => {
                if (prev <= 1) {
                    if (inspectionRef.current) clearInterval(inspectionRef.current);
                    setTimerState(TimerStateModel.READY_WAITING);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const startHoldSequence = useCallback(() => {
        setTimerState(TimerStateModel.READY_WAITING);
        setHoldStartTime(Date.now());

        holdTimerRef.current = setTimeout(() => {
            setTimerState(TimerStateModel.READY_SET);

            holdTimerRef.current = setTimeout(() => {
                setTimerState(TimerStateModel.READY_GO);
            }, 250);
        }, 250);
    }, []);

    const startTimer = useCallback(() => {
        if (inspectionRef.current) clearInterval(inspectionRef.current);
        setTimerState(TimerStateModel.RUNNING);
        startTimeRef.current = Date.now();

        timerRef.current = setInterval(() => {
            if (startTimeRef.current) {
                setElapsedTime(Date.now() - startTimeRef.current);
            }
        }, 10);
    }, []);

    const stopTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (startTimeRef.current) {
            const time = Date.now() - startTimeRef.current;
            setElapsedTime(time);
            setFinalTime(time);
        }
        setTimerState(TimerStateModel.STOPPED);
    }, []);

    const cancelHold = useCallback(() => {
        if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        setHoldStartTime(null);
    }, []);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (inspectionRef.current) clearInterval(inspectionRef.current);
            if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
        };
    }, []);

    return {
        timerState,
        scramble,
        inspectionTime,
        elapsedTime,
        finalTime,
        startInspection,
        startHoldSequence,
        startTimer,
        stopTimer,
        cancelHold,
        resetTimer,
        setTimerState,
        holdStartTime,
        setHoldStartTime
    };
};
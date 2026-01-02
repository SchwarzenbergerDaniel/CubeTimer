import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { mockSaveSolve } from '../data/mockData';
import { useTimer } from '../hooks/useTimer';
import ScrambleDisplay from './ScrambleDisplay';
import TimerDisplay from './TimerDisplay';
import StatusIndicator from './StatusIndicator';
import KeyboardInstructions from './KeyboardInstructions';
import SaveDialog from './SaveDialog';
import { TimerStateModel } from "../types/TimerStateModel.ts";
import type { SolveResultModel } from "../types/SolveResultModel.ts";
import type { UserProfileModel } from "../types/UserProfileModel.ts";

interface TimerProps {
    onSolveComplete?: (result: SolveResultModel) => void;
    userProfile: UserProfileModel;
}

export default function Timer({ onSolveComplete, userProfile }: TimerProps) {
    const {
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
    } = useTimer();

    const [showSaveDialog, setShowSaveDialog] = useState<boolean>(false);

    const handleSave = useCallback(async () => {
        if (finalTime) {
            const result = await mockSaveSolve({
                userId: userProfile.id,
                time: finalTime / 1000,
                scramble: scramble,
                timestamp: new Date().toISOString(),
                puzzleType: '3x3'
            });
            onSolveComplete?.(result);
        }
        setShowSaveDialog(false);
        resetTimer();
    }, [finalTime, userProfile.id, scramble, onSolveComplete, resetTimer]);

    const handleDiscard = useCallback(() => {
        setShowSaveDialog(false);
        resetTimer();
    }, [resetTimer]);

    useEffect(() => {
        if (timerState === TimerStateModel.STOPPED && finalTime !== null) {
            setShowSaveDialog(true);
        }
    }, [timerState, finalTime]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (showSaveDialog) return;

            if (e.code === 'Enter' && timerState === TimerStateModel.IDLE) {
                e.preventDefault();
                startInspection();
            }

            if (e.code === 'Space') {
                e.preventDefault();
                if (timerState === TimerStateModel.RUNNING) {
                    stopTimer();
                } else if ([TimerStateModel.IDLE, TimerStateModel.INSPECTION].includes(timerState)) {
                    if (!holdStartTime) {
                        startHoldSequence();
                    }
                }
            }

            if (e.code === 'Escape') {
                resetTimer();
                setShowSaveDialog(false);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (showSaveDialog) return;

            if (e.code === 'Space') {
                if (timerState === TimerStateModel.READY_GO) {
                    startTimer();
                } else if ([TimerStateModel.READY_WAITING, TimerStateModel.READY_SET].includes(timerState)) {
                    cancelHold();
                    setTimerState(inspectionTime > 0 ? TimerStateModel.INSPECTION : TimerStateModel.IDLE);
                }
                setHoldStartTime(null);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [timerState, holdStartTime, showSaveDialog, inspectionTime, startInspection, startHoldSequence, startTimer, stopTimer, cancelHold, resetTimer, setTimerState, setHoldStartTime]);

    const getStateBg = (): string => {
        switch (timerState) {
            case TimerStateModel.INSPECTION: return 'from-amber-950/30 to-zinc-950';
            case TimerStateModel.READY_WAITING: return 'from-red-950/40 to-zinc-950';
            case TimerStateModel.READY_SET: return 'from-orange-950/40 to-zinc-950';
            case TimerStateModel.READY_GO: return 'from-emerald-950/40 to-zinc-950';
            case TimerStateModel.RUNNING: return 'from-cyan-950/30 to-zinc-950';
            default: return 'from-zinc-900 to-zinc-950';
        }
    };

    return (
        <motion.div
            className={`relative bg-gradient-to-br ${getStateBg()} border-4 border-zinc-800 p-8 transition-all duration-300`}
            style={{ boxShadow: '8px 8px 0px 0px #18181b, 16px 16px 0px 0px #09090b' }}
            layout
        >
            <ScrambleDisplay scramble={scramble}/>
            <TimerDisplay
                timerState={timerState}
                inspectionTime={inspectionTime}
                elapsedTime={elapsedTime}
            />
            <StatusIndicator timerState={timerState}/>
            <KeyboardInstructions/>
            <SaveDialog
                isOpen={showSaveDialog}
                finalTime={finalTime}
                currentPb={userProfile.pb}
                onSave={handleSave}
                onDiscard={handleDiscard}
            />
        </motion.div>
    );
}
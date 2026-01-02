import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { mockSaveSolve } from '../data/mockData';
import { useTimer } from '../hooks/useTimer';
import ScrambleDisplay from './ScrambleDisplay';
import TimerDisplay from './TimerDisplay';
import StatusIndicator from './StatusIndicator';
import KeyboardInstructions from './KeyboardInstructions';
import SaveDialog from './SaveDialog';
import { TimerState } from "../types/TimerState";
import type { SolveResult } from "../types/SolveResult";
import type { UserProfile } from "../types/UserProfile";

interface TimerProps {
    onSolveComplete?: (result: SolveResult) => void;
    userProfile: UserProfile;
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
        if (timerState === TimerState.STOPPED && finalTime !== null) {
            setShowSaveDialog(true);
        }
    }, [timerState, finalTime]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (showSaveDialog) return;

            if (e.code === 'Enter' && timerState === TimerState.IDLE) {
                e.preventDefault();
                startInspection();
            }

            if (e.code === 'Space') {
                e.preventDefault();
                if (timerState === TimerState.RUNNING) {
                    stopTimer();
                } else if ([TimerState.IDLE, TimerState.INSPECTION].includes(timerState)) {
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
                if (timerState === TimerState.READY_GO) {
                    startTimer();
                } else if ([TimerState.READY_WAITING, TimerState.READY_SET].includes(timerState)) {
                    cancelHold();
                    setTimerState(inspectionTime > 0 ? TimerState.INSPECTION : TimerState.IDLE);
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
            case TimerState.INSPECTION: return 'from-amber-950/30 to-zinc-950';
            case TimerState.READY_WAITING: return 'from-red-950/40 to-zinc-950';
            case TimerState.READY_SET: return 'from-orange-950/40 to-zinc-950';
            case TimerState.READY_GO: return 'from-emerald-950/40 to-zinc-950';
            case TimerState.RUNNING: return 'from-cyan-950/30 to-zinc-950';
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
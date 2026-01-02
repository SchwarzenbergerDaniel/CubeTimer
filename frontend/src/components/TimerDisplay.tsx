import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerStateModel } from '../types/TimerStateModel.ts';
import { formatTime } from '../utils/timeFormatter';

interface TimerDisplayProps {
    timerState: TimerStateModel;
    inspectionTime: number;
    elapsedTime: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({
                                                       timerState,
                                                       inspectionTime,
                                                       elapsedTime
                                                   }) => {
    const getStateColor = (): string => {
        switch (timerState) {
            case TimerStateModel.INSPECTION:
                return 'text-amber-400';
            case TimerStateModel.READY_WAITING:
                return 'text-red-500';
            case TimerStateModel.READY_SET:
                return 'text-orange-400';
            case TimerStateModel.READY_GO:
                return 'text-emerald-400';
            case TimerStateModel.RUNNING:
                return 'text-cyan-300';
            case TimerStateModel.STOPPED:
                return 'text-lime-400';
            default:
                return 'text-zinc-100';
        }
    };

    return (
        <div className="text-center py-12">
            <AnimatePresence mode="wait">
                {timerState === TimerStateModel.INSPECTION ? (
                    <motion.div
                        key="inspection"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className="space-y-2"
                    >
            <span className="text-sm font-mono uppercase tracking-[0.3em] text-amber-500">
              Inspection
            </span>
                        <div
                            className={`font-mono text-9xl font-black tracking-tighter ${getStateColor()}`}
                            style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                        >
                            {inspectionTime}
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="timer"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className={`font-mono text-8xl md:text-9xl font-black tracking-tighter ${getStateColor()}`}
                        style={{ textShadow: '4px 4px 0px rgba(0,0,0,0.5)' }}
                    >
                        {formatTime(elapsedTime)}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default TimerDisplay;
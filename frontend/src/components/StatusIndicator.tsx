import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimerStateModel } from '../types/TimerStateModel.ts';

interface StatusIndicatorProps {
    timerState: TimerStateModel;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ timerState }) => {
    const getStatusText = (): string => {
        switch (timerState) {
            case TimerStateModel.IDLE:
                return 'Ready';
            case TimerStateModel.INSPECTION:
                return 'Inspect';
            case TimerStateModel.READY_WAITING:
                return 'Hold...';
            case TimerStateModel.READY_SET:
                return 'Almost...';
            case TimerStateModel.READY_GO:
                return 'GO!';
            case TimerStateModel.RUNNING:
                return 'Solving';
            case TimerStateModel.STOPPED:
                return 'Done!';
            default:
                return '';
        }
    };

    const getIndicatorColor = (): string => {
        switch (timerState) {
            case TimerStateModel.IDLE:
                return 'bg-zinc-500';
            case TimerStateModel.INSPECTION:
                return 'bg-amber-400';
            case TimerStateModel.READY_WAITING:
                return 'bg-red-500';
            case TimerStateModel.READY_SET:
                return 'bg-orange-400';
            case TimerStateModel.READY_GO:
                return 'bg-emerald-400';
            case TimerStateModel.RUNNING:
                return 'bg-cyan-400';
            case TimerStateModel.STOPPED:
                return 'bg-lime-400';
            default:
                return 'bg-zinc-500';
        }
    };

    return (
        <motion.div className="flex items-center justify-center gap-4 mb-8" layout>
            <AnimatePresence mode="wait">
                <motion.div
                    key={timerState}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-3 px-6 py-3 bg-zinc-900 border-2 border-zinc-700"
                    style={{ boxShadow: '3px 3px 0px 0px #3f3f46' }}
                >
                    <motion.div
                        className={`w-3 h-3 rounded-full ${getIndicatorColor()}`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{
                            repeat: timerState === TimerStateModel.RUNNING ? Infinity : 0,
                            duration: 0.5
                        }}
                    />
                    <span className="font-mono text-sm uppercase tracking-widest text-zinc-400">
            {getStatusText()}
          </span>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

export default StatusIndicator;
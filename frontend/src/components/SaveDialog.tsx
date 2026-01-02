import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Check, X } from 'lucide-react';
import { formatTime } from '../utils/timeFormatter';

interface SaveDialogProps {
    isOpen: boolean;
    finalTime: number | null;
    currentPb: number;
    onSave: () => void;
    onDiscard: () => void;
}

const SaveDialog: React.FC<SaveDialogProps> = ({
                                                   isOpen,
                                                   finalTime,
                                                   currentPb,
                                                   onSave,
                                                   onDiscard
                                               }) => {
    const isNewPb = finalTime !== null && finalTime / 1000 < currentPb;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-zinc-950/90 backdrop-blur-sm flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-zinc-900 border-4 border-lime-500 p-8 max-w-sm w-full mx-4"
                        style={{ boxShadow: '8px 8px 0px 0px #84cc16' }}
                    >
                        <h3 className="font-mono text-2xl font-bold text-zinc-100 mb-2">
                            Save Solve?
                        </h3>
                        <p className="font-mono text-4xl font-black text-lime-400 mb-6">
                            {formatTime(finalTime || 0)}
                        </p>

                        {isNewPb && (
                            <motion.div
                                className="mb-6 p-3 bg-lime-500/20 border-2 border-lime-500"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', bounce: 0.5 }}
                            >
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-5 h-5 text-lime-400" />
                                    <span className="font-mono text-sm font-bold text-lime-400 uppercase tracking-wider">
                    New Personal Best!
                  </span>
                                </div>
                            </motion.div>
                        )}

                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onSave}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-lime-500 text-zinc-900 font-mono font-bold uppercase tracking-wider border-2 border-lime-400 hover:bg-lime-400 transition-colors"
                                style={{ boxShadow: '4px 4px 0px 0px #365314' }}
                            >
                                <Check className="w-5 h-5" />
                                Save
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onDiscard}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-zinc-800 text-zinc-300 font-mono font-bold uppercase tracking-wider border-2 border-zinc-700 hover:bg-zinc-700 transition-colors"
                                style={{ boxShadow: '4px 4px 0px 0px #27272a' }}
                            >
                                <X className="w-5 h-5" />
                                Discard
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SaveDialog;
import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';

interface ScrambleDisplayProps {
    scramble: string;
}

const ScrambleDisplay: React.FC<ScrambleDisplayProps> = ({ scramble }) => {
    return (
        <motion.div
            className="mb-8 p-4 bg-zinc-900 border-2 border-zinc-700"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            key={scramble}
            style={{
                boxShadow: '4px 4px 0px 0px #3f3f46'
            }}
        >
            <div className="flex items-center gap-2 mb-2">
                <RotateCcw className="w-4 h-4 text-lime-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          Scramble
        </span>
            </div>
            <p className="font-mono text-lg text-zinc-200 tracking-wide leading-relaxed">
                {scramble}
            </p>
        </motion.div>
    );
};

export default ScrambleDisplay;
import React from 'react';
import { motion } from 'framer-motion';
import { type LucideIcon } from 'lucide-react';

interface StatBlockProps {
    icon: LucideIcon;
    label: string;
    value: string;
    highlight?: boolean;
}

const StatBlock: React.FC<StatBlockProps> = ({
                                                 icon: Icon,
                                                 label,
                                                 value,
                                                 highlight = false
                                             }) => {
    return (
        <motion.div
            className={`p-4 bg-zinc-900 border-2 ${highlight ? 'border-lime-500' : 'border-zinc-700'}`}
            style={{
                boxShadow: highlight
                    ? '4px 4px 0px 0px #84cc16'
                    : '4px 4px 0px 0px #3f3f46'
            }}
            whileHover={{ y: -2 }}
        >
            <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${highlight ? 'text-lime-400' : 'text-zinc-500'}`} />
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
          {label}
        </span>
            </div>
            <span
                className={`font-mono text-2xl font-black ${highlight ? 'text-lime-400' : 'text-zinc-200'}`}
            >
        {value}
      </span>
        </motion.div>
    );
};

export default StatBlock;
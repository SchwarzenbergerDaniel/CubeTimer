import React from 'react';

interface KeyInstructionProps {
    keyLabel: string;
    description: string;
}

const KeyInstruction: React.FC<KeyInstructionProps> = ({ keyLabel, description }) => (
    <div className="p-3 bg-zinc-900/50 border border-zinc-800">
        <kbd className="px-2 py-1 bg-zinc-800 text-lime-400 font-mono text-xs border border-zinc-700">
            {keyLabel}
        </kbd>
        <p className="text-xs text-zinc-500 mt-2">{description}</p>
    </div>
);

const KeyboardInstructions: React.FC = () => {
    return (
        <div className="grid grid-cols-3 gap-4 text-center">
            <KeyInstruction keyLabel="ENTER" description="Inspection" />
            <KeyInstruction keyLabel="SPACE" description="Hold → Start/Stop" />
            <KeyInstruction keyLabel="ESC" description="Reset" />
        </div>
    );
};

export default KeyboardInstructions;
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="border-t-2 border-zinc-800 mt-16">
            <div className="max-w-6xl mx-auto px-6 py-6">
                <div className="flex items-center justify-between">
                    <p className="font-mono text-xs text-zinc-600">
                        © 2026 CubeTrack. Built for speedcubers.
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-zinc-600">v0.1.0</span>
                        <div className="w-2 h-2 bg-lime-500 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
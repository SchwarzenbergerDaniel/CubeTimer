import { motion } from 'framer-motion';
import { Clock, User } from 'lucide-react';
import type { UserProfile } from '../types/UserProfile';
import type { UserSearchResult } from '../types/UserSearchResult';
import UserSearch from './UserSearch';

interface HeaderProps {
    userProfile: UserProfile;
    onSelectUser: (user: UserSearchResult) => void;
}

export default function Header({ userProfile, onSelectUser }: HeaderProps) {
    return (
        <header className="relative border-b-4 border-zinc-800 bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-40">
            <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div
                            className="w-10 h-10 bg-lime-500 flex items-center justify-center border-2 border-lime-400"
                            style={{ boxShadow: '3px 3px 0px 0px #365314' }}
                        >
                            <Clock className="w-6 h-6 text-zinc-900" />
                        </div>
                        <div>
                            <h1 className="font-mono text-xl font-black tracking-tight">
                                CUBE<span className="text-lime-400">TRACK</span>
                            </h1>
                            <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">
                                Speedcubing Platform
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="hidden md:block w-64">
                            <UserSearch onSelectUser={onSelectUser} />
                        </div>
                        <div
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border-2 border-zinc-700"
                            style={{ boxShadow: '3px 3px 0px 0px #27272a' }}
                        >
                            <div className="w-8 h-8 bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center">
                                <User className="w-4 h-4 text-zinc-900" />
                            </div>
                            <span className="font-mono text-sm font-bold">
                                {userProfile.username}
                            </span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </header>
    );
}
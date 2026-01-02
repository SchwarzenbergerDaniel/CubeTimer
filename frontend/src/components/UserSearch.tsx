import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, X } from 'lucide-react';
import { type UserSearchResultModel } from '../types/UserSearchResultModel.ts';
import { mockSearchUsers } from '../data/mockData';
import UserProfile from "./UserProfile.tsx";

interface UserSearchProps {
    onSelectUser?: (user: UserSearchResultModel) => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSelectUser }) => {
    const [query, setQuery] = useState<string>('');
    const [results, setResults] = useState<UserSearchResultModel[]>([]);
    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [showResults, setShowResults] = useState<boolean>(false);

    // TODO: GET /api/users/search?q={query}
    const searchUsers = useCallback(async (searchQuery: string) => {
        if (searchQuery.length < 2) {
            setResults([]);
            return;
        }

        setIsSearching(true);
        const searchResults = await mockSearchUsers(searchQuery);
        setResults(searchResults);
        setIsSearching(false);
    }, []);

    useEffect(() => {
        const debounce = setTimeout(() => {
            searchUsers(query);
        }, 200);

        return () => clearTimeout(debounce);
    }, [query, searchUsers]);

    const handleClear = () => {
        setQuery('');
        setResults([]);
    };

    const handleSelectUser = (user: UserSearchResultModel) => {
        onSelectUser?.(user);
        setShowResults(false);
    };

    return (
        <div className="relative">
            <motion.div
                className="flex items-center gap-3 bg-zinc-900 border-2 border-zinc-700 p-4"
                style={{ boxShadow: '4px 4px 0px 0px #3f3f46' }}
            >
                <Search className="w-5 h-5 text-zinc-500" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setShowResults(true);
                    }}
                    onFocus={() => setShowResults(true)}
                    placeholder="Search cubers..."
                    className="flex-1 bg-transparent font-mono text-zinc-100 placeholder:text-zinc-600 outline-none"
                />
                {isSearching && (
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    >
                        <Zap className="w-4 h-4 text-lime-400" />
                    </motion.div>
                )}
                {query && (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClear}
                        className="text-zinc-500 hover:text-zinc-300"
                    >
                        <X className="w-4 h-4" />
                    </motion.button>
                )}
            </motion.div>

            <AnimatePresence>
                {showResults && (query.length >= 2 || results.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-zinc-700 z-50 max-h-80 overflow-y-auto"
                        style={{ boxShadow: '4px 4px 0px 0px #3f3f46' }}
                    >
                        {results.length === 0 && query.length >= 2 && !isSearching ? (
                            <div className="p-4 text-center">
                                <p className="font-mono text-sm text-zinc-500">No cubers found</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-zinc-800">
                                {results.map((user, index) => (
                                    <motion.div
                                        key={user.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleSelectUser(user)}
                                    >
                                        <UserProfile profile={user} isCompact={true} />
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserSearch;
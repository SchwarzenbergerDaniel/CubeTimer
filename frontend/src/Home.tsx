import {useEffect, useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Zap, User, Search, X} from 'lucide-react';
import {MOCK_USER_PROFILE} from './data/mockData';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
import UserProfileComponent from "./components/UserProfile";
import type {UserSearchResultModel} from "./types/UserSearchResultModel.ts";
import type {SolveResultModel} from "./types/SolveResultModel.ts";
import type {UserProfileModel} from "./types/UserProfileModel.ts";
import UserSearch from "./components/UserSearch";
import api from "./api.ts";

export default function Home() {
    const [userProfile, setUserProfile] = useState<UserProfileModel>(MOCK_USER_PROFILE);
    const [selectedUser, setSelectedUser] = useState<UserSearchResultModel | null>(null);

    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const response = await api.post('/auth/refresh');
                setAccessToken(response.data.accessToken);
                const userRes = await api.get('/users/me');
                setUserProfile(userRes.data);
            } catch (err) { // Expects an error, if there is no valid token
                if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
                    window.location.href = '/login';
                }            } finally {
                setIsLoading(false);
            }
        };
        initAuth();
    }, []);

    if (isLoading) return <div className="min-h-screen bg-zinc-950"/>; // TODO: Add the logo as a spinning .gif as a loading-indicator


    const handleSolveComplete = (result: SolveResultModel): void => {
        setUserProfile((prev) => ({
            ...prev,
            pb: result.pb,
            ao5: result.ao5,
            ao12: result.ao12,
            totalSolves: result.totalSolves
        }));
    };

    const handleSelectUser = (user: UserSearchResultModel): void => {
        setSelectedUser(user);
    };

    const handleClearSelectedUser = (): void => {
        setSelectedUser(null);
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(90deg, #84cc16 1px, transparent 1px),
                        linear-gradient(180deg, #84cc16 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                }}
            />

            <Header userProfile={userProfile} onSelectUser={handleSelectUser}/>

            <main className="relative max-w-6xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    <motion.div
                        className="lg:col-span-2"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.1}}
                    >
                        <div className="mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5 text-lime-400"/>
                            <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-zinc-400">
                                Timer
                            </h2>
                        </div>
                        <Timer onSolveComplete={handleSolveComplete} userProfile={userProfile}/>
                    </motion.div>

                    <motion.div
                        className="space-y-8"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.2}}
                    >
                        <div className="md:hidden">
                            <UserSearch onSelectUser={handleSelectUser}/>
                        </div>

                        <div>
                            <div className="mb-4 flex items-center gap-2">
                                <User className="w-5 h-5 text-lime-400"/>
                                <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-zinc-400">
                                    Your Stats
                                </h2>
                            </div>
                            <UserProfileComponent profile={userProfile}/>
                        </div>

                        <AnimatePresence>
                            {selectedUser && (
                                <motion.div
                                    initial={{opacity: 0, scale: 0.95}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, scale: 0.95}}
                                >
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Search className="w-5 h-5 text-cyan-400"/>
                                            <h2 className="font-mono text-lg font-bold uppercase tracking-wider text-zinc-400">
                                                Viewing
                                            </h2>
                                        </div>
                                        <motion.button
                                            whileHover={{scale: 1.1}}
                                            whileTap={{scale: 0.9}}
                                            onClick={handleClearSelectedUser}
                                            className="text-zinc-500 hover:text-zinc-300"
                                        >
                                            <X className="w-5 h-5"/>
                                        </motion.button>
                                    </div>
                                    <UserProfileComponent profile={selectedUser}/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </main>

            <Footer/>
        </div>
    );
}
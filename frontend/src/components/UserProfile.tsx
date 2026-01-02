import React from 'react';
import {motion} from 'framer-motion';
import {User, Trophy, Target, TrendingUp, Hash, ChevronRight} from 'lucide-react';
import {type UserProfileModel} from '../types/UserProfileModel.ts';
import { type UserSearchResultModel} from '../types/UserSearchResultModel.ts';
import StatBlock from './StatBlock';

interface UserProfileProps {
    profile: UserProfileModel | UserSearchResultModel;
    isCompact?: boolean;
}

const isFullProfile = (
    profile: UserProfileModel | UserSearchResultModel
): profile is UserProfileModel => {
    return 'ao5' in profile;
};

const UserProfile: React.FC<UserProfileProps> = ({profile, isCompact = false}) => {
    if (isCompact) {
        return (
            <motion.div
                className="flex items-center gap-4 p-4 bg-zinc-900/80 border-2 border-zinc-700 hover:border-zinc-600 transition-colors cursor-pointer"
                style={{boxShadow: '4px 4px 0px 0px #27272a'}}
                whileHover={{x: 4}}
            >
                <div
                    className="w-12 h-12 bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center border-2 border-zinc-700">
                    <User className="w-6 h-6 text-zinc-900"/>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-mono font-bold text-zinc-100 truncate">
                        {profile.username}
                    </p>
                    <p className="text-xs font-mono text-zinc-500">PB: {profile.pb}s</p>
                </div>
                <div className="text-right">
                    <p className="text-xs font-mono text-zinc-500">
                        {profile.totalSolves} solves
                    </p>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-600"/>
            </motion.div>
        );
    }

    const fullProfile = isFullProfile(profile) ? profile : null;

    return (
        <motion.div
            className="bg-zinc-950 border-4 border-zinc-800 p-6"
            style={{boxShadow: '8px 8px 0px 0px #18181b'}}
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b-2 border-zinc-800">
                <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-lime-500 to-emerald-600 flex items-center justify-center border-2 border-zinc-700"
                    whileHover={{rotate: 5}}
                >
                    <User className="w-8 h-8 text-zinc-900"/>
                </motion.div>
                <div>
                    <h2 className="font-mono text-2xl font-black text-zinc-100">
                        {profile.username}
                    </h2>
                    {fullProfile && (
                        <p className="text-sm font-mono text-zinc-500">
                            Member since {fullProfile.createdAt}
                        </p>
                    )}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
                <StatBlock
                    icon={Trophy}
                    label="Personal Best"
                    value={`${profile.pb}s`}
                    highlight={true}
                />
                {fullProfile ? (
                    <>
                        <StatBlock icon={Target} label="Ao5" value={`${fullProfile.ao5}s`}/>
                        <StatBlock icon={TrendingUp} label="Ao12" value={`${fullProfile.ao12}s`}/>
                    </>
                ) : (
                    <StatBlock icon={Target} label="Ao5" value="—"/>
                )}
                <StatBlock
                    icon={Hash}
                    label="Total Solves"
                    value={profile.totalSolves.toLocaleString()}
                />
            </div>
        </motion.div>
    );
};

export default UserProfile;
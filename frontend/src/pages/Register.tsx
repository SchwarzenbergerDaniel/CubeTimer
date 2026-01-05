import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserPlus, User, Lock, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Client-side pre-check for password matching
        if (formData.password !== formData.confirmPassword) {
            setErrors({ confirmPassword: "Passwords do not match" });
            return;
        }

        setIsSubmitting(true);

        try {
            await api.post('/auth/register', {
                username: formData.username,
                password: formData.password
            });

            setIsSuccess(true);

            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            if (err.response && err.response.data) {
                setErrors(err.response.data);
            } else {
                setErrors({ general: "Connection failed. Is the Ubuntu server running?" });
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6 selection:bg-lime-500 selection:text-zinc-900">
            {/* Background Grid Pattern */}
            <div className="fixed inset-0 opacity-[0.03] pointer-events-none"
                 style={{
                     backgroundImage: `linear-gradient(90deg, #84cc16 1px, transparent 1px), linear-gradient(180deg, #84cc16 1px, transparent 1px)`,
                     backgroundSize: '40px 40px'
                 }}
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md relative"
            >
                <div className="bg-zinc-900 border-4 border-zinc-800 p-8 relative z-10"
                     style={{ boxShadow: '12px 12px 0px 0px #18181b' }}>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-10 h-10 bg-lime-500 flex items-center justify-center border-2 border-lime-400">
                            <UserPlus className="w-6 h-6 text-zinc-900" />
                        </div>
                        <div>
                            <h1 className="font-mono text-2xl font-black uppercase tracking-tighter italic">Register_User</h1>
                            <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">New Deployment</p>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="py-12 text-center space-y-4"
                            >
                                <CheckCircle2 className="w-16 h-16 text-lime-400 mx-auto animate-bounce" />
                                <h2 className="font-mono text-xl font-bold text-zinc-100">Profile Created</h2>
                                <p className="font-mono text-sm text-zinc-500">Redirecting to login terminal...</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* General Error Alert */}
                                {errors.general && (
                                    <div className="flex items-center gap-2 text-red-500 font-mono text-xs bg-red-500/10 p-3 border border-red-500/50">
                                        <AlertCircle className="w-4 h-4 shrink-0" /> {errors.general}
                                    </div>
                                )}

                                {/* Username Field */}
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-zinc-500 mb-1.5 ml-1">Cuber_ID</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-3.5 w-4 h-4 text-zinc-600" />
                                        <input
                                            type="text"
                                            className={`w-full bg-zinc-950 border-2 ${errors.username || errors.error ? 'border-red-500/50' : 'border-zinc-700'} p-3 pl-10 font-mono text-sm focus:border-lime-500 outline-none transition-all`}
                                            placeholder="Username"
                                            value={formData.username}
                                            onChange={e => setFormData({...formData, username: e.target.value})}
                                            required
                                        />
                                    </div>
                                    {(errors.username || errors.error) && (
                                        <p className="text-red-500 font-mono text-[10px] mt-1.5 uppercase ml-1">
                                            {errors.username || errors.error}
                                        </p>
                                    )}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-zinc-500 mb-1.5 ml-1">Access_Key</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-600" />
                                        <input
                                            type="password"
                                            className={`w-full bg-zinc-950 border-2 ${errors.password ? 'border-red-500/50' : 'border-zinc-700'} p-3 pl-10 font-mono text-sm focus:border-lime-500 outline-none transition-all`}
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={e => setFormData({...formData, password: e.target.value})}
                                            required
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="text-red-500 font-mono text-[10px] mt-1.5 uppercase ml-1 leading-relaxed">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className="block font-mono text-[10px] uppercase text-zinc-500 mb-1.5 ml-1">Confirm_Key</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3.5 w-4 h-4 text-zinc-600" />
                                        <input
                                            type="password"
                                            className={`w-full bg-zinc-950 border-2 ${errors.confirmPassword ? 'border-red-500/50' : 'border-zinc-700'} p-3 pl-10 font-mono text-sm focus:border-lime-500 outline-none transition-all`}
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
                                            required
                                        />
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-red-500 font-mono text-[10px] mt-1.5 uppercase ml-1">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="group w-full bg-lime-500 text-zinc-900 font-mono font-bold py-4 mt-4 uppercase tracking-widest hover:bg-lime-400 transition-all border-b-4 border-lime-700 active:border-b-0 active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? "Processing..." : (
                                        <>
                                            Initialize Account <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </AnimatePresence>

                    <div className="mt-8 pt-6 border-t border-zinc-800 flex justify-between items-center">
                        <p className="font-mono text-[10px] text-zinc-600 uppercase">
                            Status: <span className="text-lime-500/50">Awaiting_Input</span>
                        </p>
                        <Link to="/login" className="font-mono text-[10px] text-zinc-500 uppercase hover:text-lime-400 transition-colors flex items-center gap-1">
                            Back to login <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, User, Lock, AlertCircle } from 'lucide-react';
import api from '../api';

export default function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', formData);
            // Access Token in memory
            sessionStorage.setItem('accessToken', res.data.accessToken);
            window.location.href = '/';
        } catch (err: any) {
            setError('Invalid credentials. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-zinc-900 border-4 border-zinc-800 p-8"
                style={{ boxShadow: '12px 12px 0px 0px #18181b' }}
            >
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 bg-lime-500 flex items-center justify-center border-2 border-lime-400">
                        <LogIn className="w-6 h-6 text-zinc-900" />
                    </div>
                    <h1 className="font-mono text-2xl font-black uppercase italic">Login_</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-mono text-xs uppercase text-zinc-500 mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-zinc-600" />
                            <input
                                type="text"
                                className="w-full bg-zinc-950 border-2 border-zinc-700 p-3 pl-10 font-mono focus:border-lime-500 outline-none transition-colors"
                                onChange={e => setFormData({...formData, username: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block font-mono text-xs uppercase text-zinc-500 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 w-5 h-5 text-zinc-600" />
                            <input
                                type="password"
                                className="w-full bg-zinc-950 border-2 border-zinc-700 p-3 pl-10 font-mono focus:border-lime-500 outline-none transition-colors"
                                onChange={e => setFormData({...formData, password: e.target.value})}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="flex items-center gap-2 text-red-500 font-mono text-xs bg-red-500/10 p-3 border border-red-500/50">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-lime-500 text-zinc-900 font-mono font-bold py-4 uppercase tracking-widest hover:bg-lime-400 transition-colors border-b-4 border-lime-700 active:border-b-0 active:translate-y-1"
                    >
                        Access System
                    </button>
                </form>

                <p className="mt-8 text-center font-mono text-xs text-zinc-600">
                    No account? <a href="/register" className="text-lime-500 hover:underline">Register_New_User</a>
                </p>
            </motion.div>
        </div>
    );
}
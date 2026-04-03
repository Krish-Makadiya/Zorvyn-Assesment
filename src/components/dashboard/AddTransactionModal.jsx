import React, { useState } from 'react';

const AddTransactionModal = ({ onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        to: '',
        amount: '',
        currency: 'INR',
        status: 'Completed',
        method: 'Bank Transfer'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTxn = {
            id: `TXN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
            ...formData,
            amount: parseFloat(formData.amount),
            avatar: `https://i.pravatar.cc/150?u=${Math.floor(Math.random() * 50)}`,
            period: `${new Date().toLocaleString('default', { month: 'short' })} ${new Date().getDate()} - ${new Date().getDate()}`
        };
        onSubmit(newTxn);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white dark:bg-[#1a1b1e] w-full max-w-md rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-slate-100 dark:border-zinc-800 flex justify-between items-center">
                    <h2 className="text-xl font-bold dark:text-white">New Transaction</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 underline-offset-4 uppercase tracking-wider">Recipient Name</label>
                        <input required value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white transition-all" placeholder="e.g. John Doe" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Amount (₹)</label>
                        <input required type="number" step="0.01" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white transition-all" placeholder="0.00" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm cursor-pointer focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white">
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Failed</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Method</label>
                            <select value={formData.method} onChange={e => setFormData({ ...formData, method: e.target.value })} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm cursor-pointer focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white">
                                <option>Bank Transfer</option>
                                <option>Wire Transfer</option>
                                <option>Credit Card</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 active:scale-95 transition-all">Submit Transaction</button>
                </form>
            </div>
        </div>
    );
};

export default AddTransactionModal;

import React, { useState, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { Check, Calendar, Sun, ChevronDown, Download, Search, ArrowUpDown, ArrowUp, ArrowDown, Trash2 } from 'lucide-react';

const History = () => {
    const { paymentHistory, deleteTransaction, addTransaction, currentRole } = useStore();
    const [visibleCount, setVisibleCount] = useState(10);
    const [selectedItems, setSelectedItems] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [filterStatus, setFilterStatus] = useState("All");
    const [showAddModal, setShowAddModal] = useState(false);

    // Helper to parse date for sorting
    const parseDate = (period) => {
        const dateStr = period.split(' - ')[0];
        return new Date(`${dateStr}, 2024`);
    };

    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const filteredAndSortedHistory = useMemo(() => {
        let result = [...paymentHistory];

        if (searchTerm) {
            const lowSearch = searchTerm.toLowerCase();
            result = result.filter(item =>
                item.id.toLowerCase().includes(lowSearch) ||
                item.to.toLowerCase().includes(lowSearch) ||
                item.method.toLowerCase().includes(lowSearch)
            );
        }

        if (filterStatus !== "All") {
            result = result.filter(item => item.status === filterStatus);
        }

        if (sortConfig.key) {
            result.sort((a, b) => {
                let aValue = a[sortConfig.key];
                let bValue = b[sortConfig.key];

                if (sortConfig.key === 'date') {
                    aValue = parseDate(a.period);
                    bValue = parseDate(b.period);
                }

                if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
                return 0;
            });
        }

        return result;
    }, [searchTerm, sortConfig, filterStatus, paymentHistory]);

    const displayedHistory = filteredAndSortedHistory.slice(0, visibleCount);

    const handleReadMore = () => {
        setVisibleCount(prev => Math.min(prev + 10, filteredAndSortedHistory.length));
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === displayedHistory.length && displayedHistory.length > 0) {
            setSelectedItems([]);
        } else {
            setSelectedItems(displayedHistory.map(p => p.id));
        }
    };

    const toggleSelect = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    const SortIcon = ({ columnKey }) => {
        if (sortConfig.key !== columnKey) return <ArrowUpDown size={14} className="ml-1 opacity-40 group-hover:opacity-100 transition-opacity" />;
        return sortConfig.direction === 'asc' ? <ArrowUp size={14} className="ml-1 text-emerald-500" /> : <ArrowDown size={14} className="ml-1 text-emerald-500" />;
    };

    return (
        <div className="history-container w-full bg-white dark:bg-[#131216] rounded-xl border border-slate-200 dark:border-[#262626] overflow-hidden flex flex-col font-sans shadow-sm dark:shadow-none transition-colors duration-300">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-slate-100 dark:border-[#262626] flex flex-wrap items-center justify-between gap-4 transition-colors">
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#737373]" size={16} />
                        <input
                            type="text"
                            placeholder="Search ID, Name or Method..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-50 dark:bg-[#1a1a1e] border border-slate-200 dark:border-[#262626] text-slate-600 dark:text-[#a3a3a3] text-[13px] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none w-[280px] placeholder:text-slate-400 dark:placeholder:text-[#525252] shadow-inner font-medium transition-colors focus:ring-1 focus:ring-emerald-500/30"
                        />
                    </div>

                    {/* Status Filter */}
                    <div className="relative group">
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="appearance-none flex items-center gap-2 bg-slate-50 dark:bg-[#1a1a1e] text-slate-600 dark:text-[#a3a3a3] border border-slate-200 dark:border-[#262626] px-4 pr-10 py-2.5 rounded-lg text-[13px] hover:bg-slate-100 dark:hover:bg-[#1f1f23] transition-colors font-medium cursor-pointer focus:outline-none"
                        >
                            <option value="All">All Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-60" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {selectedItems.length > 0 && currentRole === 'Admin' && (
                        <button
                            onClick={() => {
                                selectedItems.forEach(id => deleteTransaction(id));
                                setSelectedItems([]);
                            }}
                            className="flex items-center gap-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 px-3 py-2 rounded-lg text-[13px] hover:bg-rose-500/20 transition-all font-semibold"
                        >
                            <Trash2 size={15} />
                            Delete ({selectedItems.length})
                        </button>
                    )}

                    {currentRole === 'Admin' && (
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-lg text-[13px] hover:bg-emerald-600 transition-all font-semibold shadow-lg shadow-emerald-500/20 active:scale-95"
                        >
                            Add New
                        </button>
                    )}

                    <span className="text-[12px] text-slate-400 dark:text-[#525252] font-medium mr-2">
                        Showing {displayedHistory.length} of {filteredAndSortedHistory.length}
                    </span>
                    <button 
                        onClick={() => {
                            const headers = ["ID", "Amount", "Recipient", "Period", "Method", "Status"];
                            const rows = displayedHistory.map(p => [
                                p.id, p.amount, p.to, p.period, p.method, p.status
                            ]);
                            
                            let csvContent = "data:text/csv;charset=utf-8," 
                                + headers.join(",") + "\n"
                                + rows.map(e => e.join(",")).join("\n");

                            const encodedUri = encodeURI(csvContent);
                            const link = document.createElement("a");
                            link.setAttribute("href", encodedUri);
                            link.setAttribute("download", `FinVision_Transactions_${new Date().toISOString().split('T')[0]}.csv`);
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }}
                        className="p-2 text-slate-400 dark:text-[#a3a3a3] opacity-80 hover:opacity-100 transition-colors bg-transparent hover:bg-slate-50 dark:hover:bg-[#1f1f23] rounded-lg group"
                        title="Export current view to CSV"
                    >
                        <Download size={18} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto text-slate-700 dark:text-[#d4d4d4]">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-transparent">
                            <th className="py-4 pl-5 font-normal text-slate-500 dark:text-[#a3a3a3] text-[13.5px] w-12 border-r border-slate-100 dark:border-[#262626] transition-colors">
                                <div
                                    className={`w-[18px] h-[18px] rounded-[4px] border ${selectedItems.length > 0 && selectedItems.length === displayedHistory.length ? 'border-light-primary bg-light-primary/20 text-light-primary-text dark:text-light-primary dark:border-light-primary flex items-center justify-center' : 'border-slate-300 dark:border-[#404040] bg-white dark:bg-transparent hover:bg-slate-100 dark:hover:bg-[#1f1f23]'} cursor-pointer transition-colors`}
                                    onClick={toggleSelectAll}
                                >
                                    {selectedItems.length > 0 && selectedItems.length === displayedHistory.length && (
                                        <Check size={12} strokeWidth={3} />
                                    )}
                                </div>
                            </th>
                            <th
                                className="py-4 px-6 font-medium text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors cursor-pointer hover:bg-slate-100/50 dark:hover:bg-[#1f1f23]/50 group"
                                onClick={() => handleSort('id')}
                            >
                                <div className="flex items-center justify-between">
                                    Payment ID
                                    <SortIcon columnKey="id" />
                                </div>
                            </th>
                            <th
                                className="py-4 px-6 font-medium text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors cursor-pointer hover:bg-slate-100/50 dark:hover:bg-[#1f1f23]/50 group"
                                onClick={() => handleSort('amount')}
                            >
                                <div className="flex items-center justify-between">
                                    Total Amount
                                    <SortIcon columnKey="amount" />
                                </div>
                            </th>
                            <th
                                className="py-4 px-6 font-medium text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors cursor-pointer hover:bg-slate-100/50 dark:hover:bg-[#1f1f23]/50 group"
                                onClick={() => handleSort('to')}
                            >
                                <div className="flex items-center justify-between">
                                    To
                                    <SortIcon columnKey="to" />
                                </div>
                            </th>
                            <th className="py-4 px-6 font-medium text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                Period
                            </th>
                            <th className="py-4 px-6 font-medium text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                Status
                            </th>
                            <th className="py-4 px-6 font-medium text-slate-500 dark:text-[#a3a3a3] text-[13.5px] transition-colors">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayedHistory.length > 0 ? (
                            displayedHistory.map((payment) => (
                                <tr
                                    key={payment.id}
                                    className="border-b border-slate-100 dark:border-[#262626] hover:bg-slate-50/80 dark:hover:bg-[#1f1f23]/40 transition-colors group/row"
                                >
                                    <td className="py-4 pl-5 w-12 border-r border-slate-100 dark:border-[#262626] transition-colors">
                                        <div
                                            className={`w-[18px] h-[18px] rounded-[4px] border ${selectedItems.includes(payment.id) ? 'border-light-primary bg-light-primary/20 text-light-primary-text dark:text-light-primary dark:border-light-primary flex items-center justify-center' : 'border-slate-300 dark:border-[#404040] bg-white dark:bg-transparent hover:bg-slate-100 dark:hover:bg-[#1f1f23]'} cursor-pointertransition-colors`}
                                            onClick={() => toggleSelect(payment.id)}
                                        >
                                            {selectedItems.includes(payment.id) && (
                                                <Check size={12} strokeWidth={3} />
                                            )}
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-[13px] text-slate-600 dark:text-[#a3a3a3] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap font-mono transition-colors">
                                        {payment.id}
                                    </td>
                                    <td className="py-4 px-6 text-[13px] text-slate-800 dark:text-[#e5e5e5] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                        <span className="font-semibold">₹{payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> <span className="text-slate-500 dark:text-[#a3a3a3] ml-1 text-[11px] font-medium"></span>
                                    </td>
                                    <td className="py-4 px-6 border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="relative">
                                                <img src={payment.avatar} alt={payment.to} className="w-8 h-8 rounded-full object-cover opacity-90 border border-slate-200 dark:border-transparent group-hover/row:scale-110 transition-transform" />
                                                <div className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white dark:border-[#131216] ${payment.status === 'Completed' ? 'bg-emerald-500' : payment.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'}`} />
                                            </div>
                                            <span className="text-[14px] text-slate-700 dark:text-[#a3a3a3] font-medium">
                                                {payment.to}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 text-[13.5px] text-slate-600 dark:text-[#a3a3a3] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                        {payment.period}
                                    </td>
                                    <td className="py-4 px-6 border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                        <span className={`inline-flex items-center justify-center px-2.5 py-[3px] text-[11px] font-bold rounded-md border ${payment.status === 'Completed'
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20'
                                                : payment.status === 'Pending'
                                                    ? 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                                                    : 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
                                            }`}>
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 whitespace-nowrap">
                                        {currentRole === 'Admin' && (
                                            <button
                                                onClick={() => deleteTransaction(payment.id)}
                                                className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-500/10"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="py-20 text-center text-slate-400 dark:text-[#525252]">
                                    <div className="flex flex-col items-center gap-2">
                                        <Search size={32} className="opacity-20" />
                                        <p className="text-[14px]">No transactions found matching your criteria</p>
                                        <button
                                            onClick={() => { setSearchTerm(""); setFilterStatus("All"); }}
                                            className="text-emerald-500 text-[13px] hover:underline mt-1"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {visibleCount < filteredAndSortedHistory.length && (
                <div className="pr-6 pl-4 flex items-center justify-end bg-transparent py-[12px] border-t border-slate-100 dark:border-[#262626]">
                    <button
                        onClick={handleReadMore}
                        className="text-[12px] font-semibold text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                    >
                        Load More Results
                        <ChevronDown size={14} />
                    </button>
                </div>
            )}

            {/* Add Transaction Modal */}
            {showAddModal && <AddTransactionModal onClose={() => setShowAddModal(false)} onSubmit={addTransaction} />}
        </div>
    );
};

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
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-white">✕</button>
                </div>
                <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Recipient Name</label>
                        <input required value={formData.to} onChange={e => setFormData({ ...formData, to: e.target.value })} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white" placeholder="e.g. John Doe" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-slate-500 uppercase">Amount</label>
                        <input required type="number" step="0.01" value={formData.amount} onChange={e => setFormData({ ...formData, amount: e.target.value })} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white" placeholder="0.00" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Status</label>
                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white">
                                <option>Completed</option>
                                <option>Pending</option>
                                <option>Failed</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-semibold text-slate-500 uppercase">Method</label>
                            <select value={formData.method} onChange={e => setFormData({ ...formData, method: e.target.value })} className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-lg px-4 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500/20 outline-none dark:text-white">
                                <option>Bank Transfer</option>
                                <option>Wire Transfer</option>
                                <option>Credit Card</option>
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="mt-4 bg-emerald-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition-all">Submit Transaction</button>
                </form>
            </div>
        </div>
    );
};

export default History;
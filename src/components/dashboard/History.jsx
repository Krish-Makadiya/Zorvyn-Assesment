import React, { useState } from 'react';
import { paymentHistory } from '../../data/mockData';
import { Check, Calendar, Sun, ChevronDown, Download, Search } from 'lucide-react';

const History = () => {
    const [visibleCount, setVisibleCount] = useState(10);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleReadMore = () => {
        setVisibleCount(prev => Math.min(prev + 10, paymentHistory.length));
    };

    const toggleSelectAll = () => {
        if (selectedItems.length === paymentHistory.slice(0, visibleCount).length) {
            setSelectedItems([]);
        } else {
            setSelectedItems(paymentHistory.slice(0, visibleCount).map(p => p.id));
        }
    };

    const toggleSelect = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    };

    console.log(paymentHistory);

    return (
        <div className="w-full bg-white dark:bg-[#131216] rounded-xl border border-slate-200 dark:border-[#262626] overflow-hidden flex flex-col font-sans shadow-sm dark:shadow-none transition-colors duration-300">
            {/* Top Toolbar */}
            <div className="p-4 border-b border-slate-100 dark:border-[#262626] flex flex-wrap items-center justify-between gap-4 transition-colors">
                <div className="flex flex-wrap items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#737373]" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search Transaction..." 
                            className="bg-slate-50 dark:bg-[#1a1a1e] border border-slate-200 dark:border-[#262626] text-slate-600 dark:text-[#a3a3a3] text-[13px] rounded-lg pl-10 pr-4 py-2.5 focus:outline-none w-[250px] placeholder:text-slate-400 dark:placeholder:text-[#525252] shadow-inner font-medium transition-colors"
                        />
                    </div>
                    
                    {/* Filters */}
                    <button className="flex items-center gap-2 bg-transparent text-slate-600 dark:text-[#a3a3a3] border border-transparent px-3 flex-shrink-0 py-2.5 rounded-lg text-[13px] hover:bg-slate-50 dark:hover:bg-[#1f1f23] transition-colors font-medium">
                        <Sun size={15} className="text-slate-400 dark:text-[#a3a3a3]" />
                        Processed Date
                    </button>
                    
                    <button className="flex items-center gap-2 bg-transparent text-slate-600 dark:text-[#a3a3a3] border border-transparent px-3 flex-shrink-0 py-2.5 rounded-lg text-[13px] hover:bg-slate-50 dark:hover:bg-[#1f1f23] transition-colors font-medium">
                        <Calendar size={15} className="text-slate-400 dark:text-[#a3a3a3]" />
                        Processed Date
                    </button>

                    <button className="flex items-center gap-2 bg-slate-100 dark:bg-[#1f1f23] text-slate-700 dark:text-[#d4d4d4] px-4 flex-shrink-0 py-2 rounded-xl text-[13px] hover:bg-slate-200 dark:hover:bg-[#27272a] transition-colors font-medium ml-1">
                        More <ChevronDown size={14} className="opacity-80" strokeWidth={2.5}/>
                    </button>
                </div>

                <button className="p-2 text-slate-400 dark:text-[#a3a3a3] opacity-80 hover:opacity-100 transition-colors bg-transparent hover:bg-slate-50 dark:hover:bg-[#1f1f23] rounded-lg">
                    <Download size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto text-slate-700 dark:text-[#d4d4d4]">
                <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr className="border-b border-slate-100 dark:border-[#262626] bg-slate-50/50 dark:bg-transparent">
                            <th className="py-4 pl-5 font-normal text-slate-500 dark:text-[#a3a3a3] text-[13.5px] w-12 border-r border-slate-100 dark:border-[#262626] transition-colors">
                                <div 
                                    className={`w-[18px] h-[18px] rounded-[4px] border ${selectedItems.length > 0 && selectedItems.length === paymentHistory.slice(0, visibleCount).length ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 flex items-center justify-center' : 'border-slate-300 dark:border-[#404040] bg-white dark:bg-transparent hover:bg-slate-100 dark:hover:bg-[#1f1f23]'} cursor-pointer transition-colors`}
                                    onClick={toggleSelectAll}
                                >
                                    {selectedItems.length > 0 && selectedItems.length === paymentHistory.slice(0, visibleCount).length && (
                                        <Check size={12} strokeWidth={3} />
                                    )}
                                </div>
                            </th>
                            <th className="py-4 px-6 font-semibold sm:font-normal text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                Payment ID
                            </th>
                            <th className="py-4 px-6 font-semibold sm:font-normal text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                Total Amount
                            </th>
                            <th className="py-4 px-6 font-semibold sm:font-normal text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                To
                            </th>
                            <th className="py-4 px-6 font-semibold sm:font-normal text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                Payment Period
                            </th>
                            <th className="py-4 px-6 font-semibold sm:font-normal text-slate-500 dark:text-[#a3a3a3] text-[13.5px] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                Payment Method
                            </th>
                            <th className="py-4 pl-6 pr-6 font-semibold sm:font-normal text-slate-500 dark:text-[#a3a3a3] text-[13.5px] whitespace-nowrap transition-colors">
                                Processed Date
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentHistory.slice(0, visibleCount).map((payment) => (
                            <tr 
                                key={payment.id} 
                                className="border-b border-slate-100 dark:border-[#262626] hover:bg-slate-50/80 dark:hover:bg-[#1f1f23]/40 transition-colors"
                            >
                                <td className="py-4 pl-5 w-12 border-r border-slate-100 dark:border-[#262626] transition-colors">
                                    <div 
                                        className={`w-[18px] h-[18px] rounded-[4px] border ${selectedItems.includes(payment.id) ? 'border-emerald-500 bg-emerald-500/20 text-emerald-600 dark:text-emerald-500 flex items-center justify-center' : 'border-slate-300 dark:border-[#404040] bg-white dark:bg-transparent hover:bg-slate-100 dark:hover:bg-[#1f1f23]'} cursor-pointer transition-colors`}
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
                                    ${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-slate-500 dark:text-[#a3a3a3] ml-1 font-medium sm:font-normal">{payment.currency || 'USD'}</span>
                                </td>
                                <td className="py-4 px-6 border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                    <div className="flex items-center gap-3">
                                        <img src={payment.avatar} alt={payment.to} className="w-7 h-7 rounded-full object-cover opacity-90 border border-slate-200 dark:border-transparent" />
                                        <span className="text-[14px] text-slate-700 dark:text-[#a3a3a3] font-medium sm:font-normal">
                                            {payment.to}
                                        </span>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-[13.5px] text-slate-600 dark:text-[#a3a3a3] border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                    {payment.period}
                                </td>
                                <td className="py-4 px-6 border-r border-slate-100 dark:border-[#262626] whitespace-nowrap transition-colors">
                                    <span className="inline-flex items-center justify-center px-3.5 py-[5px] text-[12px] font-semibold rounded-lg bg-slate-100 dark:bg-[#27272a] text-slate-700 dark:text-[#d4d4d4] border border-slate-200 dark:border-[#3f3f46]/40">
                                        {payment.method}
                                    </span>
                                </td>
                                <td className="py-4 pl-6 pr-6 text-[13.5px] text-slate-600 dark:text-[#a3a3a3] whitespace-nowrap font-medium sm:font-normal transition-colors">
                                    {payment.date || payment.period.split(' - ')[0]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {visibleCount < paymentHistory.length && (
                <div className="pr-6 pl-4 flex items-center justify-end bg-transparent py-[8px] border-t border-slate-100 dark:border-[#262626]">
                    <button 
                        onClick={handleReadMore}
                        className="text-[12px] font-medium text-slate-500 dark:text-[#737373] hover:text-slate-800 dark:hover:text-[#d4d4d4] transition-colors"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};

export default History;
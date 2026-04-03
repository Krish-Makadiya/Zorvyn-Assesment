import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const CashFlowChart = ({ cashFlowData }) => {
    const [cashFlowView, setCashFlowView] = useState('monthly');
    const [cashFlowCategory, setCashFlowCategory] = useState('expense');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
    const [expenseSubCategory, setExpenseSubCategory] = useState('all');

    const currentData = cashFlowData[cashFlowView];
    const dataKey = cashFlowCategory === 'expense' && expenseSubCategory !== 'all' ? expenseSubCategory : cashFlowCategory;
    
    const maxVal = currentData.length > 0 ? Math.max(...currentData.map(d => d[dataKey] || 0)) : 0;
    const yAxisLabels = [maxVal, maxVal * 0.75, maxVal * 0.5, maxVal * 0.25, 0];
    const totalAmount = currentData.reduce((sum, item) => sum + (item[dataKey] || 1), 0);

    const linePoints = currentData.map((d, i) => {
        const x = ((i + 0.5) / currentData.length) * 100;
        const y = maxVal > 0 ? 100 - ((d[dataKey] / maxVal) * 100) : 100;
        return `${x},${y}`;
    }).join(' ');

    const firstX = ((0 + 0.5) / currentData.length) * 100;
    const lastX = currentData.length > 0 ? (((currentData.length - 1) + 0.5) / currentData.length) * 100 : 0;
    const polygonPoints = `${firstX},100 ${linePoints} ${lastX},100`;

    return (
        <div className="stat-card bg-white dark:bg-dark-surface rounded-3xl border border-slate-200 dark:border-zinc-800/80 shadow-sm p-6 sm:p-8 flex flex-col transition-colors duration-300 relative overflow-visible z-10 h-full w-full">
            <div className="flex justify-between items-start mb-10 z-20 relative">
                <div className="flex flex-col gap-1">
                    <h2 className="text-sm sm:text-[15px] font-semibold text-slate-500 dark:text-zinc-400 capitalize">{cashFlowCategory} Summary</h2>
                    <p className="text-3xl sm:text-4xl font-bold text-light-primary-text dark:text-dark-primary-text tracking-tight">₹{totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
                </div>
                <div className="relative">
                    <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 dark:bg-[#1a1b1e] text-[13px] font-medium text-slate-600 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-800 transition-all active:scale-95">
                        {cashFlowView === 'monthly' ? 'Monthly' : 'Yearly'}
                        <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-20" onClick={() => setDropdownOpen(false)}></div>
                            <div className="absolute right-0 top-full mt-2 bg-white dark:bg-[#1f2025] border border-slate-100 dark:border-zinc-800 shadow-xl rounded-xl z-30 py-1 min-w-[130px]">
                                {['monthly', 'yearly'].map(v => (
                                    <button key={v} className={`w-full text-left px-5 py-2.5 text-sm capitalize ${cashFlowView === v ? 'text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10' : 'text-slate-600 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800/80'}`} onClick={() => { setCashFlowView(v); setDropdownOpen(false); }}>
                                        {v}
                                    </button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap justify-between items-center gap-4 mb-12 z-10 relative">
                <div className="flex items-center gap-1 bg-slate-50 dark:bg-[#1a1b1e]/80 p-1 rounded-full border border-slate-100/50 dark:border-zinc-800/40">
                    {['expense', 'income', 'savings'].map((cat) => (
                        <button key={cat} onClick={() => { setCashFlowCategory(cat); if (cat !== 'expense') setExpenseSubCategory('all'); }} className={`px-5 py-1.5 rounded-full text-[13px] font-semibold transition-all capitalize ${cashFlowCategory === cat ? 'bg-white dark:bg-[#2c2d33] text-light-primary-text dark:text-gray-100 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-zinc-400 dark:hover:text-zinc-200'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
                {cashFlowCategory === 'expense' && (
                    <div className="flex flex-wrap items-center gap-2">
                        {['all', 'housing', 'food', 'transport', 'entertainment', 'utilities'].map((subcat) => (
                            <button key={subcat} onClick={() => setExpenseSubCategory(subcat)} className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all capitalize border ${expenseSubCategory === subcat ? 'bg-light-primary/20 text-light-primary-text border-light-primary-text/20 dark:bg-dark-primary/20 dark:text-dark-primary-text' : 'bg-white text-slate-500 border-slate-200 dark:bg-[#232428] dark:border-zinc-700/50 dark:text-zinc-400'}`}>
                                {subcat}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex-1 w-full relative min-h-[220px] pb-1 mt-5">
                <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pb-8 pt-2">
                    {yAxisLabels.map((val, i) => (
                        <div key={i} className="flex items-center w-full relative h-px">
                            <span className="text-[10px] font-semibold text-slate-400 w-8 text-right pr-2 shrink-0 -mt-[11px]">
                                {val >= 1000 ? `${(val/1000).toFixed(0)}k` : val.toFixed(0)}
                            </span>
                            <div className="absolute left-8 right-0 border-b border-dashed border-slate-200/80 dark:border-zinc-800/80"></div>
                        </div>
                    ))}
                </div>
                <div className="absolute left-8 right-0 top-2 bottom-8 z-10 overflow-visible">
                    <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs><linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#a6fc21" stopOpacity="0.35" /><stop offset="100%" stopColor="#a6fc21" stopOpacity="0.01" /></linearGradient></defs>
                        <path 
                            d={`M ${firstX},100 ${currentData.map((d, i) => `L ${((i + 0.5) / currentData.length) * 100},${maxVal > 0 ? 100 - ((d[dataKey] / maxVal) * 100) : 100}`).join(' ')} L ${lastX},100 Z`} 
                            fill="url(#areaGradient)" 
                            vectorEffect="non-scaling-stroke" 
                            className="transition-all duration-500 ease-in-out"
                        />
                        <path 
                            d={`M ${currentData.map((d, i) => `${((i + 0.5) / currentData.length) * 100},${maxVal > 0 ? 100 - ((d[dataKey] / maxVal) * 100) : 100}`).join(' L ')}`} 
                            fill="none" 
                            stroke="#a6fc21" 
                            strokeWidth="3" 
                            vectorEffect="non-scaling-stroke" 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            className="drop-shadow-[0_0_8px_rgba(166,252,33,0.5)] transition-all duration-500 ease-in-out" 
                        />
                    </svg>
                    <div className="absolute inset-0 z-20">
                        {currentData.map((d, i) => {
                            const x = ((i + 0.5) / currentData.length) * 100;
                            const y = maxVal > 0 ? 100 - ((d[dataKey] / maxVal) * 100) : 100;
                            const isHovered = hoveredBarIndex === i;
                            return (
                                <div key={i} className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center cursor-pointer transition-all duration-500 ease-in-out" style={{ left: `${x}%`, top: `${y}%` }} onMouseEnter={() => setHoveredBarIndex(i)} onMouseLeave={() => setHoveredBarIndex(null)}>
                                    <div className={`w-3.5 h-3.5 rounded-full bg-white dark:bg-[#1a1b1e] transition-all duration-300 ${isHovered ? 'border-4 border-[#9fff00] scale-150 shadow-[0_0_12px_rgba(166,252,33,0.8)]' : 'border-[3px] border-[#a6fc21]'}`}></div>
                                    {isHovered && (
                                        <div className="absolute bottom-full mb-3 bg-black text-white dark:bg-white dark:text-black text-[12px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-30 flex flex-col items-center animate-in zoom-in-75 duration-200">
                                            ₹{d[dataKey].toLocaleString()}
                                            <div className="absolute -bottom-[3px] w-3 h-3 bg-black dark:bg-white rotate-45"></div>
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="absolute bottom-0 left-8 right-0 flex items-center justify-between text-[11px] font-semibold text-slate-400 z-10 pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                    {currentData.map((d, i) => <div key={i} className="flex-1 text-center truncate">{d.label}</div>)}
                </div>
            </div>
        </div>
    );
};

export default CashFlowChart;

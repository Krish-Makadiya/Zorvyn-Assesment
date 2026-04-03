import React, { useRef, useState } from 'react'
import { useStore } from '../../store/useStore'
import { savingsData } from '../../data/mockData'
import { Plane, Utensils, Car, MoreHorizontal, TrendingUp, ChevronDown, Coins, CreditCard, ArrowUpCircle, ArrowDownCircle, Percent } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

const IconMap = {
    Coins: Coins,
    CreditCard: CreditCard,
    Income: ArrowUpCircle,
    Expense: ArrowDownCircle,
    Savings: Percent,
    Plane: Plane,
    Utensils: Utensils,
    Car: Car
};

const savingsTag = [
    {
        id: 1,
        title: "Travel",
        icon: Plane,
        colorClass: "text-red-500 bg-red-500/10"
    },
    {
        id: 2,
        title: "Dining",
        icon: Utensils,
        colorClass: "text-blue-500 bg-blue-500/10"
    },
    {
        id: 3,
        title: "Transit",
        icon: Car,
        colorClass: "text-emerald-500 bg-emerald-500/10"
    },
]

const TransactionStats = () => {
    const { stats, cashFlowData } = useStore();
    const containerRef = useRef(null);
    const [cashFlowView, setCashFlowView] = useState('monthly');
    const [cashFlowCategory, setCashFlowCategory] = useState('expense');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
    const [expenseSubCategory, setExpenseSubCategory] = useState('all');
    const [hoveredPieSlice, setHoveredPieSlice] = useState(null);

    const currentData = cashFlowData[cashFlowView];
    const dataKey = cashFlowCategory === 'expense' && expenseSubCategory !== 'all' ? expenseSubCategory : cashFlowCategory;

    // Helper to get Icon component safely
    const getIcon = (iconIdentifier) => {
        if (typeof iconIdentifier === 'function' || typeof iconIdentifier === 'object') return iconIdentifier;
        return IconMap[iconIdentifier] || Coins;
    };

    // Calculate max value for scaling the line chart
    const maxVal = currentData.length > 0 ? Math.max(...currentData.map(d => d[dataKey] || 0)) : 0;
    const yAxisLabels = [maxVal, maxVal * 0.75, maxVal * 0.5, maxVal * 0.25, 0];
    const totalAmount = currentData.reduce((sum, item) => sum + (item[dataKey] || 0), 0);

    // Line points for SVG
    const linePoints = currentData.map((d, i) => {
        const x = ((i + 0.5) / currentData.length) * 100;
        const y = maxVal > 0 ? 100 - ((d[dataKey] / maxVal) * 100) : 100;
        return `${x},${y}`;
    }).join(' ');

    const latestExpenseData = currentData[currentData.length - 1] || {};
    const pieData = [
        { label: 'Housing', value: latestExpenseData.housing || 0, color: '#3b82f6' },
        { label: 'Food', value: latestExpenseData.food || 0, color: '#10b981' },
        { label: 'Transport', value: latestExpenseData.transport || 0, color: '#f59e0b' },
        { label: 'Entertainment', value: latestExpenseData.entertainment || 0, color: '#8b5cf6' },
        { label: 'Utilities', value: latestExpenseData.utilities || 0, color: '#ec4899' }
    ];

    const totalPieExpense = pieData.reduce((acc, curr) => acc + curr.value, 0) || 1;
    const totalPieValue = totalPieExpense; // Alias for backward compatibility if needed
    let cumulativeValue = 0;

    const pieSlices = pieData.map((slice, i) => {
        const percentage = (slice.value / totalPieValue) * 100;
        const dashArray = `${percentage} ${100 - percentage}`;
        const dashOffset = -cumulativeValue;
        cumulativeValue += percentage;
        const isHovered = hoveredPieSlice === i;

        return (
            <circle
                key={i}
                cx="21" cy="21" r="15.915494309189533"
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? "8.5" : "6"}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className={`transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-85 hover:opacity-100'}`}
                onMouseEnter={() => setHoveredPieSlice(i)}
                onMouseLeave={() => setHoveredPieSlice(null)}
                style={{ strokeLinecap: 'butt' }}
            />
        );
    });

    // Polygon points for the gradient area under the line
    const firstX = ((0 + 0.5) / currentData.length) * 100;
    const lastX = currentData.length > 0 ? (((currentData.length - 1) + 0.5) / currentData.length) * 100 : 0;
    const polygonPoints = `${firstX},100 ${linePoints} ${lastX},100`;

    useGSAP(() => {
        gsap.from(".stat-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
        });
    }, { scope: containerRef });

    return (
        <div className="w-full" ref={containerRef}>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-5 gap-4 md:gap-3 h-full min-h-[800px]">

                {/* Highlighted Hero Card: Smart Saving */}
                <div className="stat-card relative overflow-hidden bg-linear-to-br from-dark-primary to-dark-primary/80 dark:from-dark-primary/80 dark:to-dark-primary/40 rounded-3xl p-7 flex flex-col justify-between shadow-2xl shadow-light-primary/20 dark:shadow-dark-primary/10 md:col-span-1 md:row-span-2 group transition-all duration-500 hover:scale-[1.02]">
                    {/* Abstract Background Element */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[50px] -mr-10 -mt-10 rounded-full group-hover:bg-white/20 transition-colors"></div>
                    
                    <div className="relative z-10">
                        <h1 className="text-2xl font-bold text-white tracking-tight">Smart Saving</h1>
                        <p className="text-[13px] text-emerald-50/70 font-medium leading-relaxed max-w-[80%] uppercase tracking-widest mt-1">Investment Pulse</p>
                    </div>

                    <div className="my-auto relative z-10">
                        <div className="flex items-baseline gap-2">
                            <p className="text-5xl font-black text-white drop-shadow-md">
                                {savingsData.totalSavings.toLocaleString()}
                            </p>
                            <p className="text-base font-bold text-emerald-100/60 uppercase">INR</p>
                        </div>
                        <div className="flex items-center gap-1.5 mt-2">
                           <p className="text-[12px] font-bold text-emerald-100/70 uppercase tracking-widest">Total Liquid Assets</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5 w-full mt-auto relative z-10">
                        {savingsTag.map((tag) => (
                            <div key={tag.id} className="flex-1 transition-all hover:-translate-y-1.5 cursor-pointer">
                                <div className="bg-white/15 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl flex flex-col gap-2 items-center justify-center hover:bg-white/20 transition-colors shadow-lg">
                                    <tag.icon size={22} strokeWidth={2.5} className="text-white drop-shadow-sm" />
                                    <p className="text-[9px] font-black text-white/90 uppercase tracking-tighter">{tag.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {stats.map((stat) => {
                    const StatIcon = getIcon(stat.icon);
                    return (
                        <div key={stat.id} className="stat-card group relative overflow-hidden bg-white dark:bg-dark-surface rounded-3xl border border-slate-200 dark:border-zinc-800/80 shadow-sm md:col-span-1 md:row-span-1 p-6 flex flex-col justify-between transition-colors duration-300 cursor-pointer">
                            <div className="flex items-center justify-between mb-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.colorClass || 'text-blue-500 bg-blue-500/10'}`}>
                                        <StatIcon size={20} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="text-[15px] font-semibold text-light-primary-text dark:text-dark-primary-text">
                                        {stat.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10 dark:text-emerald-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                                    <span>+{stat.percentage}</span>
                                    <TrendingUp size={14} strokeWidth={3} />
                                </div>
                            </div>

                            <div className={`absolute bottom-2 right-2 w-32 h-32 opacity-10  transform translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-none z-0 ${stat.colorClass ? stat.colorClass.split(' ')[0] : 'text-blue-500'}`}>
                                <StatIcon className="w-full h-full" strokeWidth={2.5} />
                            </div>

                            <div className="flex items-center gap-2 mt-auto relative z-10">
                                <h2 className="text-2xl lg:text-[28px] font-bold text-light-primary-text dark:text-dark-primary-text tracking-tight">
                                    {typeof stat.amount === 'number' ? `${stat.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}` : stat.amount}
                                </h2>
                                {typeof stat.amount === 'number' && (
                                    <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
                                        INR
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}

                <div className="stat-card bg-white dark:bg-dark-surface rounded-3xl border border-slate-200 dark:border-zinc-800/80 shadow-sm md:col-span-1 md:row-span-3 md:col-start-4 md:row-start-1 p-5 flex flex-col transition-colors duration-300">
                    <div className="w-full aspect-[1.58] group perspective-[1000px] cursor-pointer">
                        <div className="relative w-full h-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">

                            {/* Face 1: Detailed Metadata (Back View - appears on hover) */}
                            <div className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-linear-to-br from-[#29421a] via-[#080b06] to-[#162910] text-white shadow-xl shadow-green-900/10 border border-white/10 backface-hidden transform-[rotateY(180deg)]">
                                <div className="absolute -top-[40%] -left-[10%] w-[80%] h-[80%] rounded-full bg-green-500/15 blur-[60px] pointer-events-none"></div>
                                <div className="absolute -bottom-[20%] right-[0%] w-[60%] h-[60%] rounded-full bg-green-600/10 blur-[50px] pointer-events-none"></div>
                                <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/2 to-white/5 pointer-events-none"></div>

                                <div className="flex justify-between items-start z-10 relative">
                                    <svg width="34" height="24" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white/80 mt-0.5 opacity-90">
                                        <rect x="1" y="1" width="34" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M10 1V25 M26 1V25 M1 9H10 M26 9H35 M1 17H10 M26 17H35 M10 13H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <rect x="14" y="6" width="8" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                    <span className="font-bold italic text-xl tracking-tighter pr-1 drop-shadow-md">VISA</span>
                                </div>

                                <div className="flex items-center gap-3 sm:gap-4 text-base lg:text-[17px] font-semibold tracking-wider z-10 relative mt-1">
                                    <span className="tracking-[0.2em] mt-1 opacity-90">****</span>
                                    <span className="tracking-[0.2em] mt-1 opacity-90">****</span>
                                    <span className="opacity-90">3892</span>
                                    <span className="opacity-90">7835</span>
                                </div>

                                <div className="flex justify-between items-end z-10 relative">
                                    <span className="text-[13px] sm:text-sm font-medium tracking-wide text-white/90">Robart Esperanza</span>

                                    <div className="flex gap-4 sm:gap-5 text-right">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-white/60 mb-0.5">Valid Thru</span>
                                            <span className="text-xs sm:text-[13px] font-semibold tracking-wider">18/90</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-white/60 mb-0.5">CVV</span>
                                            <span className="text-xs sm:text-[13px] font-semibold tracking-wider">235</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Face 2: Official Minimalist Front (Default View) */}
                            <div className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-linear-to-tl from-[#193210] via-[#080b06] to-[#12220d] text-white shadow-xl shadow-green-900/10 border border-white/10 backface-hidden">
                                <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 blur-[50px] pointer-events-none"></div>
                                <div className="absolute inset-0 bg-linear-to-bl from-transparent via-white/1 to-white/4 pointer-events-none"></div>

                                {/* Top: Bank Brand & Contactless */}
                                <div className="flex justify-between items-center z-10 relative">
                                    <span className="font-bold text-lg tracking-[0.15em] text-emerald-50 opacity-90 uppercase">FinVision</span>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 opacity-80 rotate-90">
                                        <path d="M4 12v.01" />
                                        <path d="M8 10a4 4 0 0 1 0 4" />
                                        <path d="M12 8a8 8 0 0 1 0 8" />
                                        <path d="M16 6a12 12 0 0 1 0 12" />
                                    </svg>
                                </div>

                                {/* Middle: EMV Smart Chip */}
                                <div className="z-10 relative mt-2">
                                    <svg width="40" height="28" viewBox="0 0 36 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-yellow-400/80 drop-shadow-sm">
                                        <rect x="1" y="1" width="34" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M10 1V25 M26 1V25 M1 9H10 M26 9H35 M1 17H10 M26 17H35 M10 13H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        <rect x="14" y="6" width="8" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    </svg>
                                </div>

                                {/* Bottom: Official Logo */}
                                <div className="flex justify-between items-end z-10 relative mt-auto">
                                    <span className="text-xs font-semibold tracking-widest text-[#7a9d7b] uppercase">Debit</span>
                                    <span className="font-bold italic text-4xl tracking-tighter drop-shadow-lg opacity-95">VISA</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Supporting Metadata Metrics under the Card */}
                    <div className="mt-5 flex-1 flex flex-col gap-3">
                        {/* Bottom Spending AI Panel */}
                        <div className="bg-slate-50 dark:bg-[#151517] p-4 rounded-2xl border border-slate-100 dark:border-zinc-800/80 shadow-sm flex-1 flex flex-col justify-between">
                            <div>
                                <p className="text-[13px] font-medium text-slate-500 dark:text-zinc-400 mb-1">AI-Generated Spending Limits</p>
                                <h4 className="text-[22px] font-bold text-light-primary-text dark:text-gray-100 tracking-tight">$4,815.23</h4>
                            </div>

                            <div className="mt-4 pt-1">
                                <p className="text-[12px] font-medium text-slate-500 dark:text-zinc-400 mb-2">Smart Spending Limits</p>

                                {/* Segmented Progress Bar */}
                                <div className="flex gap-1 w-full h-[6px]">
                                    <div className="h-full rounded-full bg-[#ccff00]" style={{ width: '27%' }}></div>
                                    <div className="h-full rounded-full bg-[#e3ff66]" style={{ width: '35%' }}></div>
                                    <div className="h-full rounded-full bg-[#f4ffb3]" style={{ width: '18%' }}></div>
                                    <div className="h-full rounded-full bg-slate-200 dark:bg-white" style={{ width: '20%' }}></div>
                                </div>

                                {/* Category Legends */}
                                <div className="grid grid-cols-2 gap-y-2.5 mt-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#ccff00]"></div>
                                        <span className="text-[12px] text-slate-600 dark:text-zinc-400 font-medium">Shopping <span className="opacity-70">(27%)</span></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#e3ff66]"></div>
                                        <span className="text-[12px] text-slate-600 dark:text-zinc-400 font-medium whitespace-nowrap">Subscriptions <span className="opacity-70">(35%)</span></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-[#f4ffb3]"></div>
                                        <span className="text-[12px] text-slate-600 dark:text-zinc-400 font-medium whitespace-nowrap">Dining Out <span className="opacity-70">(18%)</span></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-[2px] bg-slate-200 dark:bg-white"></div>
                                        <span className="text-[12px] text-slate-600 dark:text-zinc-400 font-medium">Other <span className="opacity-70">(20%)</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ---------------------------------------------------------- */}

                <div className="stat-card bg-white dark:bg-dark-surface rounded-3xl border border-slate-200 dark:border-zinc-800/80 shadow-sm md:col-span-3 md:row-span-3 p-6 sm:p-8 flex flex-col transition-colors duration-300 relative overflow-visible z-10">
                    {/* Header Controls */}
                    <div className="flex justify-between items-start mb-10 z-20 relative">
                        <div className="flex flex-col gap-1">
                            <h2 className="text-sm sm:text-[15px] font-semibold text-slate-500 dark:text-zinc-400">
                                Cash Flow
                            </h2>
                            <p className="text-3xl sm:text-4xl font-bold text-light-primary-text dark:text-dark-primary-text tracking-tight">
                                ${totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                        </div>

                        {/* Period Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-50 hover:bg-slate-100 dark:bg-[#1a1b1e] dark:hover:bg-zinc-800/80 transition-colors text-[13px] font-medium text-slate-600 dark:text-zinc-300 border border-slate-200/60 dark:border-zinc-800"
                            >
                                {cashFlowView === 'monthly' ? 'Monthly' : 'Yearly'}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {dropdownOpen && (
                                <>
                                    <div className="fixed inset-0 z-20" onClick={() => setDropdownOpen(false)}></div>
                                    <div className="absolute right-0 top-full mt-2 bg-white dark:bg-[#1f2025] border border-slate-100 dark:border-zinc-800 shadow-xl rounded-xl overflow-hidden min-w-[130px] z-30 py-1">
                                        <button
                                            className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${cashFlowView === 'monthly' ? 'text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10' : 'text-slate-600 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800/80'}`}
                                            onClick={() => { setCashFlowView('monthly'); setDropdownOpen(false); }}
                                        >
                                            Monthly
                                        </button>
                                        <button
                                            className={`w-full text-left px-5 py-2.5 text-sm transition-colors ${cashFlowView === 'yearly' ? 'text-emerald-500 bg-emerald-50/50 dark:bg-emerald-500/10' : 'text-slate-600 hover:bg-slate-50 dark:text-zinc-300 dark:hover:bg-zinc-800/80'}`}
                                            onClick={() => { setCashFlowView('yearly'); setDropdownOpen(false); }}
                                        >
                                            Yearly
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Category Selector Tabs & Breakdown Filters */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-12 z-10 relative">
                        {/* Primary Categories */}
                        <div className="flex shrink-0 items-center gap-1 bg-slate-50 dark:bg-[#1a1b1e]/80 p-1 rounded-full w-max border border-slate-100/50 dark:border-zinc-800/40 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)]">
                            {['expense', 'income', 'savings'].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        setCashFlowCategory(cat);
                                        if (cat !== 'expense') setExpenseSubCategory('all');
                                    }}
                                    className={`px-5 sm:px-6 py-1.5 rounded-full text-[13px] sm:text-sm font-semibold transition-all duration-300 capitalize ${cashFlowCategory === cat
                                        ? 'bg-white dark:bg-[#2c2d33] text-light-primary-text dark:text-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.07)] dark:shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
                                        : 'text-slate-500 dark:text-zinc-400 hover:text-slate-700 dark:hover:text-zinc-200'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Secondary Expense Filters */}
                        {cashFlowCategory === 'expense' && (
                            <div className="flex flex-wrap items-center gap-2 animate-in slide-in-from-left-4 fade-in duration-300">
                                {['all', 'housing', 'food', 'transport', 'entertainment', 'utilities'].map((subcat) => (
                                    <button
                                        key={subcat}
                                        onClick={() => setExpenseSubCategory(subcat)}
                                        className={`px-3 py-1.5 sm:py-1 rounded-full text-[11px] sm:text-[12px] font-semibold transition-all duration-200 capitalize ${expenseSubCategory === subcat
                                            ? 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30'
                                            : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50 dark:bg-[#232428] dark:text-zinc-400 dark:border-zinc-700/50 dark:hover:bg-[#2a2b30]'
                                            } border shadow-sm cursor-pointer`}
                                    >
                                        {subcat === 'all' ? 'All Expenses' : subcat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Chart Area */}
                    <div className="flex-1 w-full relative min-h-[220px] pb-1">
                        {/* Background Lines & Y-Axis */}
                        <div className="absolute inset-x-0 inset-y-0 flex flex-col justify-between pb-8 pt-2">
                            {yAxisLabels.map((val, idx) => (
                                <div key={idx} className="flex flex-row items-center w-full relative h-px">
                                    <span className="text-[10px] sm:text-xs font-semibold text-slate-400 dark:text-zinc-500 w-8 sm:w-10 text-right pr-2 shrink-0 -mt-[11px]">
                                        {val >= 1000 ? `${(val / 1000).toFixed(0)}k` : val.toFixed(0)}
                                    </span>
                                    {/* Line extends behind everything cleanly */}
                                    <div className="absolute left-8 sm:left-10 right-0 border-b border-dashed border-slate-200/80 dark:border-zinc-800/80 z-0"></div>
                                </div>
                            ))}
                        </div>

                        {/* Line Chart Container */}
                        <div className="absolute left-8 sm:left-10 right-0 top-2 bottom-8 z-10 overflow-visible">
                            {/* SVG Line and Area */}
                            <svg className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                                <defs>
                                    <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#a6fc21" stopOpacity="0.35" />
                                        <stop offset="100%" stopColor="#a6fc21" stopOpacity="0.01" />
                                    </linearGradient>
                                </defs>

                                {/* Area Under the line */}
                                <polygon
                                    points={polygonPoints}
                                    fill="url(#areaGradient)"
                                    vectorEffect="non-scaling-stroke"
                                />

                                {/* The stroke line */}
                                <polyline
                                    points={linePoints}
                                    fill="none"
                                    stroke="#a6fc21"
                                    strokeWidth="3"
                                    vectorEffect="non-scaling-stroke"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="drop-shadow-[0_0_8px_rgba(166,252,33,0.5)]"
                                />
                            </svg>

                            {/* Interactive Dots & Tooltips */}
                            <div className="absolute inset-0 z-20">
                                {currentData.map((d, i) => {
                                    const x = ((i + 0.5) / currentData.length) * 100;
                                    const y = maxVal > 0 ? 100 - ((d[dataKey] / maxVal) * 100) : 100;
                                    const isHovered = hoveredBarIndex === i;

                                    return (
                                        <div
                                            key={i}
                                            className="absolute w-6 h-6 -ml-3 -mt-3 flex items-center justify-center cursor-pointer group"
                                            style={{ left: `${x}%`, top: `${y}%` }}
                                            onMouseEnter={() => setHoveredBarIndex(i)}
                                            onMouseLeave={() => setHoveredBarIndex(null)}
                                        >
                                            {/* Hover Area Helper (improves hover hitbox) */}
                                            <div className="absolute inset-x-[-15px] top-[-100px] bottom-[-100px] z-[-1]"></div>

                                            {/* Visible Dot */}
                                            <div className={`w-3.5 h-3.5 rounded-full bg-white dark:bg-[#1a1b1e] transition-all duration-300 ${isHovered ? 'border-4 border-[#9fff00] scale-150 shadow-[0_0_12px_rgba(166,252,33,0.8)]' : 'border-[3px] border-[#a6fc21] dark:border-[#a6fc21] shadow-sm'}`}></div>

                                            {/* Tooltip */}
                                            <div
                                                className={`absolute bottom-full mb-3 pointer-events-none bg-black text-white dark:bg-white dark:text-black text-[12px] sm:text-[14px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all duration-200 z-30 shadow-xl flex flex-col items-center ${isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}`}
                                            >
                                                ${d[dataKey].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                                <div className="absolute -bottom-[3px] w-3 h-3 bg-black dark:bg-white rotate-45 rounded-[1px] -z-10"></div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>

                        {/* X-Axis Labels */}
                        <div className="absolute bottom-0 left-8 sm:left-10 right-0 flex items-center justify-between text-[11px] sm:text-[12px] font-semibold text-slate-400 dark:text-zinc-500 z-10 pt-3 border-t border-slate-100 dark:border-zinc-800/80">
                            {currentData.map((d, i) => (
                                <div key={i} className="flex-1 text-center truncate px-0.5 relative">
                                    {d.label}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="stat-card group relative overflow-hidden bg-white dark:bg-dark-surface rounded-3xl border border-slate-200 dark:border-zinc-800/80 shadow-sm md:col-span-1 md:row-span-2 p-6 flex flex-col items-center justify-center transition-colors duration-300 cursor-pointer">
                    <div className="absolute top-6 left-6 z-10 transition-transform duration-300 group-hover:translate-x-1">
                        <h2 className="text-[15px] font-semibold text-light-primary-text dark:text-dark-primary-text mb-1">
                            Expenses Breakdown
                        </h2>
                        <div className="w-6 h-[2px] bg-emerald-500 rounded-full"></div>
                    </div>

                    <div className="relative w-full max-w-[220px] aspect-square flex items-center justify-center mt-8">
                        {/* Custom Mathematical SVG Pie Chart */}
                        <svg viewBox="0 0 42 42" className="w-full h-full -rotate-90 drop-shadow-md transition-transform duration-500 group-hover:scale-105">
                            <circle r="15.915494309189533" cx="21" cy="21" fill="transparent" stroke="#f1f5f9" className="dark:stroke-zinc-800/60" strokeWidth="6" />
                            {pieSlices}
                        </svg>

                        {/* Hollow Center Aggregation */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[2px] z-20">
                            {hoveredPieSlice !== null ? (
                                <>
                                    <p className="text-[10px] font-bold uppercase tracking-widest leading-none mb-1.5 transition-colors" style={{ color: pieData[hoveredPieSlice].color }}>
                                        {pieData[hoveredPieSlice].label}
                                    </p>
                                    <p className="text-[22px] font-extrabold text-light-primary-text dark:text-dark-primary-text tracking-tight leading-none">
                                        ${(pieData[hoveredPieSlice].value / 1000).toFixed(1)}k
                                    </p>
                                    <div className="mt-1.5 flex items-center justify-center px-2 py-[2px] rounded-full bg-slate-100 dark:bg-zinc-800 border border-slate-200/60 dark:border-zinc-700">
                                        <p className="text-[9px] font-bold text-slate-500 dark:text-zinc-400">
                                            {((pieData[hoveredPieSlice].value / totalPieExpense) * 100).toFixed(1)}%
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
                                    <p className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1.5">{latestExpenseData.label}</p>
                                    <p className="text-lg font-bold text-slate-700 dark:text-zinc-300 tracking-tight leading-none opacity-90">
                                        ${(totalPieExpense / 1000).toFixed(1)}k
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TransactionStats
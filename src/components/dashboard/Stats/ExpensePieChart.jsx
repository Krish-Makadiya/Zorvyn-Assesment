import React, { useState, useMemo } from 'react';

const ExpensePieChart = ({ cashFlowData }) => {
    const [hoveredPieSlice, setHoveredPieSlice] = useState(null);
    
    // Default to empty array if no data to prevent crashes
    const currentData = cashFlowData?.monthly || [];

    const aggregateData = useMemo(() => {
        return currentData.reduce((acc, month) => ({
            housing: acc.housing + (month.housing || 0),
            food: acc.food + (month.food || 0),
            transport: acc.transport + (month.transport || 0),
            entertainment: acc.entertainment + (month.entertainment || 0),
            utilities: acc.utilities + (month.utilities || 0)
        }), { housing: 0, food: 0, transport: 0, entertainment: 0, utilities: 0 });
    }, [currentData]);

    const pieData = useMemo(() => [
        { label: 'Housing', value: aggregateData.housing, color: '#3b82f6' },
        { label: 'Food', value: aggregateData.food, color: '#10b981' },
        { label: 'Transport', value: aggregateData.transport, color: '#f59e0b' },
        { label: 'Entertainment', value: aggregateData.entertainment, color: '#8b5cf6' },
        { label: 'Utilities', value: aggregateData.utilities, color: '#ec4899' }
    ], [aggregateData]);

    const totalPieExpense = pieData.reduce((acc, curr) => acc + curr.value, 0) || 1;
    
    let cumulativeShift = 0;
    const pieSlices = pieData.map((slice, i) => {
        const percentage = (slice.value / totalPieExpense) * 100;
        const dashArray = `${percentage} ${100 - percentage}`;
        const dashOffset = -cumulativeShift;
        cumulativeShift += percentage;
        const isHovered = hoveredPieSlice === i;

        return (
            <circle
                key={i}
                cx="21"
                cy="21"
                r="15.915494309189533"
                fill="transparent"
                stroke={slice.color}
                strokeWidth={isHovered ? "8.5" : "6.5"}
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                className={`transition-all duration-300 cursor-pointer ${isHovered ? 'opacity-100' : 'opacity-90 hover:opacity-100'}`}
                onMouseEnter={() => setHoveredPieSlice(i)}
                onMouseLeave={() => setHoveredPieSlice(null)}
            />
        );
    });

    return (
        <div className="stat-card group relative bg-white dark:bg-[#1C1C21] rounded-[32px] border border-slate-200 dark:border-zinc-800/80 shadow-sm p-7 flex flex-col items-center justify-center cursor-pointer h-full w-full opacity-100 z-20">
            {/* Header */}
            <div className="absolute top-6 left-7 z-10">
                <h2 className="text-[14px] font-black uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1">Expenses Group</h2>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-[12px] font-bold text-slate-800 dark:text-white">Active Overview</span>
                </div>
            </div>

            {/* Chart Area */}
            <div className="relative w-full max-w-[200px] aspect-square flex items-center justify-center mt-6">
                {totalPieExpense > 1 ? (
                    <>
                        <svg viewBox="0 0 42 42" className="w-[180px] h-[180px] -rotate-90 drop-shadow-xl overflow-visible">
                            {/* Background Ring */}
                            <circle 
                                r="15.915494309189533" 
                                cx="21" cy="21" 
                                fill="transparent" 
                                stroke="#f1f5f9" 
                                className="dark:stroke-zinc-800/40" 
                                strokeWidth="6.5" 
                            />
                            {/* Dynamic Slices */}
                            {pieSlices}
                        </svg>

                        {/* Center Content */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-30">
                            {hoveredPieSlice !== null ? (
                                <div className="flex flex-col items-center animate-in zoom-in-90 fade-in duration-200">
                                    <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1 shadow-sm" style={{ color: pieData[hoveredPieSlice].color }}>
                                        {pieData[hoveredPieSlice].label}
                                    </span>
                                    <span className="text-[20px] font-black text-slate-800 dark:text-white tracking-tighter">
                                        ₹{(pieData[hoveredPieSlice].value / 1000).toFixed(1)}k
                                    </span>
                                    <div className="mt-1 px-2 py-px rounded-md bg-slate-50 dark:bg-zinc-800/50 border border-slate-100 dark:border-zinc-700/50">
                                        <span className="text-[9px] font-black text-slate-500 dark:text-zinc-400">
                                            {((pieData[hoveredPieSlice].value / totalPieExpense) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center">
                                    <span className="text-[10px] font-black text-slate-400 dark:text-zinc-500 uppercase tracking-widest leading-none mb-1">TOTAL</span>
                                    <span className="text-[22px] font-black text-slate-800 dark:text-zinc-100 tracking-tighter">
                                        ₹{(totalPieExpense / 1000).toFixed(1)}k
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center text-slate-400 opacity-50">
                        <div className="w-16 h-16 rounded-full border-4 border-dashed border-current mb-3 animate-spin duration-3000"></div>
                        <p className="text-[10px] font-black uppercase tracking-widest">Waiting for Data</p>
                    </div>
                )}
            </div>

            {/* Legend indicators */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 w-full max-w-[220px]">
                {pieData.map((slice, i) => (
                    <div key={i} className="flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: slice.color }}></div>
                        <span className="text-[10px] font-bold text-slate-500 dark:text-zinc-400">{slice.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpensePieChart;

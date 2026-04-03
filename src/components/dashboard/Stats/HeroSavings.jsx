import React from 'react';
import { savingsData } from '../../../data/mockData';
import { Plane, Utensils, Car } from 'lucide-react';

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
];

const HeroSavings = () => {
    return (
        <div className="stat-card relative overflow-hidden bg-linear-to-br from-dark-primary to-dark-primary/80 dark:from-dark-primary/80 dark:to-dark-primary/40 rounded-3xl p-7 flex flex-col justify-between shadow-2xl shadow-light-primary/20 dark:shadow-dark-primary/10 group transition-all duration-500 hover:scale-[1.02] h-full w-full">
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
    );
};

export default HeroSavings;

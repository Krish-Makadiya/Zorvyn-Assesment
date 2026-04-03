import React from 'react';
import { TrendingUp, Coins, CreditCard, ArrowUpCircle, ArrowDownCircle, Percent } from 'lucide-react';

const IconMap = {
    Coins: Coins,
    CreditCard: CreditCard,
    Income: ArrowUpCircle,
    Expense: ArrowDownCircle,
    Savings: Percent
};

const StatsCard = ({ stat }) => {
    const StatIcon = IconMap[stat.icon] || Coins;
    
    return (
        <div className="stat-card group relative overflow-hidden bg-white dark:bg-dark-surface rounded-3xl border border-slate-200 dark:border-zinc-800/80 shadow-sm p-6 flex flex-col justify-between transition-colors duration-300 cursor-pointer h-full w-full">
            <div className="flex items-center justify-between mb-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${stat.colorClass || 'text-blue-500 bg-blue-500/10'}`}>
                        <StatIcon size={20} strokeWidth={2.5} />
                    </div>
                    <h3 className="text-[15px] font-semibold text-light-primary-text dark:text-dark-primary-text">
                        {stat.title}
                    </h3>
                </div>
                <div className="flex items-center gap-1 text-[14px] font-bold text-light-primary dark:text-dark-primary bg-light-primary/10 dark:bg-dark-primary/10 px-2 py-1 rounded-full whitespace-nowrap">
                    <span>+{stat.percentage}</span>
                    <TrendingUp size={18} strokeWidth={3} />
                </div>
            </div>

            <div className={`absolute bottom-2 right-2 w-26 h-26 opacity-10 transform translate-x-8 translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700 ease-out pointer-events-none z-0 ${stat.colorClass ? stat.colorClass.split(' ')[0] : 'text-blue-500'}`}>
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
};

export default StatsCard;

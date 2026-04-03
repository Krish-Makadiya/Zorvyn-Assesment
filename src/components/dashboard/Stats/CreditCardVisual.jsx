import React from 'react';

const CreditCardVisual = () => {
    return (
        <div className="stat-card bg-white dark:bg-dark-surface rounded-3xl border border-slate-200 dark:border-zinc-800/80 shadow-sm p-5 flex flex-col transition-colors duration-300 h-full w-full">
            <div className="w-full aspect-[1.58] group perspective-[1000px] cursor-pointer">
                <div className="relative w-full h-full transition-transform duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">

                    {/* Face 1: Back View */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-linear-to-br from-[#29421a] via-[#080b06] to-[#162910] text-white shadow-xl shadow-green-900/10 border border-white/10 backface-hidden transform-[rotateY(180deg)]">
                        <div className="flex justify-between items-start z-10 relative">
                            <svg width="34" height="24" viewBox="0 0 36 26" fill="none" className="text-white/80 mt-0.5 opacity-90">
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
                            <span className="text-[13px] sm:text-sm font-medium tracking-wide text-white/90">Krish Makadiya</span>
                            <div className="flex gap-4 sm:gap-5 text-right">
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-white/60 mb-0.5 uppercase">Valid Thru</span>
                                    <span className="text-xs sm:text-[13px] font-semibold tracking-wider">18/90</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[9px] text-white/60 mb-0.5 uppercase">CVV</span>
                                    <span className="text-xs sm:text-[13px] font-semibold tracking-wider">235</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Face 2: Official Minimalist Front */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl p-6 flex flex-col justify-between overflow-hidden bg-linear-to-tl from-[#193210] via-[#080b06] to-[#12220d] text-white shadow-xl shadow-green-900/10 border border-white/10 backface-hidden">
                        <div className="flex justify-between items-center z-10 relative">
                            <span className="font-bold text-lg tracking-[0.15em] text-emerald-50 opacity-90 uppercase">FinVision</span>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 opacity-80 rotate-90">
                                <path d="M4 12v.01" /><path d="M8 10a4 4 0 0 1 0 4" /><path d="M12 8a8 8 0 0 1 0 8" /><path d="M16 6a12 12 0 0 1 0 12" />
                            </svg>
                        </div>
                        <div className="z-10 relative mt-2">
                            <svg width="40" height="28" viewBox="0 0 36 26" fill="none" className="text-yellow-400/80 drop-shadow-sm">
                                <rect x="1" y="1" width="34" height="24" rx="4" stroke="currentColor" strokeWidth="1.5" />
                                <path d="M10 1V25 M26 1V25 M1 9H10 M26 9H35 M1 17H10 M26 17H35 M10 13H26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <rect x="14" y="6" width="8" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                        <div className="flex justify-between items-end z-10 relative mt-auto">
                            <span className="text-xs font-semibold tracking-widest text-[#7a9d7b] uppercase">Debit</span>
                            <span className="font-bold italic text-4xl tracking-tighter drop-shadow-lg opacity-95">VISA</span>
                        </div>
                    </div>

                </div>
            </div>

            <div className="mt-5 flex-1 flex flex-col gap-3">
                <div className="bg-slate-50 dark:bg-[#151517] p-4 rounded-2xl border border-slate-100 dark:border-zinc-800/80 shadow-sm flex-1 flex flex-col justify-between">
                    <div>
                        <p className="text-[13px] font-medium text-slate-500 dark:text-zinc-400 mb-1">AI Spending Limits</p>
                        <h4 className="text-[22px] font-bold text-light-primary-text dark:text-gray-100 tracking-tight">₹4,815.23</h4>
                    </div>
                    <div className="mt-4 pt-1">
                        <div className="flex gap-1 w-full h-[6px] mb-4">
                            <div className="h-full rounded-full bg-[#ccff00]" style={{ width: '27%' }}></div>
                            <div className="h-full rounded-full bg-[#e3ff66]" style={{ width: '35%' }}></div>
                            <div className="h-full rounded-full bg-[#f4ffb3]" style={{ width: '18%' }}></div>
                            <div className="h-full rounded-full bg-slate-200 dark:bg-white" style={{ width: '20%' }}></div>
                        </div>
                        <div className="grid grid-cols-2 gap-y-2.5">
                            {['Shopping (27%)', 'Subs (35%)', 'Dining (18%)', 'Other (20%)'].map((label, idx) => (
                                <div key={label} className="flex items-center gap-2">
                                    <div className={`w-2.5 h-2.5 rounded-[2px] ${['bg-[#ccff00]', 'bg-[#e3ff66]', 'bg-[#f4ffb3]', 'bg-slate-200 dark:bg-white'][idx]}`}></div>
                                    <span className="text-[11px] text-slate-600 dark:text-zinc-400 font-medium truncate">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditCardVisual;

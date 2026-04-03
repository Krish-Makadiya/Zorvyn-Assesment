import Sidebar from './components/main/Sidebar'
import TransactionStats from './components/dashboard/TransactionStats'
import History from './components/dashboard/History'
import { useStore } from './store/useStore'
import { Share2, FileDown, FileText, ChevronDown, Link, Link2, Link2Icon } from 'lucide-react'
import { useState } from 'react'

const App = () => {
    const { currentRole, paymentHistory, stats } = useStore();
    const [shareOpen, setShareOpen] = useState(false);

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning";
        if (hour < 17) return "Good Afternoon";
        return "Good Evening";
    }

    const downloadCSV = () => {
        const headers = ["ID", "Amount", "To", "Period", "Method", "Status"];
        const rows = paymentHistory.map(p => [
            p.id, p.amount, p.to, p.period, p.method, p.status
        ]);

        let csvContent = "data:text/csv;charset=utf-8,"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `FinVision_Report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        setExportOpen(false);
    };

    const handlePrintPDF = () => {
        window.print();
        setExportOpen(false);
    };
    return (
        <div className="flex flex-col lg:flex-row bg-light-bg dark:bg-dark-bg text-light-primary-text dark:text-dark-primary-text min-h-screen transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 flex flex-col gap-10 overflow-y-auto p-4 lg:p-6 xl:p-8">
                {/* Greetings & Share Header */}
                <div className="greeting-header flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-black text-light-primary-text dark:text-dark-primary-text tracking-tight animate-in slide-in-from-left duration-500">
                            {getGreeting()}, <span className="text-light-primary dark:text-dark-primary">Krish! </span>
                        </h1>
                        <p className="text-sm font-medium text-light-secondary-text dark:text-dark-secondary-text mt-1">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                        </p>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShareOpen(!shareOpen)}
                            className="flex items-center gap-2.5 bg-light-surface dark:bg-dark-surface border border-slate-200 dark:border-zinc-800 px-5 py-3 rounded-2xl text-sm font-bold shadow-sm hover:shadow-md hover:border-light-primary/30 dark:hover:border-dark-primary/30 transition-all active:scale-95 group text-slate-700 dark:text-zinc-200"
                        >
                            <Share2 size={18} className="text-light-primary dark:text-dark-primary group-hover:rotate-12 transition-transform" />
                            <span>Share Dashboard</span>
                        </button>

                        {/* Share & Connect Modal */}
                        {shareOpen && (
                            <div className="absolute right-0 mt-3 w-[320px] bg-white/80 dark:bg-[#1a1b1e]/80 backdrop-blur-2xl border border-slate-200 dark:border-zinc-800 rounded-[28px] shadow-2xl z-60 overflow-hidden animate-in zoom-in-95 slide-in-from-top-4 duration-300 p-6 origin-top-right">
                                <div className="flex flex-col gap-5">
                                    <div>
                                        <h3 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest mb-1">Spread the Word</h3>
                                        <p className="text-[11px] text-slate-500 font-medium">Link your financial journey with others</p>
                                    </div>

                                    {/* Copy Link Section */}
                                    <div className="flex items-center gap-2 bg-slate-50 dark:bg-zinc-900/50 p-2 rounded-2xl border border-slate-100 dark:border-zinc-800">
                                        <input
                                            readOnly
                                            value={window.location.href}
                                            className="flex-1 bg-transparent text-[12px] text-slate-500 dark:text-zinc-400 font-medium px-2 outline-none truncate"
                                        />
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(window.location.href);
                                                // Quick feedback could go here
                                            }}
                                            className="bg-light-primary dark:bg-dark-primary text-white dark:text-black px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider hover:opacity-90 active:scale-95 transition-all"
                                        >
                                            Copy
                                        </button>
                                    </div>

                                    {/* Social Connect Hub */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <a
                                            href={`https://api.whatsapp.com/send?text=Check out my FinVision Dashboard! ${window.location.href}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-emerald-500/10 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shadow-sm">
                                                <Link/>
                                            </div>
                                            <span className="text-[10px] font-bold dark:text-zinc-400">WhatsApp</span>
                                        </a>
                                        <a
                                            href={`https://twitter.com/intent/tweet?text=Analysing my stats on FinVision!&url=${window.location.href}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-sky-500/10 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-sky-500/10 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform shadow-sm">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.451-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"></path>
                                                </svg>
                                            </div>
                                            <span className="text-[10px] font-bold dark:text-zinc-400">X / Twitter</span>
                                        </a>
                                        <a
                                            href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-blue-600/10 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-sm">
                                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                                                </svg>
                                            </div>
                                            <span className="text-[10px] font-bold dark:text-zinc-400">LinkedIn</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <TransactionStats />
                <History />
            </main>
        </div>
    )
}

export default App
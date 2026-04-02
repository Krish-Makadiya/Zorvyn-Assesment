import { LayoutDashboard, Shield, Eye } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";
import { useStore } from "../../store/useStore";

const Sidebar = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    
    // Global Zustand State for RBAC
    const { currentRole, toggleRole } = useStore();

    return (
        <aside className="w-24 min-w-20 m-2 rounded-2xl flex flex-col bg-light-surface dark:bg-dark-bg z-50 transition-colors duration-300">
            {/* Top Logo */}
            <div className="flex h-20 items-center justify-center">
                <img
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                    src={theme ? "/logo-dark.png" : "/logo-light.png"}
                    alt="Logo"
                    height={36}
                    width={36}
                />
            </div>

            <hr className="w-10 mx-auto border-slate-200 dark:border-zinc-700 mt-2 mb-6" />

            {/* Nav Icons */}
            <nav className="flex-1 flex flex-col items-center gap-4 px-3">
                
                {/* 1. Dashboard Tab */}
                <div 
                    title="Dashboard"
                    onClick={() => navigate("/")}
                    className={`cursor-pointer w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative group
                        ${location.pathname === "/" 
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 dark:bg-emerald-500/20' 
                            : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-zinc-800'
                    }`}
                >
                    {location.pathname === "/" && (
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-emerald-500 rounded-r-md transition-all duration-300"></div>
                    )}
                    <LayoutDashboard size={24} className={`transition-colors ${location.pathname === "/" ? "" : "group-hover:text-emerald-500"}`} />
                </div>

                {/* 2. Change Role Button */}
                <div 
                    title={`Change Role (Current: ${currentRole})`}
                    onClick={toggleRole}
                    className="cursor-pointer mt-auto w-12 h-12 flex items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-zinc-800 transition-all duration-300 group relative"
                >
                    {currentRole === 'Admin' ? (
                        <Shield className="group-hover:text-indigo-500 dark:group-hover:text-indigo-400" size={24} />
                    ) : (
                        <Eye className="group-hover:text-indigo-500 dark:group-hover:text-indigo-400" size={24} />
                    )}
                </div>
            </nav>

            <hr className="w-10 mx-auto border-slate-200 dark:border-zinc-700 mt-6 mb-4" />

            {/* Bottom Profile */}
             <div className="flex justify-center pb-6">
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-slate-700 dark:text-zinc-200 cursor-pointer hover:ring-2 hover:ring-emerald-500 transition-all">
                    K
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;


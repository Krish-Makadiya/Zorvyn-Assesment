import { LayoutDashboard, Shield, Eye, Moon, Sun } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";
import { useStore } from "../../store/useStore";

const Sidebar = () => {
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const { currentRole, toggleRole } = useStore();

    return (
        <aside className="sidebar-nav w-[calc(100%-1rem)] lg:w-20 h-16 lg:h-[calc(100vh-1rem)] m-2 rounded-xl lg:rounded-2xl flex flex-row lg:flex-col bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-xl z-50 transition-all duration-300 border border-light-bg dark:border-dark-bg shadow-sm sticky top-2 lg:top-2 lg:sticky self-start">
            {/* Logo Section */}
            <div className="flex h-full lg:h-20 items-center justify-center px-4 lg:px-0">
                <img
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                    src={!theme ? "/logo-dark-bnw.png" : "/logo-light-bnw.png"}
                    alt="Logo"
                    height={36}
                    width={36}
                />
            </div>

            <hr className="hidden lg:block w-10 mx-auto border-dark-bg/50 dark:border-light-bg/50 mt-2 mb-6" />

            {/* Nav Icons */}
            <nav className="flex-1 flex flex-row lg:flex-col items-center justify-center lg:justify-start gap-4 lg:gap-4 px-3">

                {/* 1. Dashboard Tab */}
                <div
                    title="Dashboard"
                    onClick={() => navigate("/")}
                    className={`cursor-pointer w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative group
                        ${location.pathname === "/"
                            ? 'bg-light-primary/20 text-light-primary dark:text-dark-primary dark:bg-dark-primary/20'
                            : 'text-light-secondary-text hover:bg-light-bg dark:text-dark-secondary-text dark:hover:bg-dark-bg'
                        }`}
                >
                    <LayoutDashboard
                        size={24}
                        className="transition-colors duration-300"
                    />
                </div>

                {/* Bottom icons (Push to bottom on desktop) */}
                <div className="lg:mt-auto flex flex-row lg:flex-col items-center gap-4">
                    {/* 2. Theme Toggle Button */}
                    <div
                        title={`Switch to ${theme ? 'Light' : 'Dark'} Mode`}
                        onClick={() => setTheme(!theme)}
                        className="cursor-pointer w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl text-light-secondary-text hover:bg-light-bg dark:text-dark-secondary-text dark:hover:bg-dark-bg transition-all duration-300 group"
                    >
                        {theme ? (
                            <Sun className="group-hover:text-orange-400 transition-colors" size={24} />
                        ) : (
                            <Moon className="group-hover:text-light-primary transition-colors" size={24} />
                        )}
                    </div>

                    {/* 3. Change Role Button */}
                    <div className="flex flex-col items-center">
                        <div
                            title={`Change Role (Current: ${currentRole})`}
                            onClick={toggleRole}
                            className="cursor-pointer w-10 h-10 lg:w-12 lg:h-12 flex items-center justify-center rounded-xl text-light-secondary-text hover:bg-light-bg dark:text-dark-secondary-text dark:hover:bg-dark-bg transition-all duration-300 group"
                        >
                            {currentRole === 'Admin' ? (
                                <Shield className="group-hover:text-light-secondary dark:group-hover:text-dark-secondary" size={24} />
                            ) : (
                                <Eye className="group-hover:text-light-secondary dark:group-hover:text-dark-secondary" size={24} />
                            )}

                        </div>
                        {/* Role Label */}
                        <div className={`hidden lg:block px-1.5 py-0.5 rounded-md text-[12px] font-black tracking-tighter uppercase transition-colors duration-300 ${currentRole === 'Admin' ? 'bg-indigo-500/10 text-indigo-500' : 'bg-slate-500/10 text-slate-500'}`}>
                            {currentRole}
                        </div>
                    </div>
                </div>
            </nav>

            <hr className="hidden lg:block w-10 mx-auto border-dark-bg/50 dark:border-light-bg/50 mt-8 mb-6" />

            {/* Profile Section */}
            <div className="flex flex-col items-center px-4 lg:pb-6 lg:px-0 gap-1.5">
                <div className="w-10 h-10 rounded-full bg-light-primary/10 dark:bg-dark-primary/10 border-2 border-white dark:border-zinc-800 flex items-center justify-center font-bold text-light-primary dark:text-dark-primary shadow-sm cursor-pointer hover:scale-105 transition-all">
                    K
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

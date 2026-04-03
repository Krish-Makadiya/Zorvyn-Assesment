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
        <aside className="w-[calc(100%-1rem)] md:w-24 h-16 md:h-[calc(100vh-1rem)] m-2 rounded-xl md:rounded-2xl flex flex-row md:flex-col bg-light-surface dark:bg-dark-surface z-50 transition-all duration-300 border border-light-bg dark:border-dark-bg shadow-sm">
            {/* Logo */}
            <div className="flex h-full md:h-20 items-center justify-center px-4 md:px-0">
                <img
                    className="cursor-pointer"
                    onClick={() => navigate("/")}
                    src={theme ? "/logo-dark.png" : "/logo-light.png"}
                    alt="Logo"
                    height={36}
                    width={36}
                />
            </div>

            <hr className="hidden md:block w-10 mx-auto border-light-bg dark:border-dark-bg mt-2 mb-6" />

            {/* Nav Icons */}
            <nav className="flex-1 flex flex-row md:flex-col items-center justify-center md:justify-start gap-4 md:gap-4 px-3">

                {/* 1. Dashboard Tab */}
                <div
                    title="Dashboard"
                    onClick={() => navigate("/")}
                    className={`cursor-pointer w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative group
                        ${location.pathname === "/"
                            ? 'bg-light-primary/10 text-light-primary dark:text-dark-primary dark:bg-dark-primary/10'
                            : 'text-light-secondary-text hover:bg-light-bg dark:text-dark-secondary-text dark:hover:bg-dark-bg'
                        }`}
                >
                    {/* Professional Minimalist Indicator */}
                    {location.pathname === "/" && (
                        <div className="absolute left-1/2 -translate-x-1/2 -bottom-2 md:-left-3 md:top-1/2 md:-translate-y-1/2 w-8 h-1 md:w-1.5 md:h-8 bg-light-primary dark:bg-dark-primary rounded-full transition-all duration-300"></div>
                    )}

                    <LayoutDashboard 
                        size={24} 
                        className="transition-colors duration-300"
                    />
                </div>

                {/* Bottom icons (Push to bottom on desktop) */}
                <div className="md:mt-auto flex flex-row md:flex-col items-center gap-4">
                    {/* 2. Theme Toggle Button */}
                    <div
                        title={`Switch to ${theme ? 'Light' : 'Dark'} Mode`}
                        onClick={() => setTheme(!theme)}
                        className="cursor-pointer w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-light-secondary-text hover:bg-light-bg dark:text-dark-secondary-text dark:hover:bg-dark-bg transition-all duration-300 group"
                    >
                        {theme ? (
                            <Sun className="group-hover:text-orange-400 transition-colors" size={24} />
                        ) : (
                            <Moon className="group-hover:text-light-primary transition-colors" size={24} />
                        )}
                    </div>

                    {/* 3. Change Role Button */}
                    <div
                        title={`Change Role (Current: ${currentRole})`}
                        onClick={toggleRole}
                        className="cursor-pointer w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl text-light-secondary-text hover:bg-light-bg dark:text-dark-secondary-text dark:hover:bg-dark-bg transition-all duration-300 group"
                    >
                        {currentRole === 'Admin' ? (
                            <Shield className="group-hover:text-light-secondary dark:group-hover:text-dark-secondary" size={24} />
                        ) : (
                            <Eye className="group-hover:text-light-secondary dark:group-hover:text-dark-secondary" size={24} />
                        )}
                    </div>
                </div>
            </nav>

            <hr className="hidden md:block w-10 mx-auto border-light-bg dark:border-dark-bg mt-6 mb-4" />

            {/* Profile */}
            <div className="flex items-center px-4 md:justify-center md:pb-6 md:px-0">
                <div className="w-10 h-10 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center font-bold text-light-primary-text dark:text-dark-primary-text cursor-pointer hover:ring-2 hover:ring-light-primary dark:hover:ring-dark-primary transition-all">
                    K
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

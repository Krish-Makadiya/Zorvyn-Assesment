import { LayoutDashboard, Shield, Eye } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../../context/ThemeProvider";
import { useStore } from "../../store/useStore";

const Sidebar = () => {
    const { theme } = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const { currentRole, toggleRole } = useStore();

    return (
        <aside className="w-24 min-w-20 m-2 rounded-2xl flex flex-col bg-light-surface dark:bg-dark-surface z-50 transition-colors duration-300 border border-light-bg dark:border-dark-bg shadow-sm">
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

            <hr className="w-10 mx-auto border-light-bg dark:border-dark-bg mt-2 mb-6" />

            {/* Nav Icons */}
            <nav className="flex-1 flex flex-col items-center gap-4 px-3">

                {/* 1. Dashboard Tab */}
                <div
                    title="Dashboard"
                    onClick={() => navigate("/")}
                    className={`cursor-pointer w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300 relative group
                        ${location.pathname === "/"
                            ? 'bg-light-primary/10 text-light-primary dark:text-dark-primary dark:bg-dark-primary/10'
                            : 'text-light-secondary-text hover:bg-light-bg dark:text-dark-secondary-text dark:hover:bg-dark-bg'
                        }`}
                >
                    {location.pathname === "/" && (
                        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-light-primary dark:bg-dark-primary rounded-r-md transition-all duration-300"></div>
                    )}
                    <LayoutDashboard size={24} className={`transition-colors ${location.pathname === "/" ? "" : "group-hover:text-light-primary dark:group-hover:text-dark-primary"}`} />
                </div>

                {/* 2. Change Role Button */}
                <div
                    title={`Change Role (Current: ${currentRole})`}
                    onClick={toggleRole}
                    className="cursor-pointer mt-auto w-12 h-12 flex items-center justify-center rounded-xl text-light-secondary-text hover:bg-light-bg dark:text-dark-secondary-text dark:hover:bg-dark-bg transition-all duration-300 group relative"
                >
                    {currentRole === 'Admin' ? (
                        <Shield className="group-hover:text-light-secondary dark:group-hover:text-dark-secondary" size={24} />
                    ) : (
                        <Eye className="group-hover:text-light-secondary dark:group-hover:text-dark-secondary" size={24} />
                    )}
                </div>
            </nav>

            <hr className="w-10 mx-auto border-light-bg dark:border-dark-bg mt-6 mb-4" />

            {/* Bottom Profile */}
            <div className="flex justify-center pb-6">
                <div className="w-10 h-10 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center font-bold text-light-primary-text dark:text-dark-primary-text cursor-pointer hover:ring-2 hover:ring-light-primary dark:hover:ring-dark-primary transition-all">
                    K
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;

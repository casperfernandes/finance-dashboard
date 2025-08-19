import { CreditCard, TrendingUp, X } from "lucide-react";

import { useUiStore } from "../../stores/uiStore";
import { ViewPage } from "../../types";

const NavItems = [
    { id: ViewPage.DASHBOARD, label: 'Dashboard', icon: TrendingUp },
    { id: ViewPage.EXPENSES, label: 'Expenses', icon: CreditCard },
    { id: ViewPage.CATEGORIES, label: 'Categories', icon: CreditCard },
];

export const Navbar = () => {
    const { currentPage, isNavbarOpen, setIsNavbarOpen, setCurrentPage } = useUiStore();

    return (
        <>
            <aside className="hidden lg:block w-64 bg-white shadow-lg min-h-screen">
                <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8">Finance Tracker</h1>

                    <nav className="space-y-2">
                        {NavItems.map(item => {
                            const Icon = item.icon;
                            return (
                                <button
                                    key={item.id}
                                    onClick={() => setCurrentPage(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${currentPage === item.id
                                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                                        : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isNavbarOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div className="fixed inset-0 bg-gray-400/60" onClick={() => setIsNavbarOpen(false)} />

                    <aside className="relative bg-white w-full shadow-lg">
                        <header className="p-4 flex items-center justify-between border-b">
                            <h1 className="text-2xl font-bold">Finance Tracker</h1>

                            <button onClick={() => setIsNavbarOpen(false)}>
                                <X className="w-6 h-6" />
                            </button>
                        </header>

                        <nav className="p-4 space-y-2">
                            {NavItems.map(item => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => {
                                            setCurrentPage(item.id);
                                            setIsNavbarOpen(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg ${currentPage === item.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </button>
                                );
                            })}
                        </nav>
                    </aside>
                </div>
            )}
        </>
    );
};

export default Navbar;

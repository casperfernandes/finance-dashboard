import { Menu } from "lucide-react";

import { useUiStore } from "../../stores/uiStore";

export const MobileHeader = () => {
    const { setIsNavbarOpen } = useUiStore();

    return (
        <header className="lg:hidden bg-white shadow-sm border-b p-4 flex items-center justify-between">
            <button
                onClick={() => setIsNavbarOpen(true)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Open navigation menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            <h1 className="text-2xl font-bold text-gray-900">Finance Tracker</h1>

            <div />
        </header>
    );
};

export default MobileHeader;

import { X } from "lucide-react";
import type { ReactNode } from "react";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock";

export const ModalHeader = ({ title, onClose }: { title: string; onClose: () => void }) => {
    return (
        <header className="flex-shrink-0 bg-white p-4 border-b border-gray-200 md:p-6">
            <div className="flex items-center justify-between">
                <h3 id="expense-modal-title" className="text-xl font-semibold">
                    {title}
                </h3>

                <button onClick={onClose} aria-label="Close add expense modal">
                    <X className="w-6 h-6 text-gray-400 hover:text-gray-600" />
                </button>
            </div>
        </header>
    );
};

export const ModalBody = ({ children }: { children: ReactNode }) => (
    <div className="flex-1 overflow-hidden flex flex-col min-h-0 bg-white">
        {children}
    </div>
);

export const ModalActions = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex-shrink-0 bg-white p-4 border-t border-gray-200 md:p-6"
            style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}>
            <div className="flex flex-col gap-3 md:flex-row">
                {children}
            </div>
        </div>
    );
};

export const Modal = ({ children }: { children: ReactNode }) => {
    // Prevent body scroll when modal is open
    useBodyScrollLock(true);

    return (
        <div
            className="fixed inset-0 bg-gray-400/60 modal-backdrop flex items-end md:items-center justify-center z-50 overflow-hidden md:p-4"
            role="dialog"
        >
            <div className="bg-white w-full max-h-[80vh] md:h-auto md:max-h-[85vh] md:max-w-md 
                       rounded-t-3xl md:rounded-xl shadow-xl flex flex-col overflow-hidden"
            >
                {children}
            </div>
        </div>
    );
};

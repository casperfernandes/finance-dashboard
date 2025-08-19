import { create } from "zustand";

import { ViewPage, type ViewPageType } from "../types";

interface UiState {
    currentPage: ViewPageType;
    isNavbarOpen: boolean;
    setBudgetModal: { isOpen: boolean };
    addEditExpenseModal: { isOpen: boolean, data?: { expenseId: string } };
    categoryModal: { isOpen: boolean, data?: { categoryId: string } };
    testExpensesModal: { isOpen: boolean };

    setCurrentPage: (page: ViewPageType) => void;
    setIsNavbarOpen: (isOpen: boolean) => void;
    setSetBudgetModal: (isOpen: boolean) => void;
    setAddEditExpenseModal: (isOpen: boolean, data?: { expenseId: string }) => void;
    setCategoryModal: (isOpen: boolean, data?: { categoryId: string }) => void;
    setTestExpensesModal: (isOpen: boolean) => void;
}

export const useUiStore = create<UiState>((set) => ({
    currentPage: ViewPage.DASHBOARD,
    isNavbarOpen: false,
    setBudgetModal: { isOpen: false },
    addEditExpenseModal: { isOpen: false },
    categoryModal: { isOpen: false },
    testExpensesModal: { isOpen: false },

    setCurrentPage: (page) => set({ currentPage: page }),
    setIsNavbarOpen: (isOpen) => set({ isNavbarOpen: isOpen }),
    setSetBudgetModal: (isOpen) => set({ setBudgetModal: { isOpen } }),
    setAddEditExpenseModal: (isOpen, data) => set({ addEditExpenseModal: { isOpen, data } }),
    setCategoryModal: (isOpen, data) => set({ categoryModal: { isOpen, data } }),
    setTestExpensesModal: (isOpen) => set({ testExpensesModal: { isOpen } }),
}));

import { useUiStore } from "../../../stores/uiStore";

import AddExpenseModal from "./addExpenseModal";
import SetBudgetModal from "./setBudgetModal";
import TestExpensesModal from "./testExpensesModal";

const GlobalModals = () => {
    const { testExpensesModal, setBudgetModal, addEditExpenseModal } = useUiStore();

    if (testExpensesModal.isOpen) {
        return (
            <TestExpensesModal />
        );
    }

    if (setBudgetModal.isOpen) {
        return (
            <SetBudgetModal />
        );
    }

    if (addEditExpenseModal.isOpen) {
        return (
            <AddExpenseModal
                {...(addEditExpenseModal.data ?? {})}
            />
        );
    }

    return null;
};

export default GlobalModals;

import { useQueryClient } from "@tanstack/react-query";

import { expenseService } from "../../../services/expenseService";
import { useUiStore } from "../../../stores/uiStore";

import { Modal, ModalActions, ModalBody, ModalHeader } from "./Modal";


const TestExpensesModal = () => {
    const { setTestExpensesModal } = useUiStore();

    const queryClient = useQueryClient();

    const handleClose = () => {
        setTestExpensesModal(false);
    };
    const handleSetTestExpenses = () => {
        expenseService.setTextExpenses();
        queryClient.clear();
        handleClose();
    };

    return (
        <Modal>
            <ModalHeader title="Set Test Expenses" onClose={handleClose} />

            <ModalBody>
                <div className="flex flex-col h-full min-h-0">
                    <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0 p-4 space-y-6 md:p-6">
                        <p>
                            For the purpose of viewing and testing, do you want to set test expenses?
                        </p>
                        <p>
                            You can get this option again by not adding any expenses or clearing your local storage, and refreshing the page.
                        </p>
                    </div>

                    <ModalActions>
                        <button
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                            onClick={handleSetTestExpenses}
                        >
                            Set
                        </button>

                        <button
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            onClick={handleClose}
                        >
                            Cancel
                        </button>
                    </ModalActions>
                </div>

            </ModalBody>

        </Modal>
    );
};

export default TestExpensesModal;

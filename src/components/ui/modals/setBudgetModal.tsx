import { DollarSign } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";

import { useSetBudget } from "../../../hooks/budget";
import { useUiStore } from "../../../stores/uiStore";

import { Modal, ModalActions, ModalBody, ModalHeader } from "./Modal";

const SetBudgetModal = () => {
    const [monthlyBudget, setMonthlyBudget] = useState<number>(0);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { setSetBudgetModal } = useUiStore();
    const saveBudget = useSetBudget();

    const handleSetMonthlyBudget = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        // Regular expression to allow numbers, optional decimal point, and up to two decimal places
        const regex = /^\d*\.?\d{0,2}$/;

        if (regex.test(value) || value === '') {
            setMonthlyBudget(parseFloat(value));
        }
    };

    const handleSaveBudget = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();

            setIsSaving(true);
            await saveBudget.mutateAsync(monthlyBudget);
            setSetBudgetModal(false);
        } catch (error) {
            console.error("Error saving budget:", error);
            setIsSaving(false);
        }
    };

    return (
        <Modal>
            <ModalHeader title="Set Monthly Budget" onClose={() => setSetBudgetModal(false)} />

            <ModalBody>
                <form onSubmit={handleSaveBudget} className="flex flex-col h-full min-h-0">
                    <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
                        <div className="p-4 space-y-6 md:p-6">
                            <section>
                                <div className="text-center mb-6">
                                    <div className="bg-blue-50 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                        <DollarSign className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-gray-900">How much do you plan to spend this month?</h4>
                                    <p className="text-sm text-gray-600 mt-1">This helps you track your spending and stay on track</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="monthly-budget" className="block text-sm font-medium text-gray-700 mb-2">
                                            Monthly Budget ($)
                                        </label>
                                        <input
                                            id="monthly-budget"
                                            value={monthlyBudget}
                                            onChange={handleSetMonthlyBudget}
                                            type="number"
                                            min="1"
                                            step="any"
                                            placeholder="1500.00"
                                            className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Preset amount buttons */}
                                    <div className="grid grid-cols-3 gap-2">
                                        {[1000, 1500, 2000].map(amount => (
                                            <button
                                                type="button"
                                                key={amount}
                                                onClick={() => setMonthlyBudget(amount)}
                                                className="py-2 px-4 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                            >
                                                ${amount}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </section>

                            {/* Pro Tip section */}
                            <section className="bg-gray-50 p-4 rounded-lg">
                                <h5 className="text-sm font-medium text-gray-700 mb-2">💡 Pro Tip</h5>
                                <p className="text-sm text-gray-600">After setting your budget, you can break it down by category for better tracking!</p>
                            </section>
                        </div>

                    </div>

                    <ModalActions>
                        <button
                            onClick={() => setSetBudgetModal(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                            disabled={isSaving}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                            disabled={isSaving}
                        >
                            Set Budget
                        </button>
                    </ModalActions>
                </form>
            </ModalBody>
        </Modal>
    );
};

export default SetBudgetModal;

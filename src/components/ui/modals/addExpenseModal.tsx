import { useEffect, useState, type ChangeEvent, type FormEvent, } from "react";

import { useCategories } from "../../../hooks/category";
import { useAddExpense, useGetExpense, useUpdateExpense } from "../../../hooks/expense";
import { useUiStore } from "../../../stores/uiStore";
import type { ICreateUpdateExpense } from "../../../types";

import Loader from "../../layout/loader";
import { Modal, ModalActions, ModalBody, ModalHeader } from "./Modal";

interface IAddExpenseModalProps {
    expenseId?: string
}

const AddExpenseModal = (props: IAddExpenseModalProps) => {
    const { expenseId } = props;

    const [expenseDate, setExpenseDate] = useState<string>('');
    const [expenseDescription, setExpenseDescription] = useState<string>('');
    const [expenseCategory, setExpenseCategory] = useState<string>('');
    const [expenseAmount, setExpenseAmount] = useState<number>(0);
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { setAddEditExpenseModal } = useUiStore();
    const { data: fetchedExpense, isLoading: isFetchingExpense } = useGetExpense({ expenseId });
    const { data: categories, isLoading: isFetchingCategories } = useCategories();
    const addExpense = useAddExpense();
    const updateExpense = useUpdateExpense();

    const handleCloseModal = () => {
        setAddEditExpenseModal(false);
    };

    const handleSetExpenseAmount = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        // Regular expression to allow numbers, optional decimal point, and up to two decimal places
        const regex = /^\d*\.?\d{0,2}$/;
        if (value === '' || regex.test(value)) {
            setExpenseAmount(value === '' ? 0 : parseFloat(value));
        }
    };

    const handleSave = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setIsSaving(true);

            const expense: ICreateUpdateExpense = {
                date: expenseDate,
                description: expenseDescription,
                categoryId: expenseCategory,
                amount: expenseAmount
            };

            if (expenseId) {
                await updateExpense.mutateAsync({ id: expenseId, expense })
            } else {
                await addExpense.mutateAsync({ expense })
            }

            handleCloseModal();
        } catch (error) {
            console.error("Error saving expense:", error);
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (fetchedExpense) {
            // set data for the case of edit expense
            setExpenseDate(fetchedExpense.date);
            setExpenseDescription(fetchedExpense.description);
            setExpenseCategory(fetchedExpense.categoryId);
            setExpenseAmount(fetchedExpense.amount);
        }
    }, [fetchedExpense]);

    const isLoading = isFetchingExpense || isFetchingCategories;

    return (
        <Modal>
            <ModalHeader title={expenseId ? 'Edit Expense' : 'Add Expense'} onClose={handleCloseModal} />

            <ModalBody>
                {isLoading ? (
                    <Loader />
                ) : (
                    <form onSubmit={handleSave} className="flex flex-col h-full min-h-0">
                        <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
                            <div className="p-4 space-y-6 md:p-6 pb-8">
                                <section className=" flex flex-col gap-6">
                                    <div>
                                        <label htmlFor="expense-date" className="block text-sm font-medium text-gray-700 mb-2">
                                            Date <span className="text-blue-600">*</span>
                                        </label>
                                        <input
                                            id="expense-date"
                                            type="date"
                                            value={expenseDate}
                                            onChange={event => setExpenseDate(event.target.value)}
                                            max={new Date().toISOString().split('T')[0]}
                                            className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    {/* Description Field */}
                                    <div>
                                        <label
                                            htmlFor="expense-description"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Description <span className="text-blue-600">*</span>
                                        </label>
                                        <input
                                            id="expense-description"
                                            type="text"
                                            value={expenseDescription}
                                            onChange={(event) => {
                                                setExpenseDescription(event.target.value);
                                            }}
                                            maxLength={50}
                                            placeholder="e.g., Grocery shopping, Gas station..."
                                            className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="expense-category"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Category <span className="text-blue-600">*</span>
                                        </label>
                                        <select
                                            id="expense-category"
                                            required
                                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                                            value={expenseCategory}
                                            onChange={(event) => setExpenseCategory(event.target.value)}
                                        >
                                            <option value="">Select a category</option>
                                            {categories?.map(category => {
                                                return (
                                                    <option key={category.id} value={category.id}>
                                                        {category.name}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="expense-amount"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Amount <span className="text-blue-600">*</span>
                                        </label>
                                        <input
                                            id="expense-amount"
                                            type="number"
                                            value={expenseAmount}
                                            onChange={handleSetExpenseAmount}
                                            placeholder="0.00"
                                            className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </section>

                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h5 className="text-sm font-medium text-blue-800 mb-2">💡 Quick Tips</h5>
                                    <ul className="text-xs text-blue-700 space-y-1">
                                        <li>• All fields marked with * are required</li>
                                        <li>• Use a short, clear description (max 50 characters)</li>
                                        <li>• Select the most appropriate category</li>
                                        <li>• Double-check the amount before saving</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <ModalActions>
                            <button
                                type="button"
                                onClick={handleCloseModal}
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
                                Save
                            </button>
                        </ModalActions>
                    </form>
                )}
            </ModalBody>
        </Modal>
    );
};

export default AddExpenseModal;

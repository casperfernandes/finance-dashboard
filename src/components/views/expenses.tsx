import { Calendar, Edit2, PlusCircle } from "lucide-react";
import { useState } from "react";

import { useGetCategoriesById } from "../../hooks/category";
import { useExpenses } from "../../hooks/expense";
import { useUiStore } from "../../stores/uiStore";
import type { ICategory } from "../../types";

// import AddExpenseModal from "../ui/modals/addExpenseModal";
import Table from "../ui/tables/table";

const columns = [
    {
        key: 'date',
        label: 'Date',
        customRowComponent: ({ data }: { data: any }) => <>{new Date(data.date).toLocaleDateString()}</>
    },
    {
        key: 'description',
        label: 'Description',
        customRowComponent: ({ data }: { data: any }) => <>{data.description}</>
    },
    {
        key: 'category',
        label: 'Category',
        customRowComponent: ({ data, categoriesById }: { data: any, categoriesById: { [key: string]: ICategory } }) => <>{categoriesById?.[data.categoryId]?.name || ''}</>
    },
    {
        key: 'amount',
        label: 'Amount',
        customRowComponent: ({ data }: { data: any }) => <>${data.amount}</>
    },
    {
        key: 'actions',
        label: 'Actions',
        customRowComponent: (props: any) => {
            const { data, handleEditExpense } = props;

            return (
                <div className="flex space-x-2">
                    <button
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        onClick={() => handleEditExpense(data.id)}
                        aria-label="Edit Expense"
                    >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                    </button>
                </div>
            );
        }
    }
];


const Expenses = () => {
    const [monthFilter, setMonthFilter] = useState<string>('');

    const { setAddEditExpenseModal } = useUiStore();

    const {
        data: expensesData,
        isLoading: isExpensesLoading,
    } = useExpenses({ filters: { month: monthFilter } });

    const {
        data: categoriesById,
        isLoading: isCategoriesLoading,
    } = useGetCategoriesById();

    const handleEditExpense = (expenseId: string) => {
        setAddEditExpenseModal(true, { expenseId });
    };

    const isLoading = isExpensesLoading || isCategoriesLoading;

    return (
        <section className="p-4 lg:p-8 w-full overflow-x-hidden">
            {/* {setAddEditExpenseModal.isOpen ? (
                <AddExpenseModal
                    {...editExpenseModal?.data || {}}
                />
            ) : null} */}

            {/* Mobile Header */}
            <header className="lg:hidden mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Expenses</h2>

                    <button
                        onClick={() => setAddEditExpenseModal(true)}
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                    >
                        <PlusCircle className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Desktop Header */}
            <header className="hidden lg:flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Expenses</h2>
                </div>

                <button
                    onClick={() => setAddEditExpenseModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Add Expense</span>
                </button>
            </header>

            {/* Filters section */}
            <section className="w-full bg-white mb-6 shadow rounded-sm overflow-hidden">
                <div className="w-full px-4 sm:px-6 lg:px-8 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Month Filter */}
                        <div className="relative w-full">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="month"
                                value={monthFilter}
                                onChange={(e) => setMonthFilter(e.target.value)}
                                min="2025-01"
                                max={new Date().toISOString().slice(0, 7)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <main className="w-full lg:max-w-7xl lg:mx-auto pb-6">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <span className="text-gray-500">Loading...</span>
                    </div>
                ) : (
                    <Table
                        data={expensesData as Record<string, any>[]}
                        columns={columns}
                        rowProps={{ handleEditExpense, categoriesById }}
                    />
                )}
            </main>
        </section >
    );
};

export default Expenses;

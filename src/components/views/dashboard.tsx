import { BanknoteArrowDown, PlusCircle } from "lucide-react";
import { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { useDashboardAnalytics } from "../../hooks/analytics";
import { useUiStore } from "../../stores/uiStore";
import { ViewPage } from "../../types";
import Loader from "../layout/loader";

const Dashboard = () => {
    const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const { setCurrentPage, setSetBudgetModal, setAddEditExpenseModal } = useUiStore();

    const {
        data: {
            currentMonthBudget,
            currentMonthExpense,
            currentDayExpense,
            currentDayExpenseLimit,
            currentDayExpensePercent,
            recentExpenses,
            categoryExpenseData,
        },
        isLoading,
    } = useDashboardAnalytics({ selectedDate });

    return (
        <div className="p-4 lg:p-8">
            {/* Mobile Header */}
            <header className="lg:hidden mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>

                    <button
                        onClick={() => setAddEditExpenseModal(true)}
                        title="Add Expense"
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                    >
                        <PlusCircle className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Desktop Header */}
            <header className="hidden lg:flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Dashboard</h2>
                    <p className="text-gray-600">Track your expenses and manage your budget</p>
                </div>

                {/* Date Picker */}
                <input
                    id="expense-date"
                    type="month"
                    value={selectedDate}
                    onChange={event => setSelectedDate(event.target.value)}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />

                <button
                    onClick={() => setAddEditExpenseModal(true)}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Add Expense</span>
                </button>
            </header>


            <main>
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {!currentMonthBudget ? (
                            // Set Budget Banner
                            <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-xl mb-8">
                                <div className="flex flex-col md:flex-row items-center justify-between">
                                    <div className="mb-4 md:mb-0">
                                        <h3 className="text-xl font-bold mb-2">🎯 Set Your Monthly Budget</h3>

                                        <p className="opacity-90">Track your spending and reach your financial goals!</p>
                                    </div>

                                    <div className="flex space-x-3">
                                        <button
                                            onClick={() => setSetBudgetModal(true)}
                                            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                        >
                                            Set Budget Now
                                        </button>
                                    </div>
                                </div>
                            </section>
                        ) : null}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">

                            {/* Budget Progress */}
                            <section className="bg-white p-6 rounded-xl shadow-sm border">
                                {currentDayExpenseLimit < 0 ? (
                                    // Over budget state
                                    <div className="text-center">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-sm text-gray-600">Today</h3>
                                            <div className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                                                Over Budget
                                            </div>
                                        </div>

                                        <div className="mb-3">
                                            <p className="text-2xl font-bold text-red-600 mb-1">
                                                ${currentDayExpense.toFixed(2)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                ${Math.abs(currentDayExpenseLimit).toFixed(2)} over daily limit
                                            </p>
                                        </div>

                                        <div className="w-full bg-red-100 rounded-full h-3 mb-2">
                                            <div className="h-3 bg-red-500 rounded-full w-full animate-pulse" />
                                        </div>

                                        <p className="text-xs text-gray-600">
                                            💡 Consider reviewing your{' '}
                                            <button
                                                onClick={() => setSetBudgetModal(true)}
                                                className="text-red-600 font-medium hover:text-red-700 hover:underline"
                                            >
                                                monthly budget
                                            </button>
                                        </p>
                                    </div>
                                ) : (
                                    // Normal state
                                    <>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-sm text-gray-600">Today</h3>

                                            <p className="text-sm">
                                                <span className="font-medium">{currentDayExpensePercent.toFixed(1)}%</span>
                                                <span className="text-gray-500">{` of $${currentDayExpenseLimit.toFixed(2)}`}</span>
                                            </p>
                                        </div>

                                        <div className="w-full bg-gray-200 rounded-full h-3">
                                            <div
                                                className={`h-3 rounded-full transition-all ${currentDayExpensePercent > 90 ? 'bg-red-500' : currentDayExpensePercent > 70 ? 'bg-yellow-500' : 'bg-green-500'
                                                    }`}
                                                style={{ width: `${Math.min(currentDayExpensePercent, 100)}%` }}
                                                role="progressbar"
                                            />
                                        </div>

                                        <div className="relative text-xs text-gray-500 mt-1">
                                            <span
                                                className="absolute"
                                                style={{ left: `${Math.min(currentDayExpensePercent, 100)}%`, transform: 'translateX(-50%)' }}
                                            >
                                                ${currentDayExpense.toLocaleString()}
                                            </span>
                                        </div>
                                    </>
                                )}
                            </section>

                            {/* Monthly Total */}
                            <section className="bg-white p-6 rounded-xl shadow-sm border">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-sm text-gray-600">This Month</h3>

                                        <p className="leading-3">
                                            <span className="text-2xl font-bold text-gray-900">${currentMonthExpense.toFixed(2)}</span>
                                            <button
                                                onClick={() => setSetBudgetModal(true)}
                                                className="text-sm text-gray-900 hover:text-blue-600 underline"
                                            >
                                                {` / $${currentMonthBudget.toFixed(2)}`}
                                            </button>
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 p-3 rounded-lg">
                                        <BanknoteArrowDown className="w-6 h-6 text-red-600" />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Category Spending with Chart */}
                            <section className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border">
                                <header className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Spends by Category</h3>
                                    <button
                                        onClick={() => setCurrentPage(ViewPage.CATEGORIES)}
                                        className="text-blue-600 hover:text-blue-700 p-1 rounded-lg hover:bg-blue-50"
                                        title="Manage Categories"
                                    >
                                        View All
                                    </button>
                                </header>

                                {/* Pie Chart */}
                                {categoryExpenseData.length ? (
                                    <figure className="h-48 mb-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={categoryExpenseData}
                                                    cx="50%"
                                                    cy="50%"
                                                    innerRadius={30}
                                                    outerRadius={80}
                                                    paddingAngle={2}
                                                    dataKey="expense"
                                                >
                                                    {categoryExpenseData.map((category, index) => (
                                                        <Cell
                                                            key={`cell-${index}`}
                                                            fill={category.color}
                                                        />
                                                    ))}
                                                </Pie>
                                                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </figure>
                                ) : (
                                    <div className="h-48 flex flex-col items-center justify-center text-gray-500">
                                        <PlusCircle className="w-12 h-12 mb-3 text-gray-400" />

                                        <p className="text-center">
                                            <span className="block font-medium text-gray-700">No expenses yet</span>
                                            <span className="block text-sm">Add your first expense to see category breakdown</span>
                                        </p>

                                        <button
                                            onClick={() => setAddEditExpenseModal(true)}
                                            className="mt-3 text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        >
                                            Add Expense
                                        </button>
                                    </div>
                                )}

                                {/* Category List */}
                                {categoryExpenseData.length ? (
                                    <ul className="space-y-3">
                                        {categoryExpenseData.map(category => (
                                            <li key={category.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div
                                                        className="w-3 h-3 rounded-full"
                                                        style={{ backgroundColor: category.color }}
                                                    />
                                                    <div>
                                                        <h4 className="font-medium text-gray-900">{category.name}</h4>
                                                        <p className="text-sm text-gray-500">{category.percentageExpense.toFixed(2)}%</p>
                                                    </div>
                                                </div>
                                                <p className="font-semibold text-gray-900">${category.expense.toFixed(2)}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </section>

                            {/* Recent Expenses */}
                            <section className="lg:col-span-1 bg-white p-6 rounded-xl shadow-sm border">
                                <header className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Recent Expenses</h3>

                                    <button
                                        onClick={() => setCurrentPage(ViewPage.EXPENSES)}
                                        className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                        title="Manage Expenses"
                                    >
                                        View All
                                    </button>
                                </header>

                                <ul className="space-y-3">
                                    {recentExpenses.map(expense => {
                                        return (
                                            <li key={expense.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                                <div>
                                                    <h3 className="font-medium text-gray-900">{expense.description}</h3>

                                                    <time className="text-sm text-gray-500" dateTime={new Date(expense.date).toLocaleDateString()}>
                                                        {new Date(expense.date).toLocaleDateString()}
                                                    </time>
                                                </div>
                                                <p className="font-semibold text-gray-900">${expense.amount.toFixed(2)}</p>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        </div>
                    </>
                )}
            </main>

        </div>
    );
};

export default Dashboard;

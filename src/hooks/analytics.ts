import { useMemo } from "react";

import type { IExpense } from "../types";
import { getCategoryColor } from "../utils";

import { useBudget } from "./budget";
import { useCategories } from "./category";
import { useExpenses } from "./expense";

interface IDashboardAnalytics {
    data: {
        currentMonthBudget: number;
        currentMonthExpenseByCategory: Record<string, number>;
        currentMonthExpense: number;
        currentDayExpense: number;
        currentDayExpenseLimit: number;
        currentDayExpensePercent: number;
        recentExpenses: IExpense[];
        categoryExpenseData: {
            id: string;
            name: string;
            expense: number;
            percentageExpense: number;
            color: string;
        }[];
    };
    isLoading: boolean;
}

export const useDashboardAnalytics = (): IDashboardAnalytics => {
    const { data: expensesData, isLoading: isExpensesLoading } = useExpenses();
    const { data: currentMonthBudget = 0, isLoading: isMonthlyBudgetLoading } = useBudget();
    const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();

    const isLoading = isExpensesLoading || isMonthlyBudgetLoading || isCategoriesLoading;

    return useMemo(() => {
        if (isLoading) {
            return {
                data: {
                    currentMonthBudget: 0,
                    currentMonthExpenseByCategory: {},
                    currentMonthExpense: 0,
                    currentDayExpense: 0,
                    currentDayExpenseLimit: 0,
                    currentDayExpensePercent: 0,
                    recentExpenses: [],
                    categoryExpenseData: [],
                },
                isLoading: true,
            };
        }

        if (!expensesData?.length) {
            return {
                data: {
                    currentMonthBudget,
                    currentMonthExpenseByCategory: {},
                    currentMonthExpense: 0,
                    currentDayExpense: 0,
                    currentDayExpenseLimit: 0,
                    currentDayExpensePercent: 0,
                    recentExpenses: [],
                    categoryExpenseData: [],
                },
                isLoading: false,
            };
        }

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        const currentDate = now.getDate();

        // Single loop to calculate all analytics
        const analytics = expensesData.reduce((acc, expense) => {
            const expenseDate = new Date(expense.date);
            const expenseAmount = expense.amount;

            // Total per category (all time)

            // Monthly total
            if (expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear) {
                acc.currentMonthExpenseByCategory[expense.categoryId] = (acc.currentMonthExpenseByCategory[expense.categoryId] || 0) + expenseAmount;
                acc.currentMonthExpense += expenseAmount;
            }

            // Today's total
            if (expenseDate.getDate() === currentDate &&
                expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear) {
                acc.currentDayExpense += expenseAmount;
            }

            return acc;
        }, {
            currentMonthExpenseByCategory: {} as Record<string, number>,
            currentMonthExpense: 0,
            currentDayExpense: 0,
        });

        const { currentMonthExpense, currentDayExpense } = analytics;

        const categoryExpenseData = currentMonthExpense ? (
            categories
                .map(category => {
                    const expense = analytics.currentMonthExpenseByCategory[category.id] || 0;

                    return ({
                        id: category.id,
                        name: category.name,
                        expense,
                        percentageExpense: expense / currentMonthExpense * 100 || 0,
                        color: getCategoryColor(category.id),
                    })
                })
                .filter(category => category.expense > 0)
                .sort((a, b) => b.expense - a.expense)
        ) : [];

        const remainingBudget = currentMonthBudget - currentMonthExpense;
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const remainingDays = Math.max(1, daysInMonth - currentDate + 1);
        const currentDayExpenseLimit = remainingBudget / remainingDays;
        const recentExpenses = expensesData
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5); // Last 5 expenses

        return {
            data: {
                ...analytics,
                currentMonthBudget,
                currentDayExpenseLimit,
                currentDayExpensePercent: (currentDayExpense / currentDayExpenseLimit) * 100,
                recentExpenses,
                categoryExpenseData,
            },
            isLoading: false,
        };
    }, [isLoading, expensesData, currentMonthBudget, categories]);
};

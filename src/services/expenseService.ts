import type { ICreateUpdateExpense, IExpense } from "../types";
import { simulateNetworkDelay } from "../utils";

class ExpenseService {
    private fetchExpensesFromStorage(): IExpense[] {
        const storedData = localStorage.getItem('expenses');

        if (storedData) {
            return JSON.parse(storedData) as IExpense[];
        }

        return [];
    }

    public setTextExpenses() {
        const testExpenses = [
            { id: '6ba7b814-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-18', description: 'Morning Coffee & Pastry', categoryId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', amount: 8.75 },
            { id: '6ba7b815-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-18', description: 'Metro Card Refill', categoryId: 'a3bb189e-8bf9-3888-9912-ace4e6543002', amount: 25.00 },
            { id: '6ba7b816-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-15', description: 'New Bluetooth Headphones', categoryId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', amount: 89.99 },
            { id: '6ba7b817-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-15', description: 'Internet Service Bill', categoryId: '6ba7b811-9dad-11d1-80b4-00c04fd430c8', amount: 65.99 },
            { id: '6ba7b818-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-14', description: 'Movie Theater Tickets', categoryId: '6ba7b812-9dad-11d1-80b4-00c04fd430c8', amount: 24.50 },
            { id: '6ba7b819-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-14', description: 'Hotel Booking Deposit', categoryId: '6ba7b813-9dad-11d1-80b4-00c04fd430c8', amount: 150.00 },
            { id: '6ba7b81a-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-13', description: 'Lunch at Italian Restaurant', categoryId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479', amount: 32.40 },
            { id: '6ba7b81b-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-12', description: 'Taxi to Airport', categoryId: 'a3bb189e-8bf9-3888-9912-ace4e6543002', amount: 18.75 },
            { id: '6ba7b81c-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-11', description: 'New Winter Jacket', categoryId: '6ba7b810-9dad-11d1-80b4-00c04fd430c8', amount: 125.00 },
            { id: '6ba7b81d-9dad-11d1-80b4-00c04fd430c8', date: '2025-08-10', description: 'Office Supplies', categoryId: '550e8400-e29b-41d4-a716-446655440000', amount: 45.00 }
        ];

        localStorage.setItem('expenses', JSON.stringify(testExpenses));
    };

    async getAllExpenses({ filters }: { filters?: { date?: Date } } = {}) {
        const expenses = this.fetchExpensesFromStorage();

        let selectedDate = new Date();

        if (filters?.date) {
            selectedDate = filters.date;
        }

        return expenses.filter(exp => {
            const expenseMonth = new Date(exp.date).getMonth();
            const expenseYear = new Date(exp.date).getFullYear();

            return expenseYear === selectedDate.getFullYear() && expenseMonth === selectedDate.getMonth();
        });

        await simulateNetworkDelay();

        return expenses;
    }

    async getExpenseById(id: string) {
        const expense = this.fetchExpensesFromStorage().find(exp => exp.id === id);

        await simulateNetworkDelay();

        return expense ?? null;
    }

    async addExpense(expense: ICreateUpdateExpense) {
        const newExpense: IExpense = {
            id: crypto.randomUUID(),
            ...expense
        };

        const updatedExpenses = [...this.fetchExpensesFromStorage(), newExpense];
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
        await simulateNetworkDelay();
    }

    async updateExpense(id: string, updatedExpense: Partial<IExpense>) {
        const expenses = this.fetchExpensesFromStorage();
        const index = expenses.findIndex(exp => exp.id === id);
        if (index !== -1) {
            expenses[index] = { ...expenses[index], ...updatedExpense };
            localStorage.setItem('expenses', JSON.stringify(expenses));
        }

        await simulateNetworkDelay();
    }

    async deleteExpense(id: string) {
        const expenses = this.fetchExpensesFromStorage();
        const updatedExpenses = expenses.filter(exp => exp.id !== id);
        localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

        await simulateNetworkDelay();
    }

    async getExpensesByCategory(categoryId: string) {
        await simulateNetworkDelay();

        return this.fetchExpensesFromStorage().filter(exp => exp.categoryId === categoryId);
    }

    async getTotalExpensesByMonth(month: string) {
        const total = this.fetchExpensesFromStorage().reduce((sum, exp) => {
            const expenseMonth = new Date(exp.date).toISOString().slice(0, 7);

            return expenseMonth === month ? sum + exp.amount : sum;
        }, 0);

        await simulateNetworkDelay();

        return total;
    }
}

export const expenseService = new ExpenseService();

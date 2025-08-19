import { simulateNetworkDelay } from "../utils";

class BudgetService {
    private fetchBudgetFromStorage(): number {
        const storedData = localStorage.getItem('budget');

        return storedData ? JSON.parse(storedData) : 0;
    }

    async getBudget() {
        await simulateNetworkDelay();

        return this.fetchBudgetFromStorage();
    }

    async setBudget(amount: number) {
        localStorage.setItem('budget', JSON.stringify(amount));

        await simulateNetworkDelay();
    }
}

export const budgetService = new BudgetService();

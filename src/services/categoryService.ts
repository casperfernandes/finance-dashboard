import type { ICategory, ICreateUpdateCategory, } from "../types";
import { simulateNetworkDelay } from "../utils";

class CategoryService {
    private fetchCategoriesFromStorage(): ICategory[] {
        const storedData = localStorage.getItem('categories');

        if (storedData) {
            return JSON.parse(storedData).map((category: any) => ({
                ...category
            })) as ICategory[];
        }

        return [];
    }

    async setDefaultCategories() {
        if (!this.fetchCategoriesFromStorage().length) {
            const defaultCategories = [
                {
                    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
                    name: 'Food',
                    isDefault: true,
                },
                {
                    id: 'a3bb189e-8bf9-3888-9912-ace4e6543002',
                    name: 'Transportation',
                    isDefault: true,
                },
                {
                    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
                    name: 'Shopping',
                    isDefault: true,
                },
                {
                    id: '6ba7b811-9dad-11d1-80b4-00c04fd430c8',
                    name: 'Bills & Utilities',
                    isDefault: true,
                },
                {
                    id: '6ba7b812-9dad-11d1-80b4-00c04fd430c8',
                    name: 'Entertainment',
                    isDefault: true,
                },
                {
                    id: '6ba7b813-9dad-11d1-80b4-00c04fd430c8',
                    name: 'Travel',
                    isDefault: true,
                },
                {
                    id: '550e8400-e29b-41d4-a716-446655440000',
                    name: 'Miscellaneous',
                    isDefault: true,
                }
            ];

            localStorage.setItem('categories', JSON.stringify(defaultCategories));
        }
    }

    async getAllCategories() {
        await simulateNetworkDelay();

        return this.fetchCategoriesFromStorage();
    }

    async getAllCategoriesById() {
        const byId: { [key: string]: ICategory } = {};
        this.fetchCategoriesFromStorage().forEach(category => {
            byId[category.id] = category;
        });

        await simulateNetworkDelay();

        return byId;
    }

    async getCategoryById(id: string) {
        const category = this.fetchCategoriesFromStorage().find(cat => cat.id === id);

        await simulateNetworkDelay();

        return category ?? null;
    }

    async addCategory(category: ICreateUpdateCategory) {
        const newCategory: ICategory = {
            id: crypto.randomUUID(),
            ...category
        };

        const updatedCategories = [...this.fetchCategoriesFromStorage(), newCategory];
        localStorage.setItem('categories', JSON.stringify(updatedCategories));
        await simulateNetworkDelay();
    }

    async updateCategory(id: string, updatedCategory: ICreateUpdateCategory) {
        const categories = this.fetchCategoriesFromStorage();
        const index = categories.findIndex(cat => cat.id === id);
        if (index !== -1) {
            categories[index] = { ...categories[index], ...updatedCategory };
            localStorage.setItem('categories', JSON.stringify(categories));
        }

        await simulateNetworkDelay();
    }

    async deleteCategory(id: string) {
        const categories = this.fetchCategoriesFromStorage();
        const updatedCategories = categories.filter(cat => cat.id !== id);
        localStorage.setItem('categories', JSON.stringify(updatedCategories));

        await simulateNetworkDelay();
    }
}

export const categoryService = new CategoryService();

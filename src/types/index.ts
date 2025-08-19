export interface IExpense {
    id: string;
    date: string;
    description: string;
    categoryId: string;
    amount: number;
}

export interface ICreateUpdateExpense {
    date: string;
    description: string;
    categoryId: string;
    amount: number;
}

export interface ICategory {
    id: string;
    name: string;
    isDefault: boolean;
}

export interface ICreateUpdateCategory {
    name: string;
    isDefault: false;
}

export const ViewPage = {
    DASHBOARD: 'dashboard',
    EXPENSES: 'expenses',
    CATEGORIES: 'categories',
} as const;

export type ViewPageType = (typeof ViewPage)[keyof typeof ViewPage];

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { expenseService } from "../services/expenseService";
import type { ICreateUpdateExpense } from "../types";


export function useExpenses({ filters }: { filters?: { month?: string } } = {}) {
    return useQuery({
        queryKey: ['expenses', JSON.stringify(filters)],
        queryFn: () => expenseService.getAllExpenses({ filters }),
    });
};

export function useGetExpense({ expenseId }: { expenseId?: string }) {
    return useQuery({
        queryKey: ['getExpense', expenseId],
        enabled: !!expenseId,
        queryFn: () => expenseService.getExpenseById(expenseId ?? ''),
    });
}

export function useAddExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ expense }: { expense: ICreateUpdateExpense }) => expenseService.addExpense(expense),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export function useUpdateExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, expense }: { id: string, expense: ICreateUpdateExpense }) => expenseService.updateExpense(id, expense),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export function useDeleteExpense() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => expenseService.deleteExpense(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

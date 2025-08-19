import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { budgetService } from "../services/budgetService";


export const useBudget = () => {
    return useQuery({
        queryKey: ['budget'],
        queryFn: () => budgetService.getBudget(),
    });
};

export const useSetBudget = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (amount: number) => budgetService.setBudget(amount),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budget'] });
        },
    });
};

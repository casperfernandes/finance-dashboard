import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { categoryService } from "../services/categoryService";
import type { ICreateUpdateCategory } from "../types";


export function useCategories() {
    return useQuery({
        queryKey: ['categories'],
        queryFn: () => categoryService.getAllCategories(),
    });
};

export function useGetCategory({ categoryId }: { categoryId?: string }) {
    return useQuery({
        queryKey: ['getCategory', categoryId],
        enabled: !!categoryId,
        queryFn: () => categoryService.getCategoryById(categoryId ?? ''),
    });
}

export function useGetCategoriesById() {
    return useQuery({
        queryKey: ['categoriesById'],
        queryFn: () => categoryService.getAllCategoriesById(),
    });
};

export function useAddCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (category: ICreateUpdateCategory) => categoryService.addCategory(category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export function useUpdateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, category }: { id: string, category: ICreateUpdateCategory }) => categoryService.updateCategory(id, category),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => categoryService.deleteCategory(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
        },
    });
};

import { useEffect, useState, type FormEvent, } from "react";

import { useAddCategory, useGetCategory, useUpdateCategory } from "../../../hooks/category";
import { useUiStore } from "../../../stores/uiStore";
import type { ICreateUpdateCategory } from "../../../types";

import Loader from "../../layout/loader";
import { Modal, ModalActions, ModalBody, ModalHeader } from "./Modal";

interface IAddUpdateCategoryModalProps {
    categoryId?: string
}

const AddUpdateCategoryModal = (props: IAddUpdateCategoryModalProps) => {
    const { categoryId } = props;

    const [categoryName, setCategoryName] = useState<string>('');
    const [isSaving, setIsSaving] = useState<boolean>(false);

    const { setCategoryModal } = useUiStore();
    const { data: fetchedCategory, isLoading: isFetchingCategory } = useGetCategory({ categoryId });
    const addCategory = useAddCategory();
    const updateCategory = useUpdateCategory();

    const handleCloseModal = () => {
        setCategoryModal(false);
    };

    const handleSave = async (event: FormEvent<HTMLFormElement>) => {
        try {
            setIsSaving(true);
            event.preventDefault();

            const category: ICreateUpdateCategory = {
                name: categoryName,
                isDefault: false,
            };

            if (categoryId) {
                await updateCategory.mutateAsync({ id: categoryId, category });
            } else {
                await addCategory.mutateAsync(category);
            }

            handleCloseModal();
        } catch (error) {
            console.error("Error saving category:", error);
            setIsSaving(false);
        }
    };

    useEffect(() => {
        if (fetchedCategory) {
            // set data for the case of edit category
            setCategoryName(fetchedCategory.name);
        }
    }, [fetchedCategory]);

    return (
        <Modal>
            <ModalHeader title={categoryId ? 'Edit Category' : 'Add Category'} onClose={handleCloseModal} />

            <ModalBody>
                {isFetchingCategory ? (
                    <Loader />
                ) : (
                    <form onSubmit={handleSave} className="flex flex-col h-full min-h-0">
                        <div className="flex-1 overflow-y-auto scrollbar-thin min-h-0">
                            <div className="p-4 space-y-6 md:p-6">
                                <section className=" flex flex-col gap-6">
                                    {/* Name Field */}
                                    <div>
                                        <label
                                            htmlFor="category-name"
                                            className="block text-sm font-medium text-gray-700 mb-2"
                                        >
                                            Name <span className="text-blue-600">*</span>
                                        </label>
                                        <input
                                            id="category-name"
                                            type="text"
                                            value={categoryName}
                                            onChange={(event) => {
                                                setCategoryName(event.target.value);
                                            }}
                                            maxLength={50}
                                            placeholder="e.g., Grocery shopping, Gas station..."
                                            className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>
                                </section>

                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                    <h5 className="text-sm font-medium text-blue-800 mb-2">💡 Quick Tips</h5>
                                    <ul className="text-xs text-blue-700 space-y-1">
                                        <li>• All fields marked with * are required</li>
                                        <li>• Use a short, clear description (max 50 characters)</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        <ModalActions>
                            <button
                                type="button"
                                onClick={handleCloseModal}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                                disabled={isSaving}
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                                disabled={isSaving}
                            >
                                Save
                            </button>
                        </ModalActions>
                    </form>
                )}
            </ModalBody>

        </Modal>
    );
};

export default AddUpdateCategoryModal;

import { Edit2, PlusCircle } from "lucide-react";

import { useCategories } from "../../hooks/category";
import { useUiStore } from "../../stores/uiStore";

import AddUpdateCategoryModal from "../ui/modals/addUpdateCategoryModal";
import Table from "../ui/tables/table";

const columns = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'isDefault',
        label: 'Type',
        customRowComponent: ({ data }: { data: any }) => <>{data.isDefault ? 'Default' : 'Custom'}</>
    },
    {
        key: 'actions',
        label: 'Actions',
        customRowComponent: (props: any) => {
            const { data, handleEditCategory } = props;

            return (
                <div className="flex space-x-2">
                    {data.isDefault ? null : (
                        <button
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            onClick={() => handleEditCategory(data.id)}
                        >
                            <Edit2 className="w-4 h-4 text-gray-600" />
                        </button>
                    )}
                </div>
            );
        }
    }
];

const Categories = () => {
    const { categoryModal, setCategoryModal } = useUiStore();

    const {
        data: categoriesData,
        isLoading,
    } = useCategories();

    const handleEditCategory = (categoryId: string) => {
        setCategoryModal(true, { categoryId });
    };

    return (
        <section className="p-4 lg:p-8 w-full overflow-x-hidden">
            {categoryModal.isOpen ? (
                <AddUpdateCategoryModal
                    categoryId={categoryModal.data?.categoryId}
                // onClose={() => setCategoryModal(false)}
                />
            ) : null}

            {/* Mobile Header */}
            <header className="lg:hidden mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">Categories</h2>

                    <button
                        onClick={() => setCategoryModal(true)}
                        title="Add Category"
                        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
                    >
                        <PlusCircle className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Desktop Header */}
            <header className="hidden lg:flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
                </div>

                <button
                    onClick={() => setCategoryModal(true)}
                    title="Add Category"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                    <PlusCircle className="w-5 h-5" />
                    <span>Add Category</span>
                </button>
            </header>

            <main className="w-full lg:max-w-7xl lg:mx-auto pb-6">
                {isLoading ? (
                    <div className="flex items-center justify-center h-64">
                        <span className="text-gray-500">Loading...</span>
                    </div>
                ) : (
                    <Table
                        data={categoriesData as Record<string, any>[]}
                        columns={columns}
                        rowProps={{ handleEditCategory }}
                    />
                )}
            </main>
        </section >
    );
};

export default Categories;

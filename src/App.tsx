import { useEffect } from 'react';

import MobileHeader from './components/layout/mobileHeader';
import Navbar from './components/layout/navbar';
import GlobalModals from './components/ui/modals/globalModals';
import Categories from './components/views/categories';
import Dashboard from './components/views/dashboard';
import Expenses from './components/views/expenses';

import { categoryService } from './services/categoryService';
import { expenseService } from './services/expenseService';
import { useUiStore } from './stores/uiStore';

import { ViewPage } from './types';

const PageComponent = {
    [ViewPage.DASHBOARD]: Dashboard,
    [ViewPage.EXPENSES]: Expenses,
    [ViewPage.CATEGORIES]: Categories,
};

function App() {
    const { currentPage, setTestExpensesModal } = useUiStore();
    const Page = PageComponent[currentPage];


    useEffect(() => {
        // Set test expenses for quick UI viewing
        const handleTestData = async () => {
            categoryService.setDefaultCategories();
            const expenses = await expenseService.getAllExpenses();

            if (expenses.length === 0) {
                setTestExpensesModal(true);
            }
        };

        handleTestData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 overflow-x-hidden">
            <MobileHeader />

            <div className="flex w-full">
                <Navbar />

                <main className="flex-1 lg:ml-0 w-full overflow-x-hidden">
                    <Page />
                </main>
            </div>

            <GlobalModals />
        </div>
    )
}

export default App

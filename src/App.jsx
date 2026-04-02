import React from 'react'
import Sidebar from './components/main/Sidebar'
import TransactionStats from './components/dashboard/TransactionStats'
import History from './components/dashboard/History'

const App = () => {
    return (
        <div className="flex bg-light-bg dark:bg-dark-bg text-light-primary-text dark:text-dark-primary-text font-[Poppins]">
            <Sidebar />
            <main className="flex-1 flex flex-col gap-10 overflow-y-auto p-4 md:p-6 lg:p-8">
                <TransactionStats />
                <History />
            </main>
        </div>
    )
}

export default App
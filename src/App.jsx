import Sidebar from './components/main/Sidebar'
import TransactionStats from './components/dashboard/TransactionStats'
import TransactionHistory from './components/dashboard/TransactionHistory'
import Header from './components/layout/Header'
import { useState } from 'react'

const App = () => {
    const [shareOpen, setShareOpen] = useState(false);

    return (
        <div className="flex flex-col lg:flex-row bg-light-bg dark:bg-dark-bg text-light-primary-text dark:text-dark-primary-text min-h-screen transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 flex flex-col gap-8 overflow-y-auto p-4 lg:p-6 xl:p-8">
                <Header shareOpen={shareOpen} setShareOpen={setShareOpen} />
                <TransactionStats />
                <TransactionHistory />
            </main>
        </div>
    )
}

export default App
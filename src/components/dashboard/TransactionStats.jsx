import React, { useRef } from 'react'
import { useStore } from '../../store/useStore'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Sub-components
import HeroSavings from './Stats/HeroSavings'
import StatsCard from './Stats/StatsCard'
import CashFlowChart from './Stats/CashFlowChart'
import ExpensePieChart from './Stats/ExpensePieChart'
import CreditCardVisual from './Stats/CreditCardVisual'

const TransactionStats = () => {
    const { stats, cashFlowData } = useStore();
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from(".stat-card", {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.2)",
        });
    }, { scope: containerRef });

    return (
        <div className="stats-overview w-full" ref={containerRef}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-4">
                
                {/* Hero Savings Card */}
                <div className="md:col-start-1 md:row-start-1 md:row-span-2">
                    <HeroSavings />
                </div>

                {/* Individual Mini Metrics - Pinned Row 1-2 Col 2-3 */}
                {stats.map((stat, idx) => (
                    <div key={stat.id} className={
                        idx === 0 ? "md:col-start-2 md:row-start-1" :
                            idx === 1 ? "md:col-start-3 md:row-start-1" :
                                idx === 2 ? "md:col-start-2 md:row-start-2" :
                                    "md:col-start-3 md:row-start-2"
                    }>
                        <StatsCard stat={stat} />
                    </div>
                ))}

                {/* Credit Card & AI Panel - Pinned Col 4 Row 1-3 */}
                <div className="md:col-start-4 md:row-start-1 md:row-span-3">
                    <CreditCardVisual />
                </div>

                {/* Cash Flow Line Chart - Pinned Col 1-3 Row 3-5 */}
                <div className="md:col-start-1 md:row-start-3 md:col-span-3 md:row-span-3">
                    <CashFlowChart cashFlowData={cashFlowData} />
                </div>

                {/* Expense Breakdown Pie - Pinned Col 4 Row 4-5 */}
                <div className="md:col-start-4 md:row-start-4 md:row-span-2">
                    <ExpensePieChart cashFlowData={cashFlowData} />
                </div>

            </div>
        </div>
    )
}

export default TransactionStats
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
    stats as mockStats,
    paymentHistory as mockHistory,
    cashFlowData as mockCashFlow,
} from "../data/mockData";

// Helper to calculate total balance from transactions
const calculateTotalBalance = (transactions) => {
    // Base balance from initial state (assuming base + current additions/deletions)
    const baseBalance = 12540.0;
    const initialSum = mockHistory.reduce((s, t) => s + t.amount, 0);
    const currentSum = transactions.reduce((s, t) => s + t.amount, 0);
    return baseBalance + (currentSum - initialSum);
};

// Function to make stats serializable by replacing component references with strings
const getSerializableStats = (statsArr) => {
    return statsArr.map((s) => ({
        ...s,
        icon: typeof s.icon === "string" ? s.icon : "Coins", // Map component to its string name
    }));
};

export const useStore = create(
    persist(
        (set, get) => ({
            currentRole: "Admin",
            stats: getSerializableStats(mockStats),
            paymentHistory: mockHistory,
            cashFlowData: mockCashFlow,

            toggleRole: () =>
                set((state) => ({
                    currentRole:
                        state.currentRole === "Admin" ? "Viewer" : "Admin",
                })),

            // Administrative Actions
            addTransaction: (transaction) => {
                const newHistory = [transaction, ...get().paymentHistory];
                const newTotalBalance = calculateTotalBalance(newHistory);

                const newStats = [...get().stats];
                newStats[0] = { ...newStats[0], amount: newTotalBalance };

                set({
                    paymentHistory: newHistory,
                    stats: newStats,
                });
            },

            updateTransaction: (id, updatedTxn) => {
                const newHistory = get().paymentHistory.map((txn) =>
                    txn.id === id ? { ...txn, ...updatedTxn } : txn,
                );
                const newTotalBalance = calculateTotalBalance(newHistory);

                const newStats = [...get().stats];
                newStats[0] = { ...newStats[0], amount: newTotalBalance };

                set({
                    paymentHistory: newHistory,
                    stats: newStats,
                });
            },

            deleteTransaction: (id) => {
                const newHistory = get().paymentHistory.filter(
                    (txn) => txn.id !== id,
                );
                const newTotalBalance = calculateTotalBalance(newHistory);

                const newStats = [...get().stats];
                newStats[0] = { ...newStats[0], amount: newTotalBalance };

                set({
                    paymentHistory: newHistory,
                    stats: newStats,
                });
            },
        }),
        {
            name: "finvision_data",
            storage: createJSONStorage(() => localStorage),
        },
    ),
);

import { create } from 'zustand';

export const useStore = create((set) => ({
    currentRole: 'Admin', // default role
    toggleRole: () => set((state) => ({ 
        currentRole: state.currentRole === 'Admin' ? 'Viewer' : 'Admin' 
    }))
}));

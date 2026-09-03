import { createContext, useContext } from "react";

export const RateContext = createContext();

export function useRateModal() {
    const context = useContext(RateContext);
    if(!context) throw new Error('useRateModal must be used within RateProvider');
    return context;
}
import { createContext } from "react";
import { useSafeContext } from "../../hooks/generic_hooks/useSafeContext";

export const RateContext = createContext();

export function useRateModal() {
    return useSafeContext(RateContext, 'RateProvider');
}
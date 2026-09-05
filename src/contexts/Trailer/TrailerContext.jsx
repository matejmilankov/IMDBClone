import { createContext } from "react";
import { useSafeContext } from "../../hooks/generic_hooks/useSafeContext";

export const TrailerContext = createContext(null); 

export function useTrailerModal() {
    return useSafeContext(TrailerContext, 'TrailerProvider');
}
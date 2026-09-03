import { createContext, useContext } from "react";

export const TrailerContext = createContext(null); 

export function useTrailerModal() {
    const context = useContext(TrailerContext);
    if (!context) throw new Error('useTrailerModal must be used within TrailerProvider');
    return context;
}
import { createContext } from "react";
import { useSafeContext } from "../../hooks/generic_hooks/useSafeContext";

export const MovieDetailsContext = createContext();

export function useMovieDetailsModal() {
    return useSafeContext(MovieDetailsContext, 'MovieDetailsProvider');
}
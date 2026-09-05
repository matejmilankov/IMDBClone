import { createContext } from "react";
import { useSafeContext } from "../../hooks/generic_hooks/useSafeContext";

export const WatchlistContext = createContext(null);

export function useWatchlist() {
    return useSafeContext(WatchlistContext, 'WatchlistProvider');
}
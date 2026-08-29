import { createContext, useContext } from "react";

export const WatchlistContext = createContext(null);

export function useWatchlist() {
    return useContext(WatchlistContext);
}
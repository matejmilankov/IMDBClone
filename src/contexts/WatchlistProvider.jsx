import { useState, useEffect } from "react";
import { WatchlistContext } from "./WatchlistContext";

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState(() => {
        const savedData = localStorage.getItem('watchlist');
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const toggleWatchlist = (movie) => {
        setWatchlist(prevMovies => {
            const movieExists = prevMovies.some(prevMovie => prevMovie.id === movie.id);
            return movieExists 
                ? prevMovies.filter(prevMovie => prevMovie.id !== movie.id) 
                : [...prevMovies, movie];
        });
    }

    return (
        <WatchlistContext.Provider value={{watchlist, toggleWatchlist}}>
            {children}
        </WatchlistContext.Provider>
    )
} 
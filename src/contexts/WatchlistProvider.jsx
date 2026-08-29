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

    const isInWatchlist = (movie) => {
        return watchlist.some(m => m.id === movie.id);
    }

    return (
        <WatchlistContext.Provider value={ {watchlist, toggleWatchlist, isInWatchlist} }>
            {children}
        </WatchlistContext.Provider>
    )
} 
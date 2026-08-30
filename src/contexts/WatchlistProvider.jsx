import { useState, useEffect, useMemo, useCallback } from "react";
import { WatchlistContext } from "./WatchlistContext";

export function WatchlistProvider({ children }) {
    const [watchlist, setWatchlist] = useState(() => {
        const savedData = localStorage.getItem('watchlist');
        return savedData ? JSON.parse(savedData) : [];
    });

    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    // Note: useCallback hook korisim kako bi sacuvao f-je na istim adresama
    //       U suprotnom, prilikom svakog rerendera svaka f-ja bi dobila novu adresu
    //       i triggerovala bi useMemo hook
    const toggleWatchlist = useCallback((movie) => {
        setWatchlist(prevMovies => {
            const movieExists = prevMovies.some(prevMovie => prevMovie.id === movie.id);
            return movieExists 
                ? prevMovies.filter(prevMovie => prevMovie.id !== movie.id) 
                : [...prevMovies, movie];
        });
    }, []);

    const isInWatchlist = useCallback((moviId) => {
        return watchlist.some(m => m.id === moviId)
    }, [watchlist]);


    // Note: Vratice tacno onaj stari obejakt iz memorije, value objekat ostaje isti
    //       Posto se value nije promenio, React nece rerenderovati sve komponente koje koriste useWatchlist hook
    const value = useMemo(() => (
        {
            watchlist,
            toggleWatchlist,
            isInWatchlist
        }
    ), [watchlist, isInWatchlist, toggleWatchlist]);

    return (
        <WatchlistContext.Provider value={ value }>
            {children}
        </WatchlistContext.Provider>
    )
} 
import { RateContext } from "./RateContext";
import { useState, useMemo, useCallback, useEffect } from "react";

export function RateProvider({ children }) {
    const [clickedMovie, setClickedMovie] = useState(null);
    const [ratedMovies, setRatedMovies] = useState(() => {
        const savedData = localStorage.getItem('grades');
        return savedData ? JSON.parse(savedData) : [];
    });

    const openRateModal = useCallback((movie) => {
        setClickedMovie(movie);
    }, []);
    const closeRateModal = useCallback(() => {
        setClickedMovie(null);
    }, []);

    useEffect(() => {
        localStorage.setItem('grades', JSON.stringify(ratedMovies))
    }, [ratedMovies]);
    
    const rateMovie = useCallback((movie, rating) => {
        setRatedMovies(prevMovies => {
            const existingIndex = prevMovies.findIndex(entry => entry.movie.id === movie.id);
            if(existingIndex !== -1) {
                const updatedMovies = [...prevMovies]
                updatedMovies[existingIndex] = {movie: movie, grade: rating}
                return updatedMovies;
            }

            return [...prevMovies, {movie: movie, grade: rating}];
        });
    }, []);

    const removeRate = useCallback((movieId) => {
        setRatedMovies(prevMovies => (
            prevMovies.filter(entry => entry.movie?.id !== movieId)
        ));
    }, []);

    const getRating = useCallback((movieId) => {
        const requestedMovie =  ratedMovies.find(entry => entry.movie.id === movieId);
        return requestedMovie ? requestedMovie.grade : 0;
    }, [ratedMovies]);

    const value = useMemo(() => ({
        removeRate,
        getRating,
        rateMovie,
        clickedMovie,
        openRateModal,
        closeRateModal
    }), [clickedMovie, openRateModal, closeRateModal, rateMovie, getRating, removeRate]);

    return (
        <RateContext.Provider value={value}>
            {children}
        </RateContext.Provider>
    )
}
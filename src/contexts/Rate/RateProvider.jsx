import { RateContext } from "./RateContext";
import { useState, useMemo, useCallback } from "react";

export function RateProvider({ children }) {
    const [clickedMovieId, setClickedMovieId] = useState(null);

    const openRateModal = useCallback((movieId) => {
        setClickedMovieId(movieId);
    }, []);
    const closeRateModal = useCallback(() => {
        setClickedMovieId(null);
    }, []);

    const value = useMemo(() => ({
        clickedMovieId,
        openRateModal,
        closeRateModal
    }), [clickedMovieId, openRateModal, closeRateModal]);

    return (
        <RateContext.Provider value={value}>
            {children}
        </RateContext.Provider>
    )
}
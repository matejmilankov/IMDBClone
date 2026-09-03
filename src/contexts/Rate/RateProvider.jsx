import { RateContext } from "./RateContext";
import { useState, useMemo, useCallback } from "react";

export function RateProvider({ children }) {
    const [clickedMovieTitle, setClickedMovieId] = useState(null);

    const openRateModal = useCallback((movieTitle) => {
        setClickedMovieId(movieTitle);
    }, []);
    const closeRateModal = useCallback(() => {
        setClickedMovieId(null);
    }, []);

    const value = useMemo(() => ({
        clickedMovieTitle,
        openRateModal,
        closeRateModal
    }), [clickedMovieTitle, openRateModal, closeRateModal]);

    return (
        <RateContext.Provider value={value}>
            {children}
        </RateContext.Provider>
    )
}
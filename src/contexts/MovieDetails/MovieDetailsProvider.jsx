import { MovieDetailsContext } from "./MovieDetailsContext";
import { useModalState } from "../../hooks/generic_hooks/useModalState";
import { useMemo } from "react";

export function MovieDetailsProvider({ children }) {
    const {clickedItem: clickedMovieDetails, openModal: openMovieDetailsModal, closeModal: closeMovieDetailsModal} = useModalState();

    const value = useMemo(() => ({
        clickedMovieDetails,
        openMovieDetailsModal,
        closeMovieDetailsModal
    }), [clickedMovieDetails, openMovieDetailsModal, closeMovieDetailsModal]);

    return (
        <MovieDetailsContext.Provider value={value}>
            {children}
        </MovieDetailsContext.Provider>
    )
}
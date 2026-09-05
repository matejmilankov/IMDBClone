import { useMovieDetailsModal } from "../../contexts/MovieDetails/MovieDetailsContext"
import { useMovie } from "../../hooks/api_calls/useMovie"
import { useModalTransition } from "../../hooks/useModalTransition"
import { CloseIcon } from "../Icons/Icons"
import styles from './MovieDetailsModal.module.css'

export function MovieDetailsModal() {
    const { clickedMovieDetails, closeMovieDetailsModal } = useMovieDetailsModal();
    const { movieDetails, isLoading, error } = useMovie(clickedMovieDetails);
    const { closeOverlay, blurOverlayRef } = useModalTransition(closeMovieDetailsModal);

    return (
        <div
            className='backdropOverlay visible'
            ref={blurOverlayRef}
            onClick={closeOverlay}
        >
            {isLoading && <p className={styles.info}>Loading...</p>}
            {error && <p className={styles.info}>Something went wrong. Please try again later.</p>}
            {movieDetails && (
                <div
                    className={styles.rateModalWrapper}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.rateModalContent}>
                        <span className={styles.rateModalTitle}>{movieDetails.title}</span>
                        
                    </div>
                    <button
                        className={styles.closeButton}
                        onClick={closeOverlay}
                    >
                        <CloseIcon />
                    </button>

                </div>
            )}
        </div>
    )
}
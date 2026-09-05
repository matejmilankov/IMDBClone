import { useMovieTrailer } from "../../hooks/api_calls/useMovieTrailer";
import { useModalTransition } from "../../hooks/useModalTransition";
import { useRef } from "react";
import { useTrailerModal } from "../../contexts/Trailer/TrailerContext";
import YouTube from "react-youtube";
import styles from './TrailerModal.module.css'

export function TrailerModal() {
    const modalRef = useRef(null);
    
    const { clickedTrailerId, closeTrailerModal } = useTrailerModal();
    const { trailer, error, isLoading } = useMovieTrailer(clickedTrailerId);
    const {closeOverlay, blurOverlayRef} = useModalTransition(closeTrailerModal, modalRef);

    return (
        <>
            <div
                className='backdropOverlay visible'
                ref={blurOverlayRef}
                onClick={closeOverlay}
                >
                {isLoading && <p className={styles.info}>Loading...</p>}
                {error && <p className={styles.info}>Something went wrong. Please try again later.</p>}
                {trailer && (
                    <div className={styles.yt} ref={modalRef}>
                        <YouTube
                            videoId={trailer.key}
                            opts={{
                                width: '100%',
                                height: '100%',
                                playerVars: { autoplay: 1 }
                            }}
                        />
                    </div>
                )}

            </div>
        </>
    )
}
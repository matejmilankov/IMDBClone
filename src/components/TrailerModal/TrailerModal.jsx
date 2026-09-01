import { useMovieTrailer } from "../../hooks/useMovieTrailer";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import YouTube from "react-youtube";
import styles from './TrailerModal.module.css'

export function TrailerModal({ clickedTrailerId, closeTrailerModal }) {

    const { trailer, error, isLoading } = useMovieTrailer(clickedTrailerId);
    console.log(trailer);

    const blurOverlayRef = useRef(null);

    useGSAP(() => {
        gsap.to(blurOverlayRef.current, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3
        });
    });

    const closeOverlay = () => {
        gsap.to(blurOverlayRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            onComplete: closeTrailerModal
        });
    }


    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Something went wrong. Please try again later.</p>}
            <div
                className='backdropOverlay visible'
                ref={blurOverlayRef}
                onClick={closeOverlay}
            >
                {trailer && (
                    <div className={styles.yt}>
                        <YouTube
                            videoId={trailer[0].key}
                        />
                    </div>
                )}

            </div>
        </>
    )
}
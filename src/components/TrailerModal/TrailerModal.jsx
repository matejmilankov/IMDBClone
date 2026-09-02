import { useMovieTrailer } from "../../hooks/useMovieTrailer";
import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import YouTube from "react-youtube";
import styles from './TrailerModal.module.css'

export function TrailerModal({ clickedTrailerId, closeTrailerModal }) {

    const { trailer, error, isLoading } = useMovieTrailer(clickedTrailerId);
    console.log(trailer);

    const blurOverlayRef = useRef(null);
    const modalRef = useRef(null)

    useGSAP(() => {
        gsap.to(blurOverlayRef.current, {
            opacity: 1,
            pointerEvents: 'auto',
            duration: 0.3
        });
    });

    const closeOverlay = () => {
        if (modalRef.current) {
            gsap.to(modalRef.current, { scale: 0, opacity: 0, duration: 0.5 });
        }
        gsap.to(blurOverlayRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            onComplete: closeTrailerModal
        });
    }

    useEffect(() => {
        const handleEscKey = (event) => {
            if(event.key === 'Escape') {
                closeOverlay();
            }
        }
        window.addEventListener('keydown', handleEscKey);

        return () => window.removeEventListener('keydown', handleEscKey);
    },  []);


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
                    <div className={styles.yt} ref={modalRef}>
                        <YouTube
                            videoId={trailer[0].key}
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
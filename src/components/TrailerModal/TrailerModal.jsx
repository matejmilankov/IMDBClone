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
            duration: 0.3,
            onComplete: () => {
                document.body.style.overflow = 'hidden'
            }
        });
    });

    const closeOverlay = () => {
        if (modalRef.current) {
            gsap.to(modalRef.current, { scale: 0.8, opacity: 0, duration: 0.5 });
        }
        gsap.to(blurOverlayRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            onComplete: () => {
                closeTrailerModal();
                document.body.style.overflow = 'unset';
            }
        });
    }

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                closeOverlay();
            }
        }
        window.addEventListener('keydown', handleEscKey);

        return () => window.removeEventListener('keydown', handleEscKey);
    }, []);


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
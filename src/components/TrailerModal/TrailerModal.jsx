import { useMovieTrailer } from "../../hooks/useMovieTrailer";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

export function TrailerModal({ clickedTrailerId }) {
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
            duration: 0.3
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
            />

        </>
    )
}
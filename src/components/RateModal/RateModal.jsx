import { useRef } from "react"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

export function RateModal({ closeRateModal, clickedMovieTitle }) {
    const blurOverlayRef = useRef(null);
    console.log("Renderovan sam")

    const closeOverlay = () => {
        gsap.to(blurOverlayRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            onComplete: () => {
                closeRateModal();
                document.body.style.overflow = 'unset';
            }
        });
    }

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

    return (
        <>
            <div
                className='backdropOverlay visible'
                ref={blurOverlayRef}
                onClick={closeOverlay}
            >
                <span>{clickedMovieTitle}</span>
            </div>
        </>
    )
}
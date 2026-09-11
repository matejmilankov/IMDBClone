import { useGSAP } from "@gsap/react";
import { useRef, useEffect, useCallback } from "react";
import gsap from 'gsap';

export function useModalTransition(onClose, contentRef) {
    const blurOverlayRef = useRef(null);

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

    const closeOverlay = useCallback(() => {
        if (contentRef?.current) {
            gsap.to(contentRef.current, { scale: 0.8, opacity: 0, duration: 0.5 });
        }
        gsap.to(blurOverlayRef.current, {
            opacity: 0,
            pointerEvents: 'none',
            duration: 0.3,
            onComplete: () => {
                onClose();
                document.body.style.overflow = 'unset';
            }
        });
    }, [onClose, contentRef]);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === 'Escape') {
                closeOverlay();
            }
        }
        window.addEventListener('keydown', handleEscKey);

        return () => window.removeEventListener('keydown', handleEscKey);
    }, [closeOverlay]);

    return {closeOverlay, blurOverlayRef}
}
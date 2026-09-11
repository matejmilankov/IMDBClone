import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

export function useEnterOnLoad({ isLoading, data, contentRef, inView = true }) {
    useGSAP(() => {
        if (!isLoading && data.length > 0 && inView) {
            gsap.from(contentRef.current, {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut"
            });
        }
    }, [isLoading, data, inView]);
}
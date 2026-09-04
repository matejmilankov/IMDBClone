import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';
import styles from './RateModal.module.css'
import { StarIcon } from "../Icons/Icons";

export function RateModal({ closeRateModal, clickedMovieTitle }) {
    const blurOverlayRef = useRef(null);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [rating, setRating] = useState(0);

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

    const lockRating = (event, starNumber) => {
        setRating(starNumber);
        event.stopPropagation();
    }

    return (
        <>
            <div
                className='backdropOverlay visible'
                ref={blurOverlayRef}
                onClick={closeOverlay}
            >
                <div className={styles.rateModalWrapper}>
                    <span>Rate this</span>
                    <span>{clickedMovieTitle}</span>
                    <div className={styles.stars}>
                        {Array.from({ length: 10 }).map((_, index) => {
                            const starNumber = index + 1;
                            return (
                                <button
                                    key={starNumber}
                                    onMouseEnter={() => setHoveredRating(starNumber)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                    onClick={(event) => lockRating(event, starNumber)}
                                >
                                    <StarIcon
                                        width="24px"
                                        height="24px"
                                        filled={
                                            hoveredRating
                                                ? starNumber <= hoveredRating
                                                : starNumber <= rating
                                        }
                                    />
                                </button>
                            )
                        })}
                    </div>
                    <button>
                        Rate
                    </button>
                </div>
            </div>
        </>
    )
}
import { useState, useRef } from "react"
import { useModalTransition } from "../../hooks/useModalTransition";
import { StarIcon, CloseIcon } from "../Icons/Icons";
import { useGSAP } from "@gsap/react";
import styles from './RateModal.module.css';
import gsap from 'gsap';

export function RateModal({ closeRateModal, clickedMovieTitle }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [rating, setRating] = useState(0);

    const ratingIconRef = useRef(null);

    const { closeOverlay, blurOverlayRef } = useModalTransition(closeRateModal);

    const lockRating = (event, starNumber) => {
        setRating(starNumber);
        event.stopPropagation();
    }

    useGSAP(() => {
        if(rating !== 0) {
            gsap.to(ratingIconRef?.current, {
                scale: 1.1, duration: 0.3, ease: "power2.inOut"
            });
        }
    }, [rating]);

    return (
        <>
            <div
                className='backdropOverlay visible'
                ref={blurOverlayRef}
                onClick={closeOverlay}
            >
                <div className={styles.rateModalWrapper}>
                    <div className={styles.rateModalContent}>
                        <span className={styles.rateModalPreHeader}>Rate this</span>
                        <span className={styles.rateModalTitle}>{clickedMovieTitle}</span>
                        <div
                            className={styles.stars}
                            onMouseLeave={() => setHoveredRating(0)}
                        >
                            {Array.from({ length: 10 }).map((_, index) => {
                                const starNumber = index + 1;
                                return (
                                    <button
                                        key={starNumber}
                                        onMouseEnter={() => setHoveredRating(starNumber)}
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
                        <button
                            className={styles.rateButton}
                            disabled={rating === 0}
                        >
                            Rate
                        </button>
                    </div>
                    <button className={styles.closeButton}>
                        <CloseIcon />
                    </button>
                    <div className={styles.bigRateIcon} ref={ratingIconRef}>
                        <StarIcon 
                            width="120px" 
                            height="120px" 
                            filled={true} 
                        />
                        <span>{rating === 0 ? "?" : rating}</span>
                    </div>

                </div>
            </div>
        </>
    )
}
import { useState } from "react"
import { useModalTransition } from "../../hooks/useModalTransition";
import styles from './RateModal.module.css'
import { StarIcon } from "../Icons/Icons";

export function RateModal({ closeRateModal, clickedMovieTitle }) {
    const [hoveredRating, setHoveredRating] = useState(0);
    const [rating, setRating] = useState(0);

    const {closeOverlay, blurOverlayRef} = useModalTransition(closeRateModal);

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
                    <div className={styles.rateModalContent}>
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
            </div>
        </>
    )
}
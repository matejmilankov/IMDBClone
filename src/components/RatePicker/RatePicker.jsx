import { StarIcon } from "../Icons/Icons";
import { useRateModal } from "../../contexts/Rate/RateContext";
import styles from './RatePicker.module.css';

export function RatePicker({ variant, iconWidth, iconHeight, movie }) {
    const { openRateModal, getRating } = useRateModal();

    const currentRating = getRating(movie.id);
    console.log(currentRating);

    return (
        <button
            className={styles.ratePickerWrapper}
            onClick={() => openRateModal(movie)}
        >
            <StarIcon
                width={iconWidth}
                height={iconHeight}
                filled={currentRating > 0}
            />
            {currentRating !== 0 && variant === "small" && (
                <span className={styles.currentRating}>{currentRating}</span>
            )}
            {variant === 'large' && (
                <span>Rate</span>
            )}
        </button>
    )
}
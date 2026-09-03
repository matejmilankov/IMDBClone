import { StarIcon } from "../Icons/Icons";
import { useRateModal } from "../../contexts/Rate/RateContext";
import styles from './RatePicker.module.css';

export function RatePicker({ variant, iconWidth, iconHeight, movieTitle }) {
    const { openRateModal } = useRateModal();

    return (
        <button 
            className={styles.ratePickerWrapper}
            onClick={() => openRateModal(movieTitle)}
        >
            <StarIcon
                width={iconWidth}
                height={iconHeight}
            />
            {variant === 'large' && (
                <span>Rate</span>
            )}
        </button>
    )
}
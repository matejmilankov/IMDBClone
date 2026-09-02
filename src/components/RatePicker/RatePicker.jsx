import { StarIcon } from "../Icons/Icons";
import styles from './RatePicker.module.css';

export function RatePicker({ variant, iconWidth, iconHeight }) {
    return (
        <button className={styles.ratePickerWrapper}>
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
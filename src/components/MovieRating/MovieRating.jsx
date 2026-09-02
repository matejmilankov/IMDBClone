import { FilledStarIcon } from "../Icons/Icons"
import styles from './MovieRating.module.css';

export function MovieRating({ rating }) {

    return (
        <div className={styles.movieRatingWrapper}>
            <FilledStarIcon width="14px" height="14px" />
            <span>{rating.toFixed(1)}</span>
        </div>
    )
}
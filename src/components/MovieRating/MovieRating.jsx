import { FilledStarIcon } from "../Icons/Icons"
import styles from './MovieRating.module.css';

export function MovieRating({ rating, variant = "simple", voteCount }) {

    return (
        <div className={styles.movieRatingWrapper}>
            <FilledStarIcon width="14px" height="14px" />
            <div>
                <span>{rating.toFixed(1)}</span>
                {variant === "divided" && <span>/10</span>}
                {voteCount && <span>({voteCount})</span>}
            </div>
        </div>
    )
}
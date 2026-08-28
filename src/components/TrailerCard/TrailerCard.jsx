import styles from './TrailerCard.module.css'
import clsx from 'clsx';
import { PlayIcon, LikeIcon, BigWatchlistIcon } from "../../components/Icons/Icons";

export function TrailerCard({ movie, variant }) {

    const formatRuntime = (minutes) => {
        const min = minutes % 60;
        return `${Math.floor(minutes / 60)}:${min < 10 ? `0${min}` : min}`
    }

    return (
        <div className={clsx(styles.heroSlideWrap, styles[variant])}>
            <div className={styles.coverImageWrapper}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                {variant === 'large' && (
                    <button className={styles.addToWatchlist}>
                        <BigWatchlistIcon
                            bookmarkWidth={"34px"}
                            bookmarkHeight={"47px"}
                            plusHeight={"24px"}
                            plusWidth={"24px"}
                        />
                    </button>
                )}
            </div>
            <div className={styles.heroSlideContent}>
                <button>
                    <PlayIcon width={"72px"} height={"72px"} />
                    {variant === 'small' && (
                        <span className={styles.movieRuntime}>{formatRuntime(movie.runtime)}</span>
                    )}
                </button>
                <div className={styles.heroSlideInfo}>
                    <div className={styles.heroSlideInfoHeader}>
                        <span className={styles.movieTitle}>'{movie.title}'</span>
                        {variant === 'large' && (
                            <span className={styles.movieRuntime}>{formatRuntime(movie.runtime)}</span>
                        )}
                    </div>
                    <span className={styles.trailerHeading}>Watch the Trailer</span>
                    <div className={styles.voteWrapper}>
                        <LikeIcon />
                        <span>{movie.vote_count}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
import { BigWatchlistIcon, PlusIcon, CheckIcon } from "../Icons/Icons";
import { useWatchlist } from "../../contexts/Watchlist/WatchlistContext";
import styles from './WatchlistButton.module.css'

export function WatchlistButton({ movie, variant = 'bookmark' }) {
    const { toggleWatchlist, isInWatchlist } = useWatchlist();

    const handleClick = (event) => {
        event.stopPropagation();
        toggleWatchlist(movie);
    }

    if (variant === 'wide') {
        return (
            <button className={styles.wideWatchlistButton}
                onClick={handleClick}
            >
                {isInWatchlist(movie.id) ? (
                    <CheckIcon 
                        width={"20px"}
                        height={"20px"}
                    />
                ) : (
                    <PlusIcon
                        plusWidth={"20px"}
                        plusHeight={"20px"}
                    />
                )}
                <span>Watchlist</span>
            </button>
        )
    }

    return (
        <button className={styles.addToWatchlist}
            onClick={handleClick}
        >
            <BigWatchlistIcon
                bookmarkWidth="34px"
                bookmarkHeight="47px"
                plusHeight="24px"
                plusWidth="24px"
                fill={isInWatchlist(movie.id) ? "#F5C518" : "rgba(0, 0, 0, 0.6)"}
            />
        </button>
    )
}
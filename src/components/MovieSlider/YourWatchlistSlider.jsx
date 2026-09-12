import { MovieSlider } from "./MovieSlider";
import { useWatchlist } from "../../contexts/Watchlist/WatchlistContext";
import { WatchlistIcon } from "../Icons/Icons";
import styles from './Slider.module.css';
import clsx from "clsx";

export function YourWatchlistSlider() {
    const { watchlist } = useWatchlist();
    console.log(watchlist)

    return (
        <div className={styles.sliderWrapper}>
            {watchlist.length > 0 ? (
                <MovieSlider
                    movies={watchlist}
                    variant="reduced"
                />
            ) : (
                <div className={styles.infoWrapper}>
                    <WatchlistIcon 
                        width="32px"
                        height="32px"
                    />
                    <h3>Sign in to access your Watchlist</h3>
                    <span>Save shows and movies to keep track of what you want to watch.</span>
                </div>
            )
            }
        </div>
    )
}
import styles from './MovieCard.module.css'
import { WatchlistButton } from '../WatchlistButton/WatchlistButton';
import { MovieRating } from '../MovieRating/MovieRating';
import { RatePicker } from '../RatePicker/RatePicker';
import { SmallPlayIcon, InfoIcon } from '../Icons/Icons';
import { useTrailerModal } from '../../contexts/Trailer/TrailerContext';
import { useMovieDetailsModal } from '../../contexts/MovieDetails/MovieDetailsContext';

export function MovieCard({ movie }) {
    const { openTrailerModal } = useTrailerModal();
    const { openMovieDetailsModal } = useMovieDetailsModal();

    return (
        <div className={styles.moviCardWrapper}>
            <div className={styles.movieCardPoster}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                <WatchlistButton movie={movie} />
            </div>

            <div className={styles.moviCardDesc}>
                <div className={styles.movieCardInfo}>
                    <div className={styles.ratingWrap}>
                        <MovieRating rating={movie.vote_average} />
                        <RatePicker
                            iconHeight="16px"
                            iconWidth="16px"
                            movie={movie}
                            variant="small"
                        />
                    </div>
                    <span>{movie.title}</span>
                </div>

                <div>
                    <WatchlistButton
                        variant='wide'
                        movie={movie}
                    />

                    <div className={styles.moviCardAction}>
                        <button onClick={() => openTrailerModal(movie.id)}>
                            <SmallPlayIcon />
                            <span>Trailer</span>
                        </button>
                        <button onClick={() => openMovieDetailsModal(movie.id)}>
                            <InfoIcon />
                        </button>
                    </div>
                </div>
                
            </div>

        </div>
    )
}
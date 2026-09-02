import styles from './MovieCard.module.css'
import { WatchlistButton } from '../WatchlistButton/WatchlistButton'
import { MovieRating } from '../MovieRating/MovieRating'

export function MovieCard({ movie }) {
    return (
        <div className={styles.moviCardWrapper}>
            <div className={styles.movieCardPoster}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                <WatchlistButton movie={movie} />
            </div>
            <div className={styles.moviCardDesc}>
                <div className={styles.ratingWrap}>
                    <MovieRating rating={movie.vote_average} />
                </div>
                {movie.title}
                <WatchlistButton 
                    variant='wide' 
                    movie={movie}
                />
            </div>
        </div>
    )
}
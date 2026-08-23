import styles from './CompactMovieCard.module.css'

export function CompactMovieCard({ movie }) {
    return (
        <div className={styles.movieCard}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            <div>{movie.original_title}</div>
        </div>
    );
}
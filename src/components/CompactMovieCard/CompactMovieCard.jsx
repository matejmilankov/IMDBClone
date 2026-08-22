import styles from './CompactMovieCard.module.css'

export function CompactMovieCard({ movie }) {
    return (
        <div className={styles.movie}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            <p>{movie.original_title}</p>
        </div>
    );
}
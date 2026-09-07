import styles from './MovieHeader.module.css';
import { ArrowIcon } from '../Icons/Icons';
import { Link } from 'react-router';
import { convertDate } from '../../utils';
import { formatRuntime } from '../../utils';

export function MovieHeader({ movieDetails }) {
    return (
        <div>
            <Link className={styles.titleWrapper} to={`/${movieDetails.id}`}>
                <span className={styles.movieTitle}>{movieDetails.title}</span>
                <ArrowIcon 
                    width="20px"
                    height="20px"
                    color="#fff"
                />
            </Link>
            <div className={styles.shortInfo}>
                <span>{convertDate(movieDetails.release_date)}</span>
                <span> · </span>
                <span>{formatRuntime(movieDetails.runtime, 'details')}</span>
            </div>
        </div>
    )
}
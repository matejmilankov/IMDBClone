import styles from './TrailerCard.module.css'
import clsx from 'clsx';
import gsap from 'gsap';
import { PlayIcon, LikeIcon, BigWatchlistIcon } from "../../components/Icons/Icons";
import { useEffect, useRef } from 'react';
import { useSwiperSlide } from 'swiper/react';
import { useWatchlist } from '../../contexts/WatchlistContext';

export function TrailerCard({ movie, variant }) {
    const contentRef = useRef(null);
    const swiperSlide = useSwiperSlide();
    const { toggleWatchlist, isInWatchlist } = useWatchlist();

    useEffect(() => {
        if(swiperSlide?.isActive && variant === 'large' && contentRef.current) {
            gsap.fromTo(contentRef.current, 
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6 }
            );
        }
    }, [swiperSlide?.isActive, variant]);

    const formatRuntime = (minutes) => {
        const min = minutes % 60;
        return `${Math.floor(minutes / 60)}:${min < 10 ? `0${min}` : min}`
    }

    return (
        <div className={clsx(styles.heroSlideWrap, styles[variant])} ref={contentRef}>
            <div className={styles.coverImageWrapper}>
                <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt={movie.title} />
                {variant === 'large' && (
                    <button className={styles.addToWatchlist} 
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleWatchlist(movie)
                            }}
                    >
                        <BigWatchlistIcon
                            bookmarkWidth={"34px"}
                            bookmarkHeight={"47px"}
                            plusHeight={"24px"}
                            plusWidth={"24px"}
                            fill={isInWatchlist(movie.id) ? "#F5C518" : "rgba(0, 0, 0, 0.6)"}
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
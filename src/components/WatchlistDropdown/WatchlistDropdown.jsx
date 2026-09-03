import { useRef, useState, useEffect } from "react"
import { useWatchlist } from '../../contexts/Watchlist/WatchlistContext';
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import { WatchlistIcon } from "../Icons/Icons";
import gsap from 'gsap';
import styles from './WatchlistDropdown.module.css';

export function WathchlistDropdown() {
    const { watchlist } = useWatchlist();

    const watchlistRef = useRef(null);
    const dropdownRef = useRef(null);
    const dropdownTimeline = useRef(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [prevWatchlistLength, setPrevWatchlistLength] = useState(watchlist.length);
    const [autoCloseTrigger, setAutoCloseTrigger] = useState(0);


    // Handle open and close dropdown menu
    const toggleDropdown = () => {
        if (isDropdownOpen) {
            dropdownTimeline.current?.reverse().then(() => {
                setIsDropdownOpen(prev => !prev);
            });
        } else {
            setIsDropdownOpen(prev => !prev);
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isDropdownOpen && watchlistRef.current && !watchlistRef.current.contains(event.target))
                dropdownTimeline.current?.reverse().then(() => {
                    setIsDropdownOpen(false);
                });
        }
        document.addEventListener('click', handleClickOutside);

        return () => document.removeEventListener('click', handleClickOutside);
    }, [isDropdownOpen]);

    useGSAP(() => {
        if (dropdownRef.current) {
            dropdownTimeline.current = gsap.timeline()
                .fromTo(dropdownRef.current,
                    { opacity: 0, y: -10 },
                    { opacity: 1, y: 0 });
        }
    }, [isDropdownOpen]);


    // Auto open and close dropdown
    if (prevWatchlistLength !== watchlist.length) {
        const grew = watchlist.length > prevWatchlistLength;
        setPrevWatchlistLength(watchlist.length);

        if (grew) {
            setIsDropdownOpen(true);
            setAutoCloseTrigger(prev => prev + 1);
        }
    }
    useEffect(() => {
        if (autoCloseTrigger === 0) return;

        const timerId = setTimeout(() => {
            if (dropdownTimeline.current) {
                dropdownTimeline.current.reverse().then(() => {
                    setIsDropdownOpen(false);
                });
            } else {
                setIsDropdownOpen(false);
            }
        }, 2000);

        return () => clearTimeout(timerId);
    }, [autoCloseTrigger]);

    return (
        <>
            <div className={styles.watchlistButton} ref={watchlistRef}>
                <button className='headerLink' onClick={toggleDropdown}>
                    <WatchlistIcon />
                    <span>Watchlist</span>
                    {watchlist.length > 0 && (
                        <span className={styles.watchlistNumber}>
                            {watchlist.length}
                        </span>
                    )}
                </button>
                {isDropdownOpen && (
                    <div className={styles.watchlistDropdown} ref={dropdownRef}>
                        {watchlist.length > 0 ? (
                            watchlist.map(movie => (
                                <div key={movie.id} className={styles.watchlistDropdownItem}>
                                    <img src={`https://image.tmdb.org/t/p/w92/${movie.poster_path}`}
                                        alt={movie.title}
                                    />
                                    <span>{movie.title}</span>
                                </div>
                            ))
                        ) : (
                            <p>The watchlist is empty</p>
                        )}
                        {watchlist.length > 0 && (
                            <Link>
                                View all
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
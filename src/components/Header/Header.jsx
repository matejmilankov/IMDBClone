import styles from './Header.module.css'
import gsap from 'gsap';
import { useRef, useEffect, useState } from 'react'
import { useWatchlist } from '../../contexts/WatchlistContext';
import { Link } from 'react-router';
import { useGSAP } from '@gsap/react'
import { LogoIcon, HamburgerIcon, ImdbProIcon, WatchlistIcon, ProfileIcon } from '../Icons/Icons';
import { SearchBar } from '../SearchBar/SearchBar';
import { Menu } from '../Menu/Menu';

export function Header() {
    const { watchlist } = useWatchlist();

    const menuWrapperRef = useRef(null);
    const watchlistRef = useRef(null);
    const dropdownRef = useRef(null);

    const menuTimeline = useRef(null);
    const dropdownTimeline = useRef(null);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [prevWatchlistLength, setPrevWatchlistLength] = useState(watchlist.length);
    const [autoCloseTrigger, setAutoCloseTrigger] = useState(0);

    // Timeline animation for opening and closing menu
    useGSAP(() => {
        menuTimeline.current = gsap.timeline({ paused: true })
            .to(menuWrapperRef.current, {
                y: 0,
                duration: 0.5,
                ease: "power2.out"
            });
    });
    const openMenu = () => menuTimeline.current?.play();
    const closeMenu = () => menuTimeline.current?.reverse();

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
            <Menu 
                closeMenu={closeMenu}
                menuWrapperRef={menuWrapperRef}    
            />
            <nav className={styles.headerWrapper}>
                <div className='container'>
                    <div className={styles.headerContainer}>
                        <LogoIcon />

                        <button className={styles.menuButton} onClick={openMenu}>
                            <HamburgerIcon />
                            <span>Menu</span>
                        </button>

                        <SearchBar />

                        <a href="#" className={styles.headerLink}>
                            <ImdbProIcon />
                        </a>

                        <hr className={styles.line} />

                        <div className={styles.watchlistButton} ref={watchlistRef}>
                            <button className={styles.headerLink} onClick={toggleDropdown}>
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

                        <button className={styles.menuButton}>
                            <ProfileIcon />
                            <span>Matej</span>
                        </button>

                    </div>
                </div>
            </nav>
        </>
    )
}
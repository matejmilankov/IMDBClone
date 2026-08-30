import styles from './Header.module.css'
import searchIcon from '../../assets/search-svgrepo-com.svg'
import gsap from 'gsap';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react'
import { useWatchlist } from '../../contexts/WatchlistContext';
import { Link } from 'react-router';
import { useGSAP } from '@gsap/react'
import { CompactMovieCard } from '../CompactMovieCard/CompactMovieCard';
import { LogoIcon, HamburgerIcon, ImdbProIcon, WatchlistIcon, ProfileIcon, CloseIcon, MovieIcon, WatchIcon, TvIcon, EventsIcon, UserIcon, GlobeIcon } from '../Icons/Icons';

export function Header() {
    const { watchlist } = useWatchlist();

    const searchFormRef = useRef(null);
    const blurOverlayRef = useRef(null);
    const searchWrapperRef = useRef(null);
    const menuWrapperRef = useRef(null);
    const watchlistRef = useRef(null);
    const dropdownRef = useRef(null);

    const searchTimeline = useRef(null);
    const menuTimeline = useRef(null);
    const dropdownTimeline = useRef(null);

    const [searchInput, setSearchInput] = useState("");
    const [movies, setMovies] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [prevWatchlistLength, setPrevWatchlistLength] = useState(watchlist.length);
    const [autoCloseTrigger, setAutoCloseTrigger] = useState(0);

    // Fetching movies from API
    useEffect(() => {
        if (searchInput.length < 3) return;
        const timer = setTimeout(async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/search/movie",
                    {
                        params: { query: searchInput },
                        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` }
                    }
                );
                setMovies(response.data.results);

            } catch {
                console.error("Error, couldn't load movies");
                setMovies([]);
            }

        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    // Timeline animation for searchbar
    useGSAP(() => {
        searchTimeline.current = gsap.timeline({ paused: true })
            .to(blurOverlayRef.current, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3
            })
            .to(searchFormRef.current, {
                scale: 1.1,
                y: 5,
                transformOrigin: "center center",
                duration: 0.3
            }, "<");
    });

    // Animation for searched movies
    useGSAP(() => {
        if (movies.length > 0 && searchWrapperRef.current) {
            gsap.fromTo(searchWrapperRef.current,
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [movies]);


    // Handlers for opening and closing searhcbar
    const openSearchbar = () => {
        searchTimeline.current?.play();
        document.body.style.overflow = 'hidden';
    }
    const closeSearchbar = () => {
        if (searchWrapperRef.current) {
            gsap.to(searchWrapperRef.current, {
                opacity: 0,
                y: 15,
                duration: 0.3
            })
        }

        searchTimeline.current?.reverse().then(() => {
            setSearchInput("");
            setMovies([]);
            document.body.style.overflow = 'unset';
        });
    }

    // Handler for searched movie
    const searchForResults = (event) => {
        const query = event.target.value;
        setSearchInput(query);
        if (query.trim().length < 3) setMovies([]);
    }

    const handleSubmit = (event) => event.preventDefault();

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
    if(prevWatchlistLength !== watchlist.length) {
        const grew = watchlist.length > prevWatchlistLength;
        setPrevWatchlistLength(watchlist.length);

        if(grew) {
            setIsDropdownOpen(true);
            setAutoCloseTrigger(prev => prev + 1);
        }
    }
    useEffect(() => {
        if (autoCloseTrigger === 0) return;

        const timerId = setTimeout(() => {
            if(dropdownTimeline.current) {
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
            <div
                ref={blurOverlayRef}
                className={styles.backdropOverlay}
                onClick={closeSearchbar}
            />

            <div className={styles.searchWrapper} ref={searchWrapperRef}>
                {movies.map(movie => (
                    <Link to={`/movie/${movie.id}`}
                        className={styles.compactMovieCard}
                        key={movie.id}
                    >
                        <CompactMovieCard movie={movie} />
                    </Link>
                ))}
            </div>

            <div className={styles.menuWrapper} ref={menuWrapperRef}>
                <div className='container'>
                    <div className={styles.menuHeader}>
                        <LogoIcon />
                        <button className={styles.closeButton} onClick={closeMenu}>
                            <CloseIcon />
                        </button>
                    </div>

                    <div className={styles.menuItems}>
                        <div className={styles.menuItem}>
                            <MovieIcon />
                            <div className={styles.menuLinks}>
                                <span>Movies</span>
                                <a href="#">Release calendar</a>
                                <a href="#">Top 250 movies</a>
                                <a href="#">Most popular movies</a>
                                <a href="#">Browse movies by gender</a>
                                <a href="#">Top box office</a>
                                <a href="#">Showtimes & tickes</a>
                                <a href="#">Movie news</a>
                                <a href="#">India movie spotlight</a>
                            </div>
                        </div>
                        <div className={styles.doubleMenuItem}>
                            <div className={styles.menuItem}>
                                <TvIcon />
                                <div className={styles.menuLinks}>
                                    <span>TV Shows</span>
                                    <a href="#">What's on TV & streaming</a>
                                    <a href="#">Top 250 TV shows</a>
                                    <a href="#">Most popular TV shows</a>
                                    <a href="#">Browse TV Shows by gender</a>
                                    <a href="#">TV News</a>
                                </div>
                            </div>
                            <div className={styles.menuItem}>
                                <WatchIcon />
                                <div className={styles.menuLinks}>
                                    <span>Watch</span>
                                    <a href="#">What to watch</a>
                                    <a href="#">Latest trailers</a>
                                    <a href="#">IMDb Originals</a>
                                    <a href="#">IMDb picks</a>
                                    <a href="#">IMDb Spotlight</a>
                                    <a href="#">Family entertainments guide</a>
                                    <a href="#">IMDb Podcasts</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <EventsIcon />
                            <div className={styles.menuLinks}>
                                <span>Awards & events</span>
                                <a href="#">Oscars</a>
                                <a href="#">Primetime Emmys</a>
                                <a href="#">Disney D23</a>
                                <a href="#">Summer Watch Guide</a>
                                <a href="#">Most Anticipated This Month</a>
                                <a href="#">STARmeter Awards</a>
                                <a href="#">Awards Central</a>
                                <a href="#">Festival Central</a>
                                <a href="#">All events</a>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <UserIcon />
                            <div className={styles.menuLinks}>
                                <span>Celebs</span>
                                <a href="#">Born today</a>
                                <a href="#">Trending people</a>
                                <a href="#">Celebrity news</a>
                            </div>
                        </div>
                        <div className={styles.menuItem}>
                            <GlobeIcon />
                            <div className={styles.menuLinks}>
                                <span>Community</span>
                                <a href="#">IMDb Labs</a>
                                <a href="#">Help center</a>
                                <a href="#">Contributor zone</a>
                                <a href="#">Polls</a>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <nav className={styles.headerWrapper}>
                <div className='container'>
                    <div className={styles.headerContainer}>
                        <LogoIcon />

                        <button className={styles.menuButton} onClick={openMenu}>
                            <HamburgerIcon />
                            <span>Menu</span>
                        </button>

                        <form onSubmit={handleSubmit} className={styles.searchForm} ref={searchFormRef}>
                            <input
                                type="text"
                                placeholder='Search movies...'
                                onFocus={openSearchbar}
                                onChange={searchForResults}
                                name='movies'
                                value={searchInput}
                            />
                            <button type='submit' className={styles.searchButton}>
                                <img src={searchIcon} alt="" />
                            </button>
                        </form>

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
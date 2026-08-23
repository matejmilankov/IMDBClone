import styles from './Header.module.css'
import searchIcon from '../../assets/search-svgrepo-com.svg'
import gsap from 'gsap';
import axios from 'axios';
import { useRef, useEffect, useState } from 'react'
import { useGSAP } from '@gsap/react'
import { CompactMovieCard } from '../CompactMovieCard/CompactMovieCard';
import { LogoIcon, HamburgerIcon, ImdbProIcon, WatchlistIcon, ProfileIcon, CloseIcon } from '../Icons/Icons';

export function Header() {
    const searchForm = useRef(null);
    const blurOverlay = useRef(null);
    const searchWrapper = useRef(null);
    
    const menuWrapper = useRef(null);

    const searchTimeline = useRef(null);
    const menuTimeline = useRef(null);

    const [searchInput, setSearchInput] = useState("");
    const [movies, setMovies] = useState([]);

    // Fetching movies from API
    useEffect(() => {
        if (searchInput.length < 3) return;
        const timer = setTimeout(async () => {
            try {
                const response = await axios.get("https://api.themoviedb.org/3/search/movie",
                    {
                        params: {
                            query: searchInput
                        },
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
                        }
                    }
                );
                setMovies(response.data.results);

            } catch {
                console.log("Error, couldn't load movies.");
            }

        }, 500);

        return () => clearTimeout(timer);
    }, [searchInput]);

    // Timeline animation for searchbar
    useGSAP(() => {
        searchTimeline.current = gsap.timeline({ paused: true })
            .to(blurOverlay.current, {
                opacity: 1,
                pointerEvents: 'auto',
                duration: 0.3
            })
            .to(searchForm.current, {
                scale: 1.1,
                y: 5,
                transformOrigin: "center center",
                duration: 0.3
            }, "<");
    });

    // Animation for searched movies
    useGSAP(() => {
        if(movies.length > 0 && searchWrapper.current) {
            gsap.fromTo(searchWrapper.current, 
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out"}
            );
        }
    }, [movies]);


    // Handlers for opening and closing searhcbar
    const openSearchbar = () => searchTimeline.current?.play();
    const closeSearchbar = () => {
        if (searchWrapper.current) {
            gsap.to(searchWrapper.current, {
                opacity: 0,
                y: 15,
                duration: 0.3
            })
        }

        searchTimeline.current?.reverse().then(() => {
            setSearchInput("");
            setMovies([]);
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
        menuTimeline.current = gsap.timeline({ paused: true})
            .to(menuWrapper.current, {
                y: 0,
                duration: 0.8,
                ease: "power2.out"
            });
    });
    const openMenu = () => menuTimeline.current?.play();
    const closeMenu = () => menuTimeline.current?.reverse();

    return (
        <>
            <div
                ref={blurOverlay}
                className={styles.backdropOverlay}
                onClick={closeSearchbar}
            />

            <div className={styles.searchWrapper} ref={searchWrapper}>
                {movies.map(movie => (
                    <CompactMovieCard
                        key={movie.id}
                        movie={movie}
                    />
                ))}
            </div>

            <div className={styles.menuWrapper} ref={menuWrapper}>
                <div className='container'>
                    <div className={styles.menuHeader}>
                        <LogoIcon />
                        <button className={styles.closeButton} onClick={closeMenu}>
                            <CloseIcon />
                        </button>
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

                        <form onSubmit={handleSubmit} className={styles.searchForm} ref={searchForm}>
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

                        <a href="#" className={styles.headerLink}>
                            <WatchlistIcon />
                            <span>Watchlist</span>
                        </a>

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
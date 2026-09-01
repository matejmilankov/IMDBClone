import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router";
import { CompactMovieCard } from "../CompactMovieCard/CompactMovieCard";
import axios from "axios";
import gsap from 'gsap';
import searchIcon from '../../assets/search-svgrepo-com.svg';
import styles from './SearchBar.module.css';

export function SearchBar() {
    const searchFormRef = useRef(null);
    const searchTimeline = useRef(null);
    const blurOverlayRef = useRef(null);
    const searchWrapperRef = useRef(null);

    const [searchInput, setSearchInput] = useState("");
    const [movies, setMovies] = useState([]);

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

    const handleSubmit = (event) => event.preventDefault();
    return (
        <>
            <div
                ref={blurOverlayRef}
                className='backdropOverlay'
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
        </>
    )
}
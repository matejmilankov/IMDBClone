import { useEffect, useState } from "react";
import { calculateHeroHeight } from '../utils.js';
import axios from "axios";

export function useNowPlayingMovies(count = 10) {
    const [heroMovies, setHeroMovies] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchHeroMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
                    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` }
                });

                const basicMovies = response.data.results.slice(0, count);

                const detailedMovies = await Promise.all(
                    basicMovies.map(async (movie) => {
                        const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
                            headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` }
                        });

                        return detailsResponse.data;
                    })
                );
                setHeroMovies(detailedMovies);
            } catch (err) {
                console.error("Error, couldn't load movies", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchHeroMovies();
        calculateHeroHeight();
    }, [count]);

    return { heroMovies, isLoading, error } 
}
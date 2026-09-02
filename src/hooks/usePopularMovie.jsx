import { useEffect, useState } from "react";
import axios from "axios";

export function usePopularMovies() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/upcoming', {
                    headers: {Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`}
                });
                console.log(response.data.results)
                setPopularMovies(response.data.results);
            } catch (err) {
                console.error("Error, couldn't load movies.", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchPopularMovies();

    }, []);
    
    return {popularMovies, error, isLoading}
}
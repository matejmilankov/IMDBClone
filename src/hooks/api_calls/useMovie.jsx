import { useEffect, useState } from "react";
import axios from "axios";

export function useMovie(movieId) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    headers: {Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`}
                });
                console.log(response.data);
                setMovieDetails(response.data)
            } catch(err) {
                console.error("Error, couldn't load movie details.", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        }

        fetchMovieDetails();
    }, [movieId]);

    return { movieDetails, isLoading, error }
}
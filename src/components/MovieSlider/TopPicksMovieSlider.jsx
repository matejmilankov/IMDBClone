import { usePopularMovies } from "../../hooks/api_calls/usePopularMovie";
import { MovieSlider } from "./MovieSlider";

export function TopPicksMovieSlider() {
    const {popularMovies, error, isLoading} = usePopularMovies();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;

    return <MovieSlider movies={popularMovies} />
}
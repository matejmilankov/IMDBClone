import { usePopularMovies } from "../../hooks/api_calls/usePopularMovie";
import { MovieSlider } from "./MovieSlider";
import { useInView } from "react-intersection-observer";

export function TopPicksMovieSlider() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1.0
    });
    const { popularMovies, error, isLoading } = usePopularMovies(inView);
    
    return (
        <div ref={ref} style={{minHeight: '350px', position: 'relative'}}>
            {isLoading && <p className="isLoading">Loading...</p>}
            {error && <p>Error...</p>}
            {inView ? <MovieSlider movies={popularMovies} /> : null}       
        </div>
    )
}
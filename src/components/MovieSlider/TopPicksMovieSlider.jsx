import { usePopularMovies } from "../../hooks/api_calls/usePopularMovie";
import { MovieSlider } from "./MovieSlider";
import { useInView } from "react-intersection-observer";
import { SkeletonPlaceholder } from "../SkeletonPlaceholder/SkeletonPlaceholder";

export function TopPicksMovieSlider() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1.0
    });
    const { popularMovies, error, isLoading } = usePopularMovies(inView);
    
    return (
        <div ref={ref} style={{position: 'relative'}}>
            {isLoading && <p className="isLoading">Loading...</p>}
            {error && <p>Error. Please try again later.</p>}
            {inView ? <MovieSlider movies={popularMovies} /> : <SkeletonPlaceholder />}       
        </div>
    )
}
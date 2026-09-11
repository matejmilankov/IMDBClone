import { usePopularMovies } from "../../hooks/api_calls/usePopularMovie";
import { MovieSlider } from "./MovieSlider";
import { useInView } from "react-intersection-observer";
import { SkeletonPlaceholder } from "../SkeletonPlaceholder/SkeletonPlaceholder";
import loaderAnimation from '../../assets/loading.json';
import { Lottie } from "lottie-react";

export function TopPicksMovieSlider() {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 1.0
    });
    const { popularMovies, error, isLoading } = usePopularMovies(inView);
    
    return (
        <div ref={ref} style={{position: 'relative'}}>
            {isLoading && (
                <Lottie 
                    src={loaderAnimation}
                    loop
                    autoplay
                    style={{width: 200, height: 200}}
                    className="isLoading"
                />
            )}
            {error && <p>Error. Please try again later.</p>}
            {inView ? <MovieSlider movies={popularMovies} /> : <SkeletonPlaceholder />}       
        </div>
    )
}
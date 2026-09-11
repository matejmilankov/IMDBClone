import { usePopularMovies } from "../../hooks/api_calls/usePopularMovie";
import { MovieSlider } from "./MovieSlider";
import { useInView } from "react-intersection-observer";
import { SkeletonPlaceholder } from "../SkeletonPlaceholder/SkeletonPlaceholder";
import { Lottie } from "lottie-react";
import { useRef } from "react";
import { useEnterOnLoad } from "../../hooks/animations/useEnterOnLoad";
import loaderAnimation from '../../assets/loading.json';

export function TopPicksMovieSlider() {
    const sliderRef = useRef(null);
    
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.9
    });

    const { popularMovies, error, isLoading } = usePopularMovies(inView);
    useEnterOnLoad(
        {
            isLoading,
            data: popularMovies,
            contentRef: sliderRef,
            inView
        }
    );
    
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
            {inView 
                ? <div ref={sliderRef}><MovieSlider movies={popularMovies} /></div> 
                : <SkeletonPlaceholder />
            }       
        </div>
    )
}
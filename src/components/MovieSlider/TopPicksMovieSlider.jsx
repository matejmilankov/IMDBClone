import { usePopularMovies } from "../../hooks/api_calls/usePopularMovie";
import { MovieSlider } from "./MovieSlider";
import { useInView } from "react-intersection-observer";
import { SkeletonPlaceholder } from "../SkeletonPlaceholder/SkeletonPlaceholder";
import { Lottie } from "lottie-react";
import { useEnterOnLoad } from "../../hooks/animations/useEnterOnLoad";
import loaderAnimation from '../../assets/loading.json';
import styles from './Slider.module.css';

export function TopPicksMovieSlider() {

    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.9
    });

    const { popularMovies, error, isLoading } = usePopularMovies(inView);
    const sliderRef = useEnterOnLoad(
        {
            isLoading,
            data: popularMovies,
            inView
        }
    );

    return (
        <div 
            ref={ref} 
            className={styles.sliderWrapper}
        >
            {isLoading && (
                <Lottie
                    src={loaderAnimation}
                    loop
                    autoplay
                    style={{ width: 200, height: 200 }}
                    className="isLoading"
                />
            )}
            {error && <p>Error. Please try again later.</p>}
            {inView
                ? (
                    <div ref={sliderRef}>
                        <MovieSlider movies={popularMovies} variant="standard" />
                    </div>
                )
                : (
                    <SkeletonPlaceholder />
                )
            }
        </div>
    )
}
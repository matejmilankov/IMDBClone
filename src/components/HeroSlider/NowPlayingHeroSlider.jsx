import { useNowPlayingMovies } from "../../hooks/api_calls/useNowPlayingMovies";
import { HeroSlider } from "./HeroSlider";
import { Lottie } from "lottie-react";
import { useEnterOnLoad } from "../../hooks/animations/useEnterOnLoad";
import loaderAnimation from '../../assets/loading.json';

export function NowPlayingHeroSlider() {
    const { heroMovies, isLoading, error } = useNowPlayingMovies(10);
    const sliderRef = useEnterOnLoad(
        {
            isLoading,
            data: heroMovies
        }
    );

    return (
        <>
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
            <HeroSlider heroMovies={heroMovies} ref={sliderRef} />
        </>
    )
}
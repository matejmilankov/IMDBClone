import { useNowPlayingMovies } from "../../hooks/api_calls/useNowPlayingMovies";
import { HeroSlider } from "./HeroSlider";
import loaderAnimation from '../../assets/loading.json';
import { Lottie } from "lottie-react";

export function NowPlayingHeroSlider() {
    const { heroMovies, isLoading, error } = useNowPlayingMovies(10);

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
            <HeroSlider heroMovies={heroMovies} />
        </>
    )
}
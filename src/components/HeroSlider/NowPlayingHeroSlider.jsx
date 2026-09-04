import { useNowPlayingMovies } from "../../hooks/api_calls/useNowPlayingMovies";
import { HeroSlider } from "./HeroSlider";

export function NowPlayingHeroSlider() {
    const { heroMovies, isLoading, error } = useNowPlayingMovies(10);

    return (
        <>
            {isLoading && <p>Loading...</p>}
            {error && <p>Please try again later.</p>}
            <HeroSlider heroMovies={heroMovies} />
        </>
    )
}
import { Header } from "../../components/Header/Header"
import { NowPlayingHeroSlider } from "../../components/HeroSlider/NowPlayingHeroSlider";
import { TopPicksMovieSlider } from "../../components/MovieSlider/TopPicksMovieSlider";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import { useTrailerModal } from "../../contexts/Trailer/TrailerContext";
import { TrailerModal } from "../../components/TrailerModal/TrailerModal";
import { RateModal } from "../../components/RateModal/RateModal";
import { useRateModal } from "../../contexts/Rate/RateContext";
import { MovieDetailsModal } from "../../components/MovieDetailsModal/MovieDetailsModal";
import { useMovieDetailsModal } from "../../contexts/MovieDetails/MovieDetailsContext";
import styles from './Home.module.css'

export function Home() {
    const { clickedTrailerId } = useTrailerModal();
    const { clickedMovie } = useRateModal();
    const { clickedMovieDetails } = useMovieDetailsModal();

    return (
        <>
            {clickedTrailerId && <TrailerModal />}
            {clickedMovie && <RateModal />}
            {clickedMovieDetails && <MovieDetailsModal />}
            
            <div className={styles.heroLayout}>
                <Header />
                <NowPlayingHeroSlider />

                <section className="container">
                    <SectionHeader
                        variant="standard"
                        preHeader="What to watch"
                        preHeaderLink="Get more recommendations"
                        header="Top picks"
                        headerDesc="Tv shows and movies just for you"
                    />
                    <TopPicksMovieSlider />
                </section>


                <section style={{ padding: "200px 0" }}></section>
            </div>
        </>
    )
}

import { Header } from "../../components/Header/Header"
import { HeroSlider } from "../../components/HeroSlider/HeroSlider";
import { useNowPlayingMovies } from "../../hooks/useNowPlayingMovies";
import { SectionHeader } from "../../components/SectionHeader/SectionHeader";
import styles from './Home.module.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Home() {
    const {heroMovies, isLoading, error} = useNowPlayingMovies(10);

    return (
        <>
            <div className={styles.heroLayout}>
                <Header />
                {isLoading && <p>Loading...</p>}
                {error && <p>Something went wrong. Please try again later.</p>}
                <HeroSlider heroMovies={heroMovies}/>
                <SectionHeader 
                    variant="standard"
                    preHeader="What to watch"
                    preHeaderLink="Get more recommendations"
                    header="Top picks"
                    headerDesc="Tv shows and movies just for you"
                />
                <section style={{padding:"200px 0"}}></section>
            </div>
        </>
    )
}

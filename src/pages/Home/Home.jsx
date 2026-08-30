import { Header } from "../../components/Header/Header"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import { TrailerCard } from "../../components/TrailerCard/TrailerCard";
import axios from "axios";
import styles from './Home.module.css'

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { calculateHeroHeight } from "../../utils";

export function Home() {

    const [heroMovies, setHeroMovies] = useState([]);
    const mainSwiper = useRef(null);
    const upNextSwiper = useRef(null);

    useEffect(() => {
        const fetchHeroMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing',{
                        headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` }
                });

                const basicMovies = response.data.results.slice(0, 10);
                
                const detailedMovies = await Promise.all(
                    basicMovies.map(async (movie) => {
                        const detailsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
                            headers:{ Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}` }
                        });

                        return detailsResponse.data;
                    })
                );
                setHeroMovies(detailedMovies);
            } catch {
                console.error("Error, couldn't load movies");
            }
        }

        fetchHeroMovies();
        calculateHeroHeight();
    }, []);


    const handleUpNextClick = (index) => {
        mainSwiper.current?.slideToLoop(index);
    };

    return (
        <>
            <div className={styles.heroLayout}>
                <Header />
                <section className='heroSection'>
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation
                        // autoplay={{ delay: 4000 }}
                        onSwiper={(swiper) => (mainSwiper.current = swiper)}
                        onSlideChange={(swiper) => {
                            const nextIndex = (swiper.realIndex + 1) % heroMovies.length;
                            upNextSwiper.current?.slideToLoop(nextIndex);
                        }
                        }
                        loop
                    >
                        {heroMovies.map(movie => (
                            <SwiperSlide key={movie.id}>
                                <div className={styles.heroSlide} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`}}>
                                    <TrailerCard movie={movie} variant='large' />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    <div className={styles.upNextSection}>
                        <h3>Up next</h3>
                        <Swiper
                            direction="vertical"
                            slidesPerView={3}
                            spaceBetween={12}
                            onSwiper={(swiper) => {
                                upNextSwiper.current = swiper;
                                swiper.slideTo(1, 0);
                            }}
                            loop
                        >
                            {heroMovies.map((movie, index) => (
                                <SwiperSlide
                                    key={movie.id}
                                    onClick={() => handleUpNextClick(index)}
                                >
                                    <a href="#">
                                        <TrailerCard 
                                            movie={movie}
                                            variant={'small'}    
                                        />
                                    </a>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                </section>
            </div>
        </>
    )
}

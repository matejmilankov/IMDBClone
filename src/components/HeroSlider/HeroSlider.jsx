import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useEffect, useState } from "react";
import { TrailerCard } from "../TrailerCard/TrailerCard";
import { TrailerModal } from "../TrailerModal/TrailerModal";
import styles from './HeroSlider.module.css'

export function HeroSlider({ heroMovies }) {
    const mainSwiper = useRef(null);
    const upNextSwiper = useRef(null);

    const [clickedTrailerId, setClickedTrailerId] = useState(null);

    useEffect(() => {
        upNextSwiper.current?.slideTo(1, 0);
    }, [heroMovies]);

    const handleUpNextClick = (index) => {
        if (heroMovies.length === 0) return;
        mainSwiper.current?.slideToLoop(index);
    };

    return (
        <>
            {clickedTrailerId && <TrailerModal clickedTrailerId={clickedTrailerId}/>}

            <section className='heroSection'>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    autoplay={{ delay: 4000 }}
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
                            <div className={styles.heroSlide} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})` }}>
                                <TrailerCard 
                                    movie={movie} 
                                    variant='large' 
                                    setClickedTrailerId={setClickedTrailerId}
                                />
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
                        onSwiper={(swiper) => (upNextSwiper.current = swiper)}
                        loop
                    >
                        {heroMovies.map((movie, index) => (
                            <SwiperSlide
                                key={movie.id}
                                onClick={() => handleUpNextClick(index)}
                            >
                                <TrailerCard
                                    movie={movie}
                                    variant={'small'}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </section>
        </>
    )
}
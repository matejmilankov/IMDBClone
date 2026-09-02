import { Swiper, SwiperSlide } from "swiper/react";
import { MovieCard } from "../MoviCard/MovieCard";
import { Navigation } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';

export function MovieSlider({ movies }) {

    return (
        <Swiper
            modules={[Navigation]}
            navigation
            slidesPerView={5}
            slidesPerGroup={3}
            spaceBetween={20}
        >
            {movies.map(movie => (
                <SwiperSlide key={movie.id}>
                    <MovieCard movie={movie} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
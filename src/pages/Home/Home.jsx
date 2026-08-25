import { Header } from "../../components/Header/Header"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules";
import { useEffect } from "react";
import axios from "axios";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Home() {

    useEffect(() => {
        const getNowPlayingMovies = async () => {
            const response = await axios.get('https://api.themoviedb.org/3/movie/now_playing',
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`
                    }
                }
            );
            console.log(response.data.results);
        }

        getNowPlayingMovies();
    }, []);

    return (
        <>
            <Header />
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
            >
                <SwiperSlide style={{ height: '300px'}}>Slide 1</SwiperSlide>
                <SwiperSlide style={{ height: '300px'}}>Slide 2</SwiperSlide>
            </Swiper>
        </>
    )
}
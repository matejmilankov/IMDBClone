import { Header } from "../../components/Header/Header"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export function Home() {

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
                <SwiperSlide style={{ height: '300px', background: 'red' }}>Slide 1</SwiperSlide>
                <SwiperSlide style={{ height: '300px', background: 'blue' }}>Slide 2</SwiperSlide>
            </Swiper>
        </>
    )
}
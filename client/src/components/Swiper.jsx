import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { twMerge } from 'tailwind-merge'

const SwiperComponent = ({ children, className }) => {
    return (
        <div className={twMerge('swiper-container py-20 my-4 flex items-center', className)}>
            {/* Navigation buttons should be outside Swiper */}
            <div className='button-prev'></div>
            {/* Move pagination element above Swiper */}
            <div className="swiper-pagination"></div>
            <Swiper
                spaceBetween={10}
                slidesPerView={3}
                modules={[Navigation, Pagination, Autoplay, Keyboard]}
                navigation={{
                    nextEl: '.button-next',
                    prevEl: '.button-prev'
                }}
                loop={children.length > 6}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false
                }}
                keyboard={{
                    enabled: true,
                }}
                pagination={{ el: '.swiper-pagination', clickable: true }}
                className='max-w-[1200px]'
            >
                {children.map((child, index) => (
                    <SwiperSlide key={index}>
                        <img src={child.image[0]} alt={child.name} className=' rounded' />
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='button-next'></div>
            {/* Remove the pagination element from here */}
        </div>
    )
}

export default SwiperComponent
'use client'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Autoplay]);

const logos = [
  '/hmo/maxicare.png',
  '/hmo/flexicare.png',
  '/hmo/prudential.png',
  '/hmo/inlife.png',
  '/hmo/cocolife.png',
  '/hmo/pacific-cross.png',

  // Add more logo paths here
];

export default function HMOCarousel() {
  return (
    <>
      <div className="relative group">
        <div className="absolute left-1/2 transform -translate-x-1/2 mt-[-50px] bg-white rounded-lg shadow-lg w-full container mx-4 p-8 text-center">
          <div className="absolute top-[-50px] right-0 bg-green-500 text-white px-4 py-2 rounded shadow-lg group-hover:animate-bounce">
            <div className="relative">
              <span className="block text-sm">Accredited HMO</span>
              <div className="absolute bottom-[-10px] left-[-6%] transform -rotate-90 -translate-x-1/2 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[20px] border-t-green-500"></div>
            </div>
          </div>
          <div className="flex gap-4">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={4}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 2000 }}
              breakpoints={{
                1024: { slidesPerView: 5 },
                600: { slidesPerView: 2 },
                480: { slidesPerView: 1 },
              }}
            >
              {logos.map((logo, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center">
                  <img src={logo} alt={`HMO Logo ${index + 1}`} className="logo mx-auto w-full h-auto grayscale hover:grayscale-0 transition-all duration-300" style={{ maxWidth: '150px', maxHeight: '100px', objectFit: 'contain' }} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}

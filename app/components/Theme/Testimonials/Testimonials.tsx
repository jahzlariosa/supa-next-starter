'use client';
// components/Testimonials.tsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { FaStar } from 'react-icons/fa';

type Testimonial = {
  name: string;
  role: string;
  feedback: string;
  rating: number;
};

const testimonials: Testimonial[] = [
  {
    name: 'Juan Dela Cruz',
    role: 'Patient',
    feedback: 'The service here is excellent and has greatly helped my health!',
    rating: 5,
  },
  {
    name: 'Maria Santos',
    role: 'Patient',
    feedback: 'Amazing experience! The doctors and nurses are very professional and helpful.',
    rating: 4,
  },
  {
    name: 'Pedro Reyes',
    role: 'Patient',
    feedback: 'I highly recommend this hospital. I am very happy with the results of my treatment.',
    rating: 4.5,
  },
  {
    name: 'Ana Lopez',
    role: 'Patient',
    feedback: 'Fantastic service and support. I will definitely come back here if I need treatment again!',
    rating: 5,
  },
  {
    name: 'Carlos Diaz',
    role: 'Patient',
    feedback: 'The best hospital experience I have ever had!',
    rating: 4,
  },
];

const Testimonials: React.FC = () => {
  return (
    <div className='bg-gray-100 py-[100px] px-4 sm:px-6 lg:px-8'>
      <div className='container'>
        <h2 className='text-3xl font-extrabold text-gray-900 text-center mb-6'>What our customers say</h2>
        <Swiper
          pagination={{ clickable: true }}
          modules={[Pagination, Autoplay]}
          className='mySwiper'
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className='bg-white shadow-lg rounded-lg p-6 mx-auto min-h-[250px]'>
                <div className='flex items-center mb-4'>
                  <p className='text-xl font-semibold text-gray-900'>{testimonial.name}</p>
                  <div className='ml-2 text-yellow-500 flex'>
                    {Array.from({ length: 5 }, (_, i) => (
                      <FaStar
                        key={i}
                        className={i < Math.floor(testimonial.rating) ? 'text-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                    {testimonial.rating % 1 !== 0 && <FaStar className='text-yellow-500 half-star' />}
                  </div>
                </div>
                <p className='text-gray-500'>{testimonial.role}</p>
                <p className='mt-4 text-gray-700'>{testimonial.feedback}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='swiper-pagination mt-6'></div> {/* Add margin-top using Tailwind CSS */}
      </div>
    </div>
  );
};

export default Testimonials;

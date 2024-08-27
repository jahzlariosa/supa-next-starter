import Image from 'next/image';
import React from 'react';
import { FaCheck } from 'react-icons/fa6';

export default function InfoSection() {
  return (
    <div className='container mt-[150px]'>
      <section className='relative flex flex-col lg:flex-row items-center justify-between py-16 px-8 bg-white'>
        <div className='lg:w-2/5 relative'>
          <Image
            src='/info.png' // Replace with actual image path
            alt='Surgeon'
            width={500}
            height={500}
            className='rounded-lg w-full'
          />
          <div className='mt-4 lg:mt-0 lg:absolute lg:top-0 lg:right-[-20px] lg:py-10 bg-blue-400 text-white p-4 rounded-2xl shadow-md text-center'>
            <h3 className='text-3xl font-bold '>50+</h3>
            <p>Accredited HMO </p>
          </div>
        </div>
        <div className='lg:w-3/5 lg:pl-16'>
          <span className='text-sm text-blue-500 uppercase'>About Us</span>
          <h2 className='text-4xl font-bold text-gray-800 mt-2'>Our Commitment to Exceptional Patient Care and Amenities</h2>
          <p className='text-gray-600 mt-4'>
            Discover a realm of holistic healthcare where your health is our top priority. At The Black Nazarene Hospital Inc., we are committed to
            delivering personalized and compassionate medical services tailored to your needs.
          </p>
          <div className='mt-6 grid grid-cols-2 gap-4'>
            <div className='flex items-center'>
              <FaCheck className='text-green-500 mr-2' />
              <p className='text-gray-600'>Continuous Care</p>
            </div>
            <div className='flex items-center'>
              <FaCheck className='text-green-500 mr-2' />
              <p className='text-gray-600'>Friendly and Inviting Atmosphere</p>
            </div>
            <div className='flex items-center'>
              <FaCheck className='text-green-500 mr-2' />
              <p className='text-gray-600'>All-Encompassing Care</p>
            </div>
            <div className='flex items-center'>
              <FaCheck className='text-green-500 mr-2' />
              <p className='text-gray-600'>State-of-the-Art Technology</p>
            </div>
            <div className='flex items-center'>
              <FaCheck className='text-green-500 mr-2' />
              <p className='text-gray-600'>Highly Skilled Physicians</p>
            </div>
            <div className='flex items-center'>
              <FaCheck className='text-green-500 mr-2' />
              <p className='text-gray-600'>Positive Feedback</p>
            </div>
            <div className='flex items-center'>
              <FaCheck className='text-green-500 mr-2' />
              <p className='text-gray-600'>Expert Doctors</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

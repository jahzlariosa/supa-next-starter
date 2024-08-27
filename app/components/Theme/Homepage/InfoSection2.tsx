import React from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function InfoSection2() {
  return (
    <div className='relative bg-blue-700 py-[100px] mt-10'>
      <div className='absolute inset-0'>
        <img
          src='/overlays/overlay.png'
          alt='Overlay'
          className='w-full h-full object-cover opacity-50'
        />
      </div>
      <div className='relative container mx-auto flex flex-col md:flex-row items-center'>
        <div className='w-full md:w-1/2 p-4'>
          <span className='text-green-300'>Prime Service</span>
          <h2 className='text-3xl font-bold mb-4 text-white'>Ob-Gyne</h2>
          <p className='text-lg mb-4 text-white'>
            Our Obstetrics and Gynecology department provides comprehensive healthcare services for women of all ages. We are dedicated to offering
            personalized and compassionate care to ensure the health and well-being of our patients.
          </p>
          <ul className='list-disc list-inside text-lg text-white mb-8'>
            <li>Routine check-ups and screenings</li>
            <li>Prenatal care and delivery</li>
            <li>Gynecological surgeries</li>
            <li>Menopause management</li>
            <li>Family planning and contraception</li>
            <li>Infertility treatments</li>
          </ul>
          <Link
            href='#'
            className='text-yellow-500 text-xl'
          >
            <FaInfoCircle className='mr-2 inline' /> <span className='text-white underline'>Inquire today</span>
          </Link>
        </div>
        <div className='w-full md:w-1/2 p-4'>
          <video
            controls
            className='rounded-lg shadow-lg w-full h-auto object-cover border border-[10px] border-red-300 shadow-mb-[200px] border-opacity-10'
          >
            <source
              src='/videos/ultrasound.mp4'
              type='video/mp4'
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default InfoSection2;

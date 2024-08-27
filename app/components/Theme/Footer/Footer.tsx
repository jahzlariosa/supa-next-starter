// components/Footer.tsx
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className='bg-blue-800 text-white py-8'>
      <div className='container mx-auto px-4'>
        <div className='grid grid-cols-1 md:grid-cols-5 gap-8'>
          <div className='col-span-2 md:col-span-2'>
            <div className='flex gap-4'>
              <Image
                src='/brand/tbnhi.png'
                width={100}
                height={100}
                alt={`TBNHI`}
              />
              <div className='cInfo py-6'>
                <h2 className='text-2xl font-bold text-white'>The Black Nazarene Hostpital Inc.</h2>
                <p className='text-gray-300'>Providing exceptional services since 2008.</p>
              </div>
            </div>
          </div>
          <div className='col-span-1'>
            <h2 className='text-xl font-bold mb-4'>Quick Links</h2>
            <ul>
              <li className='mb-2'>
                <Link
                  href='#'
                  className='text-gray-300 hover:text-yellow-400'
                >
                  Home
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  href='#'
                  className='text-gray-300 hover:text-yellow-400'
                >
                  About Us
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  href='#'
                  className='text-gray-300 hover:text-yellow-400'
                >
                  Services
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  href='#'
                  className='text-gray-300 hover:text-yellow-400'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-span-1'>
            <h2 className='text-xl font-bold mb-4'>Resources</h2>
            <ul>
              <li className='mb-2'>
                <Link
                  href='#'
                  className='text-gray-300 hover:text-yellow-400'
                >
                  Blog
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  href='#'
                  className='text-gray-300 hover:text-yellow-400'
                >
                  FAQ
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  href='#'
                  className='text-gray-300 hover:text-yellow-400'
                >
                  Terms of Service
                </Link>
              </li>
              <li className='mb-2'>
                <Link
                  href='#'
                  className='text-gray-300 hover:text-yellow-400'
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className='col-span-1'>
            <h2 className='text-xl font-bold mb-4'>Follow Us</h2>
            <div className='flex space-x-4'>
              <Link
                href='#'
                className='text-gray-300 hover:text-green-400'
              >
                <FaFacebook size={24} />
              </Link>
              <Link
                href='#'
                className='text-gray-300 hover:text-green-400'
              >
                <FaTwitter size={24} />
              </Link>
              <Link
                href='#'
                className='text-gray-300 hover:text-green-400'
              >
                <FaInstagram size={24} />
              </Link>
            </div>
          </div>
        </div>
        <div className='border-t border-white mt-8 pt-8 text-center'>
          <p className='text-white'>&copy; 2024 TBNHI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

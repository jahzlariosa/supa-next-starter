'use client';
// components/Theme/Navbar.tsx

// NEXT
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
// UI
import { Button } from '@/components/ui/button';
import { FaBars, FaTimes, FaHome, FaStethoscope, FaPhone, FaCommentDots, FaUser } from 'react-icons/fa';
// DB
import { createClient } from '@/utils/supabase/client';

// Define the Profile type to match the `profiles` table structure
interface Profile {
  id: string;
  username: string | null;
  firstname: string | null;
  lastname: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string;
  joined_date: string;
}

const Navbar: React.FC = () => {
  const supabase = createClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        // Fetch authenticated user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw new Error(userError.message);

        // Fetch profile data based on user ID
        const { data: profile, error: profileError } = await supabase.from('profiles').select('*').eq('id', user?.id).single();

        if (profileError) throw new Error(profileError.message);

        setProfileData(profile);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [supabase]);

  return (
    <nav className='bg-gradient-to-r from-blue-600 to-blue-900 py-4 sticky top-0 z-[999]'>
      <div className='container mx-auto flex items-center justify-between lg:px-0'>
        <div className='flex items-center space-x-4'>
          <img
            src='/brand/tbnhi.png'
            alt='Brand Logo'
            className='w-10 h-10'
          />
          <div className='text-white text-2xl'>
            <Link href='/'>TBNHI</Link>
          </div>
        </div>
        <div className='hidden md:flex space-x-4 items-center'>
          <Link
            href='/'
            className='text-white hover:text-gray-300 flex items-center'
          >
            <FaHome className='mr-2' />
            Home
          </Link>
          <Link
            href='/services'
            className='text-white hover:text-gray-300 flex items-center'
          >
            <FaStethoscope className='mr-2' />
            Services
          </Link>
          <Link
            href='/contact'
            className='text-white hover:text-gray-300 flex items-center'
          >
            <FaPhone className='mr-2' />
            Contact us
          </Link>
          <Button className='bg-white text-black hover:bg-green-500 hover:text-white'>
            <FaCommentDots className='inline mr-2' />
            Get a doctor
          </Button>

          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>Error: {error}</div>
          ) : profileData ? (
            <div>
              <Image
                src={profileData.avatar_url as string}
                width={40}
                height={40}
                alt='profile_photo'
                className='rounded-full object-cover h-[40px] border-white border-2'
              />
            </div>
          ) : (
            <Link href='/login'>
              <Button>
                <FaUser className='inline mr-2' />
                Login
              </Button>
            </Link>
          )}
        </div>
        <div className='md:hidden'>
          <button
            onClick={toggleMenu}
            className='text-white focus:outline-none'
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className='md:hidden mt-2 space-y-2'>
          <Link
            href='/'
            className='block text-white hover:text-gray-300 flex items-center'
          >
            <FaHome className='mr-2' />
            Home
          </Link>
          <Link
            href='/services'
            className='block text-white hover:text-gray-300 flex items-center'
          >
            <FaStethoscope className='mr-2' />
            Services
          </Link>
          <Link
            href='/contact'
            className='block text-white hover:text-gray-300 flex items-center'
          >
            <FaPhone className='mr-2' />
            Contact us
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

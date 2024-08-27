import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { FaCommentMedical, FaStethoscope } from 'react-icons/fa6';

function HomeBanner() {
  return (
    <>
      <div
        className='relative h-64 sm:h-80 md:h-[60vh] bg-cover bg-center'
        style={{ backgroundImage: "url('/banners/banner1.jpg')" }}
      >
        <div className='absolute inset-0 bg-blue-900 opacity-60'></div>
        <div className='relative container sm:pt-8 md:pt-[150px] p-4'>
          <div className='intro'>
            <h1 className='text-white text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold'>The Black Nazarene Hospital Inc.</h1>
            <p className='text-white text-lg sm:text-xl md:text-xl mt-4 font-light'>
              Providing exceptional healthcare services to the community with compassion and care.
            </p>
            <p className='text-white text-md sm:text-lg md:text-xl mt-2 font-light'>
              Our dedicated team of professionals is here to serve you 24/7, ensuring you receive the best medical attention and support.
            </p>
            <div className='mt-6 space-x-4 flex text-xl'>
              <Link href='#'>
                <div className='flex items-center'>
                  <Button className='bg-white text-black hover:bg-muted'>
                    <FaStethoscope className='mr-2 text-green-400' /> Services Offered
                  </Button>
                </div>
              </Link>
              <Link href='#'>
                <div className='flex items-center text-white'>
                  <Button className='bg-white text-black hover:bg-muted'>
                    <FaCommentMedical className='mr-2 text-yellow-400' /> Get a doctor
                  </Button>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeBanner;

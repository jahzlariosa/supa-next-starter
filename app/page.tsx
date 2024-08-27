import HomeBanner from './components/Theme/Homepage/Banner';
import HMOCarousel from './components/Theme/Homepage/HMOCarrousel';
import InfoSection from './components/Theme/Homepage/InfoSection';
import InfoSection2 from './components/Theme/Homepage/InfoSection2';
import Testimonials from './components/Theme/Testimonials/Testimonials';

export default function Home() {
  return (
    <>
      <HomeBanner />
      <HMOCarousel />
      <InfoSection />
      <InfoSection2 />
      <Testimonials />
    </>
  );
}

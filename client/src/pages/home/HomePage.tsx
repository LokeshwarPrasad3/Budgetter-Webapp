import Features from '@/components/home/Features';
import HeroSection from '@/components/home/HeroSection';
import ContactSection from '@/components/home/ContactSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/navbar/Navbar';

const HomePage = () => {
  return (
    <>
      <div
        className="flex flex-col"
        style={{ background: 'linear-gradient(to bottom, #CCEFF5, white)' }}
      >
        <Navbar />
        <HeroSection />
      </div>
      <Features />
      <ContactSection />
      <Footer isFixed={false} />
    </>
  );
};

export default HomePage;

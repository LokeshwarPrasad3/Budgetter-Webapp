import Features from '@/components/dashboard/Features';
import HeroSection from '@/components/dashboard/HeroSection';
import ContactSection from '@/components/layout/ContactSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/navbar/Navbar';

const HomeLayout = () => {
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

export default HomeLayout;

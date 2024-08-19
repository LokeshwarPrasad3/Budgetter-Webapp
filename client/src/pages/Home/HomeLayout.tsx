import Features from '@/components/dashboard/Features';
import HeroSection from '@/components/dashboard/HeroSection';
import ContactSection from '@/components/layout/ContactSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/navbar/Navbar';

const HomeLayout = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <Features />
      <ContactSection />
      <Footer noBg={false} />
    </>
  );
};

export default HomeLayout;

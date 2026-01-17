import Features from '@/components/home/Features';
import HeroSection from '@/components/home/HeroSection';
import ContactSection from '@/components/home/GetInTouchSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/navbar/Navbar';
import React, { useEffect } from 'react';
import { WhyItIsUseful } from '@/components/home/UsefulForStudents';
import { Testimonials } from '@/components/home/Testimonials';
import { CallToAction } from '@/components/home/CallToAction';
import InsightsPreview from '@/components/home/InsightsPreview';
import ScrollToTopButton from '@/components/home/ScrollTopTop';
import { Tooltip } from 'react-tooltip';

const HomePage: React.FC = () => {
  useEffect(() => {
    localStorage.removeItem('isDarkMode');
  }, []);

  return (
    <>
      <Navbar />
      <div id="hero_section" className="hero_section bg-[#eefbff]">
        <HeroSection />
      </div>
      <Features />
      <WhyItIsUseful />
      <InsightsPreview />
      <Testimonials />
      <CallToAction />
      <ContactSection />
      <Footer />
      <ScrollToTopButton />
      <Tooltip
        id="footerTooltip"
        className="custom-react-tooltip"
        place="top"
      />
    </>
  );
};

export default HomePage;

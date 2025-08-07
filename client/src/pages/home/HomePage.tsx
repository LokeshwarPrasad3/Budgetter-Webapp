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
      <div
        id="hero_section"
        className="hero_section bg-gradient-to-b from-[#e6faff] to-[#CCEFF5]"
      >
        <HeroSection />
      </div>
      {/* <div className="features_container mx-auto max-w-5xl 2xl:max-w-7xl p-0"> */}
      <Features />
      {/* </div> */}
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

import Features from '@/components/home/Features';
import HeroSection from '@/components/home/HeroSection';
import ContactSection from '@/components/home/GetInTouchSection';
import Footer from '@/components/layout/Footer';
import Navbar from '@/components/navbar/Navbar';
import React from 'react';
import { WhyItIsUseful } from '@/components/home/UsefulForStudents';
import { Testimonials } from '@/components/home/Testimonials';
import { CallToAction } from '@/components/home/CallToAction';
import InsightsPreview from '@/components/home/InsightsPreview';

const HomePage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="hero_section bg-gradient-to-b from-[#e6faff] to-[#CCEFF5]">
        <HeroSection />
      </div>
      <div className="features_container mx-auto max-w-7xl p-0">
        <Features />
      </div>
      <WhyItIsUseful />
      <InsightsPreview />
      <Testimonials />
      <CallToAction />
      <ContactSection />
      <Footer />
    </>
  );
};

export default HomePage;

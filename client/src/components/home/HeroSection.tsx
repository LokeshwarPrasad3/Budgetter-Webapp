import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ANIMATE_WORDS_VARIENT } from '@/utils/framer/properties';
import React from 'react';

const HeroSection: React.FC = () => {
  const MotionLink = motion.create(Link);

  return (
    <motion.div
      variants={ANIMATE_WORDS_VARIENT}
      initial="initial"
      animate="animate"
      className="hero_section_container relative mx-auto flex h-full w-full max-w-5xl flex-col items-center justify-between px-4 py-5 pb-10 sm:flex-row xl:pb-5 2xl:max-w-7xl"
    >
      <div className="hero_section_content flex w-full max-w-full flex-col justify-center gap-2 xl:gap-5 2xl:gap-8">
        <motion.h1
          variants={ANIMATE_WORDS_VARIENT}
          initial="initial"
          animate="animate"
          className="hero_section_title font-bree text-2xl tracking-wide sm:text-3xl lg:text-4xl 2xl:text-5xl"
        >
          Take Control of Your{' '}
          <span className="inline-block bg-gradient-to-r from-[#2e7dff] to-[#00b87c] bg-clip-text text-transparent">
            Expenses
          </span>
        </motion.h1>

        <motion.p
          variants={ANIMATE_WORDS_VARIENT}
          initial="initial"
          animate="animate"
          className="hero_section_description text-base font-semibold text-slate-600 sm:text-lg 2xl:text-2xl"
        >
          Built for students to track spending, manage pocket money, and
          visualize financial habits — all in one place.
          <br />
          Budget smarter with <strong className="font-bold">Budgetter</strong>.
        </motion.p>

        <motion.div
          variants={ANIMATE_WORDS_VARIENT}
          initial="initial"
          animate="animate"
          className="hero_buttons mt-2 flex w-full flex-wrap gap-5"
        >
          <MotionLink
            initial="initial"
            animate="animate"
            to="/login"
            className="hero_section_button rounded-full bg-gradient-to-r from-[#065f46]/80 via-[#047857]/80 to-[#059669]/80 px-6 py-1 text-sm font-semibold text-white shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br 2xl:px-8 2xl:py-1.5 2xl:text-lg"
          >
            <span className="relative top-0.5">Get Started</span>
          </MotionLink>
          <MotionLink
            initial="initial"
            animate="animate"
            to="https://lokeshwardewangan.in/"
            className="hero_section_button rounded-full border-2 border-[#047857] from-[#065f46]/80 via-[#047857]/80 to-[#059669]/80 px-6 py-1 text-sm font-semibold text-[#047857] shadow-xl transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:text-white 2xl:px-8 2xl:py-1.5 2xl:text-lg"
          >
            About Me
          </MotionLink>
        </motion.div>
      </div>

      <motion.div
        variants={ANIMATE_WORDS_VARIENT}
        initial="initial"
        animate="animate"
        className="flag_image flex w-full max-w-sm 2xl:max-w-lg"
      >
        {/* Desktop Image */}
        <div className="hidden w-full overflow-hidden rounded-3xl transition-all duration-300 hover:scale-[1.015] dark:bg-slate-900 dark:ring-white/10 sm:flex">
          <img
            className="h-auto w-full object-cover"
            src="./assets/dashboard/hero-section-poster.svg"
            alt="Dashboard Overview"
          />
        </div>

        {/* Mobile Image */}
        <div className="mt-7 overflow-hidden rounded-2xl bg-white p-3 shadow-md ring-1 ring-gray-100 dark:bg-slate-900 dark:ring-white/10 sm:hidden">
          <img
            className="h-auto w-full object-cover"
            src="./assets/dashboard/image-2.jpg"
            alt="Dashboard Preview"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;

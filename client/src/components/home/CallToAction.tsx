import {
  ANIMATE_WORDS_VARIENT,
  FADE_UP_DESCRIPTION,
  UPWARD_WAVE_SCALE_HEADING_ANIMATION,
} from '@/utils/framer/properties';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export const CallToAction = () => {
  return (
    <motion.div
      variants={ANIMATE_WORDS_VARIENT}
      initial="initial"
      animate="animate"
      id="calltoaction_section"
      className="relative flex w-full flex-col items-center justify-center bg-slate-800 py-24"
    >
      <motion.div
        variants={UPWARD_WAVE_SCALE_HEADING_ANIMATION}
        initial="hidden"
        whileInView="visible"
        className="mb-6 max-w-4xl text-center"
      >
        <h2 className="font-bree text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Take Control of Your <span className="text-[#00b87c]">Finances</span>{' '}
          Today
        </h2>
      </motion.div>

      <motion.p
        variants={FADE_UP_DESCRIPTION}
        initial="hidden"
        whileInView="visible"
        className="mb-10 max-w-2xl text-center text-lg text-slate-300"
      >
        Join thousands of students using Budgetter to track expenses, manage
        pocket money, and build smart spending habits effortlessly.
      </motion.p>
      <Link
        to="/signup"
        className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-[#00b87c] px-10 py-4 text-lg font-bold text-white shadow-lg shadow-emerald-900/20 transition-all duration-300 hover:scale-105 hover:bg-[#00a36d] hover:shadow-xl hover:shadow-emerald-900/30"
      >
        <span>Sign Up Today</span>
        <i className="ri-arrow-right-line transition-transform duration-300 group-hover:translate-x-1"></i>
      </Link>
    </motion.div>
  );
};

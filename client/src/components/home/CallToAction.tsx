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
      className="landingpage_section_paddings relative flex w-full flex-col items-center justify-center"
    >
      <motion.div
        variants={UPWARD_WAVE_SCALE_HEADING_ANIMATION}
        initial="hidden"
        whileInView="visible"
        className="landingpage_section_heading"
      >
        Take Control of Your Finances Today
      </motion.div>

      <motion.p
        variants={FADE_UP_DESCRIPTION}
        initial="hidden"
        whileInView="visible"
        className="landingpage_section_subheading text-[#047857]"
      >
        Join thousands of students using Budgetter to track expenses, manage
        pocket money, and build smart spending habits effortlessly.
      </motion.p>
      <Link
        to="/signup"
        className="rounded-full bg-gradient-to-r from-[#065f46]/80 via-[#047857]/80 to-[#059669]/80 px-6 py-1.5 text-base font-semibold text-white shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br"
      >
        Sign Up Today
      </Link>
    </motion.div>
  );
};

import {
  ANIMATE_WORDS_VARIENT,
  FADE_UP_DESCRIPTION,
  TESTIMONIAL_CARD,
  TESTIMONIALS_CONTAINER,
  UPWARD_WAVE_SCALE_HEADING_ANIMATION,
} from '@/utils/framer/properties';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
const testimonials = [
  {
    name: 'Lokeshwar Dewangan',
    quote:'Tracking pocket money used to be a mess. With Budgetter, I get clear visuals of where every rupee goes — it’s perfect for student life and staying stress-free!',
    image:
    'https://res.cloudinary.com/budgettercloud/image/upload/v1747475519/f6boi90imjmxmj456y33.jpg',
  },
  {
    name: 'Poshan Harmukh',
    quote:
      'Before Budgetter, I had no idea how much I was spending on little things. Now, I plan better, track smarter, and manage my monthly allowance like a pro!',
    image:
      'https://res.cloudinary.com/budgettercloud/image/upload/v1747475493/xm2cdpb98ffn2a46jxwc.jpg',
  },
  {
    name: 'Comic Diwakar',
    quote:'As a student juggling studies and expenses, Budgetter became my daily tool. It showed me where I overspent — especially on food — and helped me save over ₹500 every month!',
    image:
      'https://res.cloudinary.com/budgettercloud/image/upload/v1747475473/n45a2mxtdrvhz47c1puu.jpg',
  },
];

export const Testimonials = () => {
  return (
    <motion.div
      variants={ANIMATE_WORDS_VARIENT}
      initial="initial"
      animate="animate"
      id="testimonials_section"
      className="relative w-full bg-gradient-to-b from-[#ccf2f4]/60 to-[#CCEFF5] px-4 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl text-center">
        <motion.h2
          variants={UPWARD_WAVE_SCALE_HEADING_ANIMATION}
          initial="hidden"
          whileInView="visible"
          className="mb-4 text-4xl font-bold text-zinc-800"
        >
          What Students Are Saying
        </motion.h2>
        <motion.p
          variants={FADE_UP_DESCRIPTION}
          initial="hidden"
          whileInView="visible"
          className="mx-auto mb-16 max-w-xl text-base text-zinc-500 md:text-lg"
        >
          Budgetter empowers students to control their money smartly. Hear what
          our users are loving about it.
        </motion.p>

        <motion.div
          variants={TESTIMONIALS_CONTAINER}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 gap-7 md:grid-cols-3"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={TESTIMONIAL_CARD}
              className="relative flex flex-col items-center rounded-3xl bg-white p-6 pb-10 shadow-xl transition-all duration-300 hover:shadow-2xl"
            >
              <img
                src={t.image}
                alt={t.name}
                className="-mt-16 mb-4 h-24 w-24 rounded-full border-[4px] border-[#00b87c] object-cover shadow-md"
              />
              <h4 className="text-lg font-semibold text-zinc-800">{t.name}</h4>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 font-medium">
                {t.quote}
              </p>
              <div className="absolute bottom-5 right-6 text-2xl text-[#2e7dff] opacity-60">
                <FaQuoteRight />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

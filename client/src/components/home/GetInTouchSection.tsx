import {
  ANIMATE_WORDS_VARIENT,
  FADE_UP_DESCRIPTION,
  FOOTER_ANIMATION,
  UPWARD_WAVE_SCALE_HEADING_ANIMATION,
} from '@/utils/framer/properties';
import React from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const GetInTouchSection: React.FC = () => {
  const handleSendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.success('This Feature is coming soon!!');
  };

  return (
    <motion.div
      variants={ANIMATE_WORDS_VARIENT}
      initial="initial"
      animate="animate"
      id="getintouch_section"
      className="relative w-full bg-gradient-to-b from-[#ccf2f4]/60 to-[#CCEFF5] py-10 sm:py-10 lg:py-20"
    >
      <div className="mx-auto w-full max-w-full px-4 font-karla md:max-w-[38rem]">
        <div className="w-full max-w-full rounded-sm p-4">
          <motion.div
            variants={UPWARD_WAVE_SCALE_HEADING_ANIMATION}
            initial="hidden"
            whileInView="visible"
            className="my-2 mb-2 text-center text-3xl font-bold"
          >
            Get in Touch
          </motion.div>
          <motion.p
            variants={FADE_UP_DESCRIPTION}
            initial="hidden"
            whileInView="visible"
            className="mb-8 text-center text-lg text-gray-600"
          >
            We'd love to hear from you!
          </motion.p>
          <motion.form
            variants={FOOTER_ANIMATION}
            initial="hidden"
            whileInView="visible"
          >
            <div className="relative mb-4">
              <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"></i>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-[#F8F9FB] px-9 py-2.5 font-medium text-slate-900 placeholder:text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="relative mb-4">
              <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-500"></i>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-[#F8F9FB] px-9 py-2.5 font-medium text-slate-900 placeholder:text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              />
            </div>

            <div className="relative mb-6">
              <i className="ri-message-3-line absolute left-3 top-5 -translate-y-1/2 transform text-gray-500"></i>
              <textarea
                id="message"
                placeholder="Your Message"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-[#F8F9FB] px-9 py-2.5 font-medium text-slate-900 placeholder:text-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                rows={4}
              ></textarea>
            </div>
            <div className="btn_con flex w-full items-center justify-end">
              <button
                onClick={handleSendMessage}
                type="submit"
                className="hero_section_button glow-hover mt-2.5 rounded-full bg-gradient-to-r from-[#065f46]/80 via-[#047857]/80 to-[#059669]/80 px-10 py-1.5 text-base font-semibold text-white shadow-xl transition-all duration-500 ease-in-out hover:scale-105 hover:bg-gradient-to-br"
              >
                Send Message
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};

export default GetInTouchSection;

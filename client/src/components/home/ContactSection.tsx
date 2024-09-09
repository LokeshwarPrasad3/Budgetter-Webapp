import { ANIMATE_WORDS_VARIENT } from '@/utils/framer/properties';
import React from 'react';
import { motion } from 'framer-motion';

const ContactSection: React.FC = () => {
  return (
    <motion.div
      variants={ANIMATE_WORDS_VARIENT}
      initial="initial"
      animate="animate"
      className="w-full relative bg-[#F8F9FB] py-10"
    >
      <div className="mx-auto w-full max-w-full md:max-w-[38rem] font-karla px-4 ">
        <div className="w-full max-w-full p-4 bg-[#F8F9FB] rounded-sm">
          <h1 className="text-3xl font-bold tracking-tighter text-gray-800 text-center mb-2">
            Get in Touch
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            We'd love to hear from you!
          </p>

          <form>
            <div className="mb-3 relative">
              <i className="ri-user-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="text"
                id="name"
                placeholder="Your Name"
                className="text-slate-900 bg-[#F8F9FB] placeholder:text-sm font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-3 relative">
              <i className="ri-mail-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
              <input
                type="email"
                id="email"
                placeholder="Your Email"
                className="text-slate-900 bg-[#F8F9FB] placeholder:text-sm font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="mb-6 relative">
              <i className="ri-message-3-line absolute left-3 top-5 transform -translate-y-1/2 text-gray-500"></i>
              <textarea
                id="message"
                placeholder="Your Message"
                className="text-slate-900 bg-[#F8F9FB] placeholder:text-sm font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                rows={4}
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </button>
          </form>

          <div className="my-8 text-center text-gray-500">
            <p className="font-bold mb-4">Follow us on</p>
            <div className="flex justify-center space-x-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-twitter-fill text-2xl text-blue-500 hover:text-blue-600"></i>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-facebook-fill text-2xl text-blue-800 hover:text-blue-900"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-linkedin-fill text-2xl text-blue-700 hover:text-blue-800"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="ri-instagram-fill text-2xl text-pink-500 hover:text-pink-600"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSection;

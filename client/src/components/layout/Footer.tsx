import { FOOTER_ANIMATION } from '@/utils/framer/properties';
import React from 'react';
import {
  RiInstagramLine,
  RiLinkedinLine,
  RiTwitterXLine,
  RiGithubLine,
} from 'react-icons/ri';
import { motion } from 'framer-motion';
const Footer: React.FC = () => {
  return (
    <motion.footer
      variants={FOOTER_ANIMATION}
      initial="hidden"
      whileInView="visible"
      className="border-t border-gray-200 bg-[#f8f9fb] "
    >
      <div className="landingpage_section_width text-gray-700 mx-auto grid grid-cols-1 gap-10 px-6 py-10 sm:grid-cols-2 md:grid-cols-4 lg:py-16 lg:pb-10">
        {/* Logo + Brand */}
        <div className="col-span-1">
          <a href="/home" className="flex items-center">
            <img src="/assets/logo/logo.png" alt="Budgetter" className="h-10" />
            <span className="bg-gradient-to-r from-[#2e7dff] to-[#00b87c] bg-clip-text pl-2 text-3xl font-bold text-transparent">
              Budgetter
            </span>
          </a>
          <p className="mt-4 text-sm text-gray-600">
            Take control of your money. Effortlessly track, analyze, and manage
            your daily expenses with smart insights.
          </p>
        </div>

        {/* Features */}
        <div>
          <h3 className="mb-3 text-xl font-semibold">Features</h3>
          <ul className="space-y-2 text-sm">
            <li>Track Expenses</li>
            <li>Spending Overview</li>
            <li>Lent Money Management</li>
            <li>Category Insights</li>
            <li>Report Generation</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 text-xl font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="#hero_section"
                className="relative before:absolute before:-bottom-0.5 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:font-semibold hover:text-[#2e7dff] hover:before:w-full"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#usefullforstudent_section"
                className="relative before:absolute before:-bottom-0.5 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:font-semibold hover:text-[#00b87c] hover:before:w-full"
              >
                For Student
              </a>
            </li>
            <li>
              <a
                href="#features_section"
                className="relative before:absolute before:-bottom-0.5 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:font-semibold hover:text-[#2e7dff] hover:before:w-full"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#getintouch_section"
                className="relative before:absolute before:-bottom-0.5 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:font-semibold hover:text-[#00b87c] hover:before:w-full"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="mb-3 text-xl font-semibold">Follow Us</h3>
          <div className="flex space-x-4 text-2xl text-gray-600">
            <a
              href="https://www.instagram.com/lokeshwarprasad1"
              target="_blank"
              rel="noreferrer"
              data-tooltip-id="footerTooltip"
              data-tooltip-content="Instagram"
              data-tooltip-place="top"
              className="relative before:absolute before:-bottom-1.5 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:font-bold hover:text-pink-500 hover:before:w-full"
            >
              <RiInstagramLine />
            </a>
            <a
              href="https://www.linkedin.com/in/lokeshwar-dewangan-7b2163211/"
              target="_blank"
              rel="noreferrer"
              data-tooltip-id="footerTooltip"
              data-tooltip-content="LinkedIn"
              data-tooltip-place="top"
              className="relative before:absolute before:-bottom-1.5 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:font-bold hover:text-blue-700 hover:before:w-full"
            >
              <RiLinkedinLine />
            </a>
            <a
              href="https://x.com/@LokeshwarPras17"
              target="_blank"
              rel="noreferrer"
              data-tooltip-id="footerTooltip"
              data-tooltip-content="Twitter"
              data-tooltip-place="top"
              className="relative before:absolute before:-bottom-1.5 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:font-bold hover:text-black hover:before:w-full"
            >
              <RiTwitterXLine />
            </a>
            <a
              href="https://github.com/lokeshwarprasad"
              target="_blank"
              rel="noreferrer"
              data-tooltip-id="footerTooltip"
              data-tooltip-content="GitHub"
              data-tooltip-place="top"
              className="relative before:absolute before:-bottom-1.5 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:font-bold hover:text-gray-800 hover:before:w-full"
            >
              <RiGithubLine />
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#ccf2f4]/60 to-[#CCEFF5] py-4 text-center text-sm text-black">
        © {new Date().getFullYear()} Budgetter by{' '}
        <a
          className="bg-gradient-to-r from-[#2e7dff] to-[#036e4b] font-overpass font-semibold bg-clip-text text-transparent "
          target='_blank'
          href="https://lokeshwardewangan.in"
        >
          Developer
        </a>
        . All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;

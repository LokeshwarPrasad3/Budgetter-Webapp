import { navListArray } from '@/data/navList';
import {
  ANIMATE_WORDS_VARIENT,
  MENU_EFFECT_VARIENT,
  MENU_ITEM_EFFECT_VARIENT,
} from '@/utils/framer/properties';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  const MotionLink = motion(Link);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <>
      <nav className="sticky top-0 z-50 mx-auto h-20 max-w-7xl bg-[#e6faff]/20 font-karla text-gray-800 shadow-sm backdrop-blur-sm sm:h-24 sm:shadow-none">
        <motion.div
          variants={ANIMATE_WORDS_VARIENT}
          initial="initial"
          animate="animate"
          className="flex h-full items-center justify-between px-4"
        >
          {/* Logo */}
          <Link to="/home" className="flex items-center">
            <img className="h-10" src="/assets/logo/logo.png" alt="Budgetter" />
            {/* <img
              className="h-7 pl-4 relative top-1 right-2"
              src="/assets/logo/logo_name.png"
              alt="Budgetter"
            /> */}
            <span className="relative top-0.5 bg-gradient-to-r from-[#2e7dff] to-[#00b87c] bg-clip-text pl-2 text-3xl font-bold text-transparent">
              Budgetter
            </span>
          </Link>

          {/* Navigation - Large Screens */}
          <div className="hidden items-center space-x-5 lg:flex">
            {navListArray.map(({ route, name }, index) => (
              <a
                key={index}
                href={`/${route}`}
                className="top_nav_list relative rounded-lg p-1 py-0.5 text-lg font-medium capitalize text-[#1a1a1a] transition-all duration-300 ease-in before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-0 before:bg-[#1a1a1a] before:transition-all before:duration-300 hover:before:w-full"
                style={{ textUnderlineOffset: '8px' }}
              >
                <span>{name}</span>
              </a>
            ))}
            <Link to="/signup" className="rounded-full bg-gradient-to-r from-[#065f46]/80 via-[#047857]/80 to-[#059669]/80 px-6 py-1.5 text-base font-semibold text-white shadow-xl transition-transform duration-300 hover:scale-105 hover:bg-gradient-to-br">
              Signup Today ?
            </Link>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Nav Icon */}
      <div className="fixed right-4 top-6 z-[50] block lg:right-8 lg:hidden">
        <button
          aria-label="navigation"
          type="button"
          onClick={toggleMenu}
          className="rounded-full px-2 py-1 text-gray-800 transition-all duration-200 ease-in hover:bg-gray-300 focus:outline-none"
        >
          <i className={`text-3xl ri-${!isOpen ? 'menu' : 'close'}-line`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <AnimatePresence>
            <div className="bg_filter_effect absolute inset-0 z-50 bg-[#ffffff50] backdrop-blur-sm md:hidden"></div>
            <motion.div
              ref={modalRef}
              variants={MENU_EFFECT_VARIENT}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`menu_phone_container fixed right-2 top-16 z-50 mt-2 w-full max-w-[16rem] rounded-lg bg-white py-4 text-center font-karla text-black shadow-md md:hidden`}
            >
              <motion.div className="flex flex-col justify-center">
                {navListArray.map(({ route, name }, index) => (
                  <MotionLink
                    variants={MENU_ITEM_EFFECT_VARIENT}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    key={index}
                    to={`/${route}`}
                    className="block py-3 pl-6 text-left text-base font-bold capitalize transition-all duration-300 ease-in hover:underline focus:underline focus:outline-none"
                    style={{ textUnderlineOffset: '8px' }}
                  >
                    {name}
                  </MotionLink>
                ))}
                <hr />
                {/* <motion.div className="switch_theme flex justify-between px-6 py-3 pb-0 text-base font-medium">
                  <motion.div
                    variants={MENU_ITEM_EFFECT_VARIENT}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    Switch theme
                  </motion.div>
                  <i className="ri-moon-line cursor-pointer text-2xl"></i>
                </motion.div> */}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Navbar;

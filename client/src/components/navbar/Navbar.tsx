import { navListArray } from '@/data/navList';
import {
  ANIMATE_WORDS_VARIENT,
  MENU_EFFECT_VARIENT,
  MENU_ITEM_EFFECT_VARIENT,
} from '@/utils/framer/properties';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const MotionLink = motion(Link);

  return (
    <>
      <nav className=" bg-[#CCEFF5] text-gray-800 relative h-20 font-karla">
        <motion.div
          variants={ANIMATE_WORDS_VARIENT}
          initial="initial"
          animate="animate"
          className="flex justify-between h-full items-center"
        >
          {/* Logo */}
          <Link to="/home" className="flex items-center pl-4 md:pl-8">
            <img className="h-8" src="/assets/logo/logo.png" alt="Budgetter" />
            <img
              className="h-7 pl-4 relative top-1 right-2"
              src="/assets/logo/logo_name.png"
              alt="Budgetter"
            />
          </Link>

          {/* Navigation - Large Screens */}
          <div className="hidden md:flex items-center space-x-6 pr-8">
            {navListArray.map(({ route, name }, index) => (
              <Link
                key={index}
                to={`/${route}`}
                className="text-base capitalize transition-all ease-in duration-300 focus:outline-none focus:underline hover:underline font-medium"
                style={{ textUnderlineOffset: '8px' }}
              >
                {name}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Mobile Nav Icon */}
      <div className="md:hidden block top-6 right-4 md:right-8 fixed z-[50]">
        <button
          aria-label="navigation"
          type="button"
          onClick={toggleMenu}
          className="text-gray-800 transition-all ease-in duration-200 focus:outline-none hover:bg-gray-300 py-1 px-2 rounded-full"
        >
          <i className={`text-3xl ri-${!isOpen ? 'menu' : 'close'}-line`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <AnimatePresence>
            <div className="bg_filter_effect md:hidden absolute inset-0 z-50 bg-[#ffffff50] backdrop-blur-sm "></div>
            <motion.div
              variants={MENU_EFFECT_VARIENT}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`menu_phone_container md:hidden fixed w-full max-w-[16rem] font-karla right-2 top-16 rounded-lg mt-2 py-4 text-center z-50 bg-white shadow-md text-black`}
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
                    className="block py-3 text-base capitalize text-left pl-6 transition-all ease-in duration-300 focus:outline-none focus:underline hover:underline font-bold"
                    style={{ textUnderlineOffset: '8px' }}
                  >
                    {name}
                  </MotionLink>
                ))}
                <hr />
                <motion.div className="switch_theme flex py-3 pb-0 text-base font-medium justify-between px-6">
                  <motion.div
                    variants={MENU_ITEM_EFFECT_VARIENT}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    Switch theme
                  </motion.div>
                  <i className="ri-moon-line text-2xl cursor-pointer"></i>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default Navbar;

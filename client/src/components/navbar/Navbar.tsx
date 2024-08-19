import { navListArray } from '@/data/navList';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <nav className=" bg-[#CCEFF5] text-gray-800 relative h-20 font-karla">
        <div className="flex justify-between h-full items-center">
          {/* Logo */}
          <div className="flex items-center pl-4 md:pl-8">
            <img className="h-8" src="/assets/logo/logo.png" alt="Budgetter" />
            <img
              className="h-7 pl-4 relative top-1 right-2"
              src="/assets/logo/logo_name.png"
              alt="Budgetter"
            />
          </div>

          {/* Navigation - Large Screens */}
          <div className="hidden md:flex items-center space-x-6 pr-8">
            {navListArray.map(({ route, name }, index) => (
              <Link
                key={index}
                to={`/${route}`}
                className="text-lg transition-all ease-in duration-300 focus:outline-none focus:underline hover:underline font-medium"
                style={{ textUnderlineOffset: '8px' }}
              >
                {name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Nav Icon */}
      <div className="md:hidden block top-6 right-4 md:right-8 fixed z-50">
        <button
          aria-label="navigation"
          type="button"
          onClick={toggleMenu}
          className="text-gray-800 transition-all ease-in duration-300 focus:outline-none hover:text-gray-600"
        >
          <i className={`text-3xl ri-${!isOpen ? 'menu' : 'close'}-line`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <>
          <div className="bg_filter_effect md:hidden absolute inset-0 bg-[#ffffff50] backdrop-blur-sm "></div>
          <div
            className={` md:hidden absolute w-full max-w-[16rem] font-karla right-2 top-16 rounded-lg mt-2 py-4 text-center z-50 bg-white shadow-md text-black`}
          >
            <div className="flex flex-col justify-center">
              {navListArray.map(({ route, name }, index) => (
                <Link
                  key={index}
                  to={`/${route}`}
                  className="block py-3 text-lg capitalize text-left pl-6 transition-all ease-in duration-300 focus:outline-none focus:underline hover:underline font-bold"
                  style={{ textUnderlineOffset: '8px' }}
                >
                  {name}
                </Link>
              ))}
              <hr />
              <div className="switch_theme flex py-3 pb-0 text-lg font-medium justify-between px-6">
                <p>Switch theme</p>
                {/* <i className="ri-sun-line text-2xl"></i> */}
                <i className="ri-moon-line text-2xl"></i>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;

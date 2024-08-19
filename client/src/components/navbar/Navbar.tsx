import { navListArray } from '@/data/navList';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="p-4 bg-[#CCEFF5] text-gray-800 relative h-20 font-karla">
      <div className="flex justify-between h-full items-center">
        {/* Logo */}
        <div className="flex items-center pl-8">
          <img
            className="h-8 pl-4"
            src="/assets/logo/logo.png"
            alt="Budgetter"
          />
          <img
            className="h-7 pl-4 relative top-1 right-2"
            src="/assets/logo/logo_name.png"
            alt="Budgetter"
          />
        </div>

        {/* Mobile Nav Icon */}
        <div className="md:hidden block top-6 right-8 fixed">
          <button
            aria-label="navigation"
            type="button"
            onClick={toggleMenu}
            className="text-gray-800 transition-all ease-in duration-300 focus:outline-none hover:text-gray-600"
          >
            <i className="text-3xl ri-menu-line"></i>
          </button>
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

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${isOpen ? 'block' : 'hidden'} w-full mt-2 py-8 text-center bg-white shadow-md text-black backdrop-blur-md`}
      >
        <div className="flex flex-col items-center">
          {navListArray.map(({ route, name }, index) => (
            <Link
              key={index}
              to={`/${route}`}
              className="block py-3 transition-all ease-in duration-300 focus:outline-none focus:underline hover:underline font-medium"
              style={{ textUnderlineOffset: '8px' }}
            >
              {name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

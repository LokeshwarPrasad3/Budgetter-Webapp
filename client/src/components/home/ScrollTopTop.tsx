import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);

    // Initial check on mount
    toggleVisibility();

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          onClick={scrollToTop}
          data-tooltip-id="footerTooltip"
          data-tooltip-content="Scroll To Top"
          data-tooltip-place="right"
          className="glow-hover fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-gradient-to-r from-[#065f46] via-[#047857] to-[#059669] p-3 text-white shadow-lg transition-all duration-300 ease-in-out hover:scale-110"
          aria-label="Scroll to top"
        >
          <HiOutlineChevronDoubleUp className="relative top-1 h-6 w-6 animate-bounce" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;

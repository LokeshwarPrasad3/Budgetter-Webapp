import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FollowCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      className="fixed hidden top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[100] cursor-follow dark:bg-white bg-black"
      animate={{
        x: cursorPosition.x - 10, // Subtract half the size to center
        y: cursorPosition.y - 10,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
      }}
    />
  );
};

export default FollowCursor;

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
      className="cursor-follow pointer-events-none fixed left-0 top-0 z-[100] hidden h-5 w-5 rounded-full bg-black dark:bg-white"
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

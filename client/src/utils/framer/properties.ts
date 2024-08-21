import { Variants } from 'framer-motion';

// Define the types for your variants and transition
export const MENU_EFFECT_VARIENT: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3
    }
  },
  exit: { opacity: 0, scale: 0 },
};

export const MENU_ITEM_EFFECT_VARIENT: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1
    }
  },
  exit: { opacity: 0, scale: 0 },
};

import { Variants } from 'framer-motion';

// variant popup
export const MENU_EFFECT_VARIENT: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: { opacity: 0, scale: 0 },
};
// variant popup texts
export const MENU_ITEM_EFFECT_VARIENT: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.1,
    },
  },
  exit: { opacity: 0, scale: 0 },
};
// variant cards
export const CARDS_EFFECT_VARIENT: Variants = {
  initial: { opacity: 0, rotateY: -90 },
  whileInView: {
    opacity: 1,
    rotateY: 0,
    transition: {
      duration: 0.3,
    },
  },
  whileHover: {
    scale: 1.06,
    transition: {
      duration: 0.3,
    },
  },
  whileTap: {
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

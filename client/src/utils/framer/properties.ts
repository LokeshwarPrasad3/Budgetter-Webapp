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
  initial: { opacity: 0, rotateY: -90, y: 30 },
  whileInView: {
    opacity: 1,
    rotateY: 0,
    y: 0,
    transition: {
      duration: 1,
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
export const UPWARD_WAVE_SCALE_HEADING_ANIMATION = {
  hidden: {
    y: 30,
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    y: [30, -10, 0], // wave effect: down, up, settle
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
      // repeat: Infinity, // optional continuous wave
    },
  },
};
export const FADE_UP_DESCRIPTION = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 1, 0.5, 1],
      delay: 0.4,
    },
  },
};

// basic fonts
export const ANIMATE_WORDS_VARIENT: Variants = {
  initial: { opacity: 0, y: 30 },
  whileHover: {
    scale: 1.06,
    transition: {
      duration: 0.3,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};
export const CARDS_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const CARD_ITEM = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};
export const GRAPH_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

export const GRAPH_BOX = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 30,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};
export const TESTIMONIALS_CONTAINER = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export const TESTIMONIAL_CARD = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};
export const FOOTER_ANIMATION = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
};

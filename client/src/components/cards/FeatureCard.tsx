import React from 'react';
import { motion } from 'framer-motion';
import { CARDS_EFFECT_VARIENT } from '@/utils/framer/properties';

type FeatureCardType = {
  title: string;
  description: string;
  bg: string;
  icon: string;
};

const FeatureCard: React.FC<FeatureCardType> = ({
  title,
  description,
  bg,
  icon,
}) => {
  return (
    <motion.div
      variants={CARDS_EFFECT_VARIENT}
      initial="initial"
      whileInView="whileInView"
      whileHover="whileHover"
      whileTap="whileTap"
      className="feature_box relative flex min-h-40 w-full max-w-96 flex-col items-center justify-center rounded-sm border-2 border-[#19154A]"
      style={{ background: `${bg}`, boxShadow: '3px 6px 0 0 #19154A' }}
    >
      {/* hook design */}
      <div className="hook_container absolute left-0 right-0 top-[-2rem] mx-auto flex w-[80%] items-center justify-between">
        <div className="left_hook min-h-12 min-w-4 rounded-b-sm border-b border-l border-r border-slate-400 bg-[#F4D7C4] shadow-md"></div>
        <div className="right_hook min-h-12 min-w-4 rounded-b-sm border-b border-l border-r border-slate-400 bg-[#F4D7C4] shadow-md"></div>
      </div>
      <div className="feature_box_content flex flex-col items-center justify-center gap-2">
        <div className="heading flex justify-center gap-3">
          <i className={`${icon} text-2xl`}></i>
          <span className="text-xl font-bold">{title}</span>
        </div>
        <p className="px-3 text-center text-base font-medium">{description}</p>
      </div>
    </motion.div>
  );
};

export default FeatureCard;

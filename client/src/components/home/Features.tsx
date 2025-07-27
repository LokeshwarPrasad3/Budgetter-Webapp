import React from 'react';
import FeatureCard from '../cards/FeatureCard';
import { cardData } from '@/data/featurecard';
import { UPWARD_WAVE_SCALE_HEADING_ANIMATION } from '@/utils/framer/properties';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  return (
    <>
      <div
        id="features_section"
        className="features_container landingpage_section_paddings landingpage_section_width mx-auto flex w-full flex-col items-center justify-center gap-14 2xl:gap-16"
      >
        <motion.div
          variants={UPWARD_WAVE_SCALE_HEADING_ANIMATION}
          initial="hidden"
          whileInView="visible"
          className="my-2 text-2xl font-bold 2xl:text-3xl"
        >
          Features That Matters
        </motion.div>

        <div className="feature_box_container grid w-full gap-x-7 gap-y-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {/* box -1 */}
          {cardData.map(({ title, description, icon, bg }, index) => (
            <React.Fragment key={index}>
              <FeatureCard
                title={title}
                description={description}
                icon={icon}
                bg={bg}
              />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default Features;

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
        className="features_container flex w-full max-w-full flex-col items-center justify-center gap-16 px-4 py-10 pt-5 font-karla sm:py-10 lg:py-16"
      >
        <motion.div
          variants={UPWARD_WAVE_SCALE_HEADING_ANIMATION}
          initial="hidden"
          whileInView="visible"
          className="my-2 text-3xl font-bold"
        >
          Features
        </motion.div>

        <div className="feature_box_container flex w-full flex-wrap items-center justify-center gap-x-7 gap-y-16 xl:justify-between">
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

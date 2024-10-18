import React from 'react';
import FeatureCard from '../cards/FeatureCard';
import { cardData } from '@/data/featurecard';
import { ANIMATE_WORDS_VARIENT } from '@/utils/framer/properties';
import { motion } from 'framer-motion';

const Features: React.FC = () => {
  return (
    <>
      <div className="features_container flex font-karla gap-12 max-w-full flex-col w-full justify-center items-center my-10">
        <motion.div
          variants={ANIMATE_WORDS_VARIENT}
          initial="initial"
          animate="animate"
          className="text-3xl font-bold my-2"
        >
          Features
        </motion.div>
        <div className="feature_box_container flex flex-wrap w-full items-center justify-center gap-y-16 gap-x-7">
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

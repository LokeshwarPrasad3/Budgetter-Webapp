import React from 'react';
import FeatureCard from '../cards/FeatureCard';
import { cardData } from '@/data/featurecard';

const Features = () => {
  return (
    <>
      <div className="features_container flex font-karla gap-12 max-w-full flex-col w-full justify-center items-center my-10">
        <h2 className="text-3xl font-bold my-2">Features</h2>
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

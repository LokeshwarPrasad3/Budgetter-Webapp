import React from 'react';

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
    <div
      className="feature_box rounded-sm border-2 border-[#19154A] flex flex-col items-center max-w-96 min-h-40 justify-center relative w-[96%]"
      style={{ background: `${bg}`, boxShadow: '3px 6px 0 0 #19154A' }}
    >
      {/* hook design */}
      <div className="hook_container mx-auto flex items-center w-[80%] justify-between absolute top-[-2rem] left-0 right-0">
        <div className="left_hook min-h-12 border-l border-r border-b border-slate-400 rounded-b-sm shadow-md min-w-4 bg-[#F4D7C4]"></div>
        <div className="right_hook min-h-12 border-l border-r border-b border-slate-400 rounded-b-sm shadow-md min-w-4 bg-[#F4D7C4]"></div>
      </div>
      <div className="feature_box_content flex flex-col  items-center justify-center gap-2">
        <div className="heading flex justify-center gap-3">
          <i className={`${icon} text-2xl`}></i>
          <span className="text-xl font-bold">{title}</span>
        </div>
        <p className="text-base px-3 font-medium">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;

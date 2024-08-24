import React from 'react';

type FooterPropType = {
  isFixed: boolean;
};

const Footer: React.FC<FooterPropType> = ({ isFixed }) => {
  return (
    <div
      className={`h-[65px] ${isFixed ? 'fixed' : ''} bottom-0 left-0 flex mt-3 flex-col font-karla justify-center items-center w-full p-4 bg-[#f2f2f2] text-slate-900`}
    >
      <p className="text-center text-base">
        © Copyright 2024 Budgetter. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

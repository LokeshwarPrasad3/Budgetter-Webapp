import React from 'react';

type FooterPropType = {
  noBg: boolean;
};

const Footer: React.FC<FooterPropType> = ({ noBg }) => {
  return (
    <div
      className={`h-20 fixed bottom-0 left-0 flex mt-3 flex-col font-karla justify-center items-center w-full p-4 ${noBg ? '' : 'bg-gray-800'} text-gray-300`}
    >
      <p className="text-center text-sm">
        © Copyright 2024 Budgetter. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;

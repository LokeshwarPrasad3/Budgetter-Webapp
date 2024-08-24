import React from 'react';

type AuthFooterPropType = {};

const AuthFooter: React.FC<AuthFooterPropType> = () => {
  return (
    <div
      className={`h-[65px] fixed bottom-0 left-0 flex mt-3 flex-col font-karla justify-center items-center w-full p-4 bg-slate-300 text-slate-900`}
    >
      <p className="text-center text-base">
        © Copyright 2024 Budgetter. All rights reserved.
      </p>
    </div>
  );
};

export default AuthFooter;

import React from 'react';

type AuthFooterPropType = {};

const AuthFooter: React.FC<AuthFooterPropType> = () => {
  return (
    <div
      className={`text-white-900 fixed bottom-0 left-0 mt-3 flex h-[65px] w-full flex-col items-center justify-center bg-slate-500 p-4 font-karla`}
    >
      <p className="text-center text-base">
        © Copyright 2024 Budgetter. All rights reserved.
      </p>
    </div>
  );
};

export default AuthFooter;

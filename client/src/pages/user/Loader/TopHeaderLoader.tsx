import React from 'react';

const TopHeaderLoader: React.FC = () => {
  return (
    <>
      <div className="topheader_container sticky top-0 z-10 ml-0.5 flex h-16 w-full animate-pulse items-center bg-slate-300 px-5 text-black shadow-sm dark:bg-slate-800">
        <div className="flex items-center justify-center gap-5">
          <span className="h-8 w-8 rounded-sm bg-slate-400 dark:bg-slate-900"></span>
          <span className="h-8 w-32 rounded-sm bg-slate-400 dark:bg-slate-900"></span>
        </div>
        <div className="notification_and_profile_ absolute right-4 flex items-center justify-center gap-4 sm:right-6">
          <span className="h-8 w-8 rounded-full bg-slate-400 dark:bg-slate-900"></span>
          <span className="h-8 w-8 rounded-sm bg-slate-400 dark:bg-slate-900"></span>
        </div>
      </div>
    </>
  );
};

export default TopHeaderLoader;

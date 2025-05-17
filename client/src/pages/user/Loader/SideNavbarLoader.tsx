import React from 'react';

const SideNavbarLoader: React.FC = () => {
  return (
    <>
      <div className="sidenavbar_container fixed left-0 top-0 flex h-full w-52 animate-pulse flex-col gap-2 bg-slate-300 px-3 py-5 font-karla shadow-lg">
        <div className="header flex items-center justify-center p-1 py-10">
          <div className="h-14 w-full rounded-sm bg-slate-400"></div>
        </div>
        <div className="links_div flex h-full w-full flex-col items-center justify-between p-1">
          <div className="links_div flex w-full flex-col items-center justify-center gap-5">
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
          </div>
          <div className="links_div flex w-full flex-col items-center justify-center gap-5">
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbarLoader;

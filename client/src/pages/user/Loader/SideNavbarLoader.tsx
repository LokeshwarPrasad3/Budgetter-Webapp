import React from "react";

const SideNavbarLoader: React.FC = () => {
  return (
    <>
      <div className="sidenavbar_container animate-pulse bg-slate-300 font-karla fixed top-0 h-full flex flex-col w-52 left-0 px-3 py-5 gap-2 shadow-lg">
        <div className="header flex justify-center items-center py-10 p-1">
          <div className="h-14 w-full rounded-sm bg-slate-400"></div>
        </div>
        <div className="links_div h-full flex w-full flex-col justify-between items-center p-1">
          <div className=" links_div flex w-full flex-col justify-center items-center gap-5">
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
          </div>
          <div className=" links_div flex w-full flex-col justify-center items-center gap-5">
            <div className="h-11 w-full rounded-sm bg-slate-400"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNavbarLoader;

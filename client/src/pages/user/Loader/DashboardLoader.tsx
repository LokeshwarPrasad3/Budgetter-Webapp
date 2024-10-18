import React from "react";

const DashboardLoader: React.FC = () => {
  return (
    <>
      <div className="dashboard_page_ animate-pulse flex flex-col justify-start items-start w-full gap-7">
        <div className="heading_dashboard_page flex justify-start items-start w-full mt-2">
          <h3 className="font-semibold text-lg text-left w-full h-10 bg-slate-300 rounded-sm"></h3>
        </div>
        <div className="summarize_box_container flex flex-col justify-start items-start gap-4 bg-slate-300 rounded-md w-full p-4 px-5 shadow-sm"></div>
        <div className="summarize_box_container bg-slate-300 flex flex-col justify-start items-start gap-4 rounded-md w-full shadow-sm">
          <h4 className="text-base font-semibold bg-slate-400 w-full h-10"></h4>
          <div className="summary_boxes_outer grid grid-cols-12 col-span-12 gap-y-5 gap-x-0 sm:gap-x-7 sm:gap-y-7 p-5 sm:p-7 pt-3 justify-center w-full">
            <div className="min-w-full max-w-full col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-slate-400 w-full h-24 rounded-sm"></div>
            <div className="min-w-full max-w-full col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-slate-400 w-full h-24 rounded-sm"></div>
            <div className="min-w-full max-w-full col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-slate-400 w-full h-24 rounded-sm"></div>
            <div className="min-w-full max-w-full col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 bg-slate-400 w-full h-24 rounded-sm"></div>
          </div>
        </div>
        <div className="graph flex flex-row justify-center items-center h-72 w-full gap-5">
          <div className="chat_graph_container h-full w-full flex rounded-sm bg-slate-300 justify-center flex-col xl:flex-row items-center gap-y-10 md:gap-5"></div>
          <div className="visual_graph_container h-full w-full flex rounded-sm bg-slate-300 justify-center flex-col xl:flex-row items-center gap-y-10 md:gap-5"></div>
        </div>
        <div className="graph flex flex-row justify-center items-center h-72 w-full gap-5">
          <div className="chat_graph_container h-full w-full flex rounded-sm bg-slate-300 justify-center flex-col xl:flex-row items-center gap-y-10 md:gap-5"></div>
          <div className="visual_graph_container h-full w-full flex rounded-sm bg-slate-300 justify-center flex-col xl:flex-row items-center gap-y-10 md:gap-5"></div>
        </div>
      </div>
    </>
  );
};

export default DashboardLoader;

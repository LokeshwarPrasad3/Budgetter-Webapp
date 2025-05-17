import React from 'react';

const DashboardLoader: React.FC = () => {
  return (
    <>
      <div className="dashboard_page_ flex w-full animate-pulse flex-col items-start justify-start gap-7 md:gap-10">
        <div className="heading_dashboard_page mt-2 flex w-full items-start justify-start">
          <h3 className="h-10 w-full rounded-sm bg-slate-300 text-left text-lg font-semibold dark:bg-slate-800 md:h-12"></h3>
        </div>
        <div className="summarize_box_container flex h-10 w-full flex-col items-start justify-start gap-4 rounded-md bg-slate-300 p-4 px-5 dark:bg-slate-800 md:h-12"></div>
        <div className="summarize_box_container flex w-full flex-col items-start justify-start gap-4 rounded-md">
          <div className="summary_boxes_outer col-span-12 grid w-full grid-cols-12 justify-center gap-x-0 gap-y-5 sm:gap-x-10 sm:gap-y-7">
            <div className="col-span-12 h-24 w-full min-w-full max-w-full rounded-sm bg-slate-300 dark:bg-slate-800 sm:col-span-6 md:col-span-4 md:h-32 lg:col-span-3"></div>
            <div className="col-span-12 h-24 w-full min-w-full max-w-full rounded-sm bg-slate-300 dark:bg-slate-800 sm:col-span-6 md:col-span-4 md:h-32 lg:col-span-3"></div>
            <div className="col-span-12 h-24 w-full min-w-full max-w-full rounded-sm bg-slate-300 dark:bg-slate-800 sm:col-span-6 md:col-span-4 md:h-32 lg:col-span-3"></div>
            <div className="col-span-12 h-24 w-full min-w-full max-w-full rounded-sm bg-slate-300 dark:bg-slate-800 sm:col-span-6 md:col-span-4 md:h-32 lg:col-span-3"></div>
          </div>
        </div>
        <div className="graph flex h-72 w-full flex-row flex-wrap items-center justify-center gap-10 md:h-96 md:flex-nowrap">
          <div className="chat_graph_container flex h-full w-full flex-col items-center justify-center gap-y-10 rounded-sm bg-slate-300 dark:bg-slate-800 md:gap-5 xl:flex-row"></div>
          <div className="visual_graph_container flex h-full w-full flex-col items-center justify-center gap-y-10 rounded-sm bg-slate-300 dark:bg-slate-800 md:gap-5 xl:flex-row"></div>
        </div>
      </div>
    </>
  );
};

export default DashboardLoader;

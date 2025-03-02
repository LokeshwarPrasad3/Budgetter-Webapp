import React from 'react';

const DonutChartLoader = () => {
  return (
    <>
      <div className="chart_element_container py-6 px-3 flex flex-col sm:flex-row justify-center items-center w-full animate-pulse gap-x-7 gap-y-5">
        <div className="left_chart_container flex items-center justify-center ">
          <div className="relative w-40 h-40 rounded-full chart_loader">
            <div className="absolute inset-7 bg-white dark:bg-bg_primary_dark rounded-full flex items-center justify-center">
              <div className="text-center flex justify-center items-center flex-col gap-2">
                <p className="bg-slate-400 dark:bg-slate-600 h-6 rounded-sm w-16"></p>
                <p className="bg-slate-400 dark:bg-slate-600 h-6 rounded-sm w-10"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap sm:flex-col gap-3 justify-center sm:justify-start items-center sm:items-start text-sm">
          {new Array(5).fill(0).map(( _ ,index) => (
            <React.Fragment key={index}>
              <div className="flex items-center space-x-2">
                <div className="bg-slate-400 dark:bg-slate-700 w-5 h-5 rounded-sm"></div>
                <span className="bg-slate-400 dark:bg-slate-700 h-5 rounded-sm w-20"></span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default DonutChartLoader;

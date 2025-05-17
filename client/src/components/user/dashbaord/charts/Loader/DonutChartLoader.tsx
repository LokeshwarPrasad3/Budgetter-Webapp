import React from 'react';

const DonutChartLoader = () => {
  return (
    <>
      <div className="chart_element_container flex w-full animate-pulse flex-col items-center justify-center gap-x-7 gap-y-5 px-3 py-6 sm:flex-row">
        <div className="left_chart_container flex items-center justify-center">
          <div className="chart_loader relative h-40 w-40 rounded-full">
            <div className="absolute inset-7 flex items-center justify-center rounded-full bg-white dark:bg-bg_primary_dark">
              <div className="flex flex-col items-center justify-center gap-2 text-center">
                <p className="h-6 w-16 rounded-sm bg-slate-400 dark:bg-slate-600"></p>
                <p className="h-6 w-10 rounded-sm bg-slate-400 dark:bg-slate-600"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm sm:flex-col sm:items-start sm:justify-start">
          {new Array(5).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center space-x-2">
                <div className="h-5 w-5 rounded-sm bg-slate-400 dark:bg-slate-700"></div>
                <span className="h-5 w-20 rounded-sm bg-slate-400 dark:bg-slate-700"></span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default DonutChartLoader;

const LineChartLoader = () => {
  return (
    <div className="grid grid-cols-7 gap-3 w-full items-end px-2">
      {[120, 80, 45, 95, 60, 30, 140].map((height, index) => (
        <>
          <div className="div flex flex-col gap-2">
            <div
              key={index}
              className="col-span-1 bg-slate-400 dark:bg-slate-700 rounded-t-sm animate-pulse"
              style={{ height: `${height}px` }} // Use inline styles for dynamic height
            ></div>
            <span className="w-full h-2.5 rounded-sm bg-slate-400 dark:bg-slate-700"></span>
          </div>
        </>
      ))}
    </div>
  );
};

export default LineChartLoader;

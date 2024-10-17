
const TopHeaderLoader = () => {
  return (
    <>
      <div className="topheader_container animate-pulse bg-slate-300 sticky ml-0.5 top-0 text-black z-10 shadow-sm w-full h-16 flex items-center px-5">
        <div className="flex justify-center items-center gap-5">
          <span className="h-8 w-8 bg-slate-400 rounded-sm"></span>
          <span className="h-8 w-32 bg-slate-400 rounded-sm"></span>
        </div>
        <div className="notification_and_profile_ absolute right-4 sm:right-6 flex justify-center items-center gap-4">
          <span className="h-8 w-8 bg-slate-400 rounded-full"></span>
          <span className="h-8 w-8 bg-slate-400 rounded-sm"></span>
        </div>
      </div>
    </>
  );
};

export default TopHeaderLoader;

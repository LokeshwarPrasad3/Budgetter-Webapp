const TopHeader = () => {
  return (
    <div className="topheader_container text-black bg-[#e0e0e4] w-full absolute top-0 right-0 h-16 flex items-center px-1">
      <i className="ri-menu-line text-black font-bold mx-4 text-xl"></i>
      <div className="name text-lg">
        <h2 className="font-bold ">Dashboard</h2>
      </div>
      <div className="notification absolute right-4">
        <button className="">
          <i className="ri-notification-line text-black text-xl font-bold"></i>
        </button>
      </div>
    </div>
  );
};

export default TopHeader;

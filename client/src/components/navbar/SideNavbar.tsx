import { Link } from 'react-router-dom';
import { userSidenavbarList } from '@/data/UserSideNavbarList';
import { useSelector } from 'react-redux';

const SideNavbar = () => {
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );

  const windowWidth = useSelector(
    (state: any) => state.windowWidth.windowWidth
  );
  const isMobile = useSelector((state: any) => state.windowWidth.isMobile);

  return (
    <div
      className={`sidenavbar_container font-karla fixed top-0 left-0
        ${isSideNavbarOpen ? 'w-52' : 'w-[72px]'} 
         h-full bg-[#1b1a1d] flex flex-col px-3 py-5 gap-2 shadow-lg z-50`}
    >
      <div className="sidenavbar_heading_container py-5 pl-4 flex items-center relative">
        {/* 
        <img className="h-6" src="./assets/logo/logo_name.png" alt="logo" /> 
        */}
        {!isSideNavbarOpen && !isMobile && (
          <img
            className="h-8 relative right-1"
            src="./assets/logo/logo.png"
            alt="logo"
          />
        )}
        {isSideNavbarOpen && !isMobile && (
          <h1 className="text-gray-200 text-2xl font-bold">Budgetter</h1>
        )}
      </div>
      {/* menu icons */}
      <div className="sidenavbar_menu_container flex flex-col gap-3">
        {userSidenavbarList.map(({ route, name, icon }, index) => (
          <Link
            key={index}
            to={`/${route}`}
            className="sidenavbar_menulink_container relative flex justify-start gap-3 w-full px-3 rounded-sm py-2 hover:bg-[#289288] items-center"
          >
            <i className={`${icon} text-2xl text-white`}></i>
            <span
              className={`text-base font-medium text-white absolute ${isSideNavbarOpen && !isMobile ? 'left-14' : 'left-20'} capitalize`}
            >
              {name}
            </span>
          </Link>
        ))}
      </div>
      {/* logout button */}
      <div className="menu_logout_container absolute bottom-5 left-3 right-3 flex flex-col gap-3  ">
        <Link
          to="/logout"
          className="logout_container relative flex justify-start gap-3 w-full px-3 rounded-sm py-2 bg-slate-800 hover:bg-[#289288] items-center"
        >
          <i className="ri-logout-box-r-line text-2xl text-white"></i>
          <span
            className={`text-base font-medium text-white absolute ${isSideNavbarOpen && !isMobile ? 'left-14' : 'left-20'}`}
          >
            Logout
          </span>
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;

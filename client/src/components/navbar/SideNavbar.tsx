import { Link } from 'react-router-dom';
import { userSidenavbarList } from '@/data/UserSideNavbarList';
import { useSelector } from 'react-redux';

const SideNavbar = () => {
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );

  return (
    <div
      className={`sidenavbar_container font-karla fixed top-0
        ${!isSideNavbarOpen ? 'left-[-208px]' : 'left-0'} 
        w-52 h-full bg-[#1b1a1d] flex flex-col px-3 py-5 gap-3 shadow-lg z-50`}
    >
      <div className="sidenavbar_heading_container py-5 pl-4 flex items-center">
        {/* <img className="h-8" src="./assets/logo/logo.png" alt="logo" />
        <img className="h-6" src="./assets/logo/logo_name.png" alt="logo" /> */}
        <h1 className="text-gray-200 text-2xl font-bold">Budgetter</h1>
      </div>
      {/* menu icons */}
      <div className="sidenavbar_menu_container flex flex-col gap-3">
        {userSidenavbarList.map(({ route, name, icon }, index) => (
          <Link
            key={index}
            to={`/${route}`}
            className="sidenavbar_menulink_container flex justify-start gap-3 w-full px-3 rounded-sm py-2 hover:bg-[#289288] items-center"
          >
            <i className={`${icon} text-xl text-white`}></i>
            <span className="text-base font-medium text-white capitalize">
              {name}
            </span>
          </Link>
        ))}
      </div>
      {/* logout button */}
      <div className="menu_logout_container absolute bottom-5 left-2 right-2 flex flex-col gap-3  ">
        <Link
          to="/logout"
          className="logout_container flex justify-start gap-3 w-full px-3 rounded-sm py-2 bg-slate-800 hover:bg-[#289288] items-center"
        >
          <i className="ri-logout-box-r-line text-xl text-white"></i>
          <span className="text-base font-medium text-white">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default SideNavbar;

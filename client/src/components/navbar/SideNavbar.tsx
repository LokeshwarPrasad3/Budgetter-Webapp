import { Link } from 'react-router-dom';
import { userSidenavbarList } from '@/data/UserSideNavbarList';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideNavbar } from '../../features/sideNavbar/sideNavbarSlice';
import LogoImage from '../../../public/assets/logo/logo.png';

const SideNavbar = () => {
  const dispatch = useDispatch();
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );
  const isMobile = useSelector((state: any) => state.windowWidth.isMobile);

  return (
    <>
      <div
        className={`sidenavbar_container font-karla fixed top-0 transition-all duration-300 ease-in
        ${isSideNavbarOpen && !isMobile ? 'w-52 left-0' : ''} 
        ${isSideNavbarOpen && isMobile ? 'w-52 left-0' : ''} 
        ${!isSideNavbarOpen && !isMobile ? 'w-[72px] left-0' : ''} 
        ${!isSideNavbarOpen && isMobile ? 'w-0 left-[-210px]' : ''} 
         h-full bg-[#1b1a1d] flex flex-col px-3 py-5 gap-2 shadow-lg z-50 overflow-hidden`}
      >
        <Link
          to="/"
          className="sidenavbar_heading_container py-5 pl-4 flex items-center relative"
        >
          {/* 
        <img className="h-6" src="./assets/logo/logo_name.png" alt="logo" /> 
        */}
          {!isSideNavbarOpen && !isMobile && (
            <img className="h-8 relative right-1" src={LogoImage} alt="logo" />
          )}
          {isSideNavbarOpen && !isMobile && (
            <h1 className="text-gray-200 text-2xl font-bold">Budgetter</h1>
          )}
          {isSideNavbarOpen && isMobile && (
            <h1 className="text-gray-200 text-2xl font-bold">Budgetter</h1>
          )}
        </Link>
        {/* menu icons */}
        <div className="sidenavbar_menu_container flex flex-col gap-3">
          {userSidenavbarList.map(({ route, name, icon }, index) => (
            <Link
              key={index}
              to={`/${route}`}
              onClick={() => dispatch(closeSideNavbar())}
              className="sidenavbar_menulink_container relative flex justify-start gap-3 w-full px-3 rounded-sm py-2 hover:bg-[#289288] items-center"
            >
              <i className={`${icon} text-2xl text-white`}></i>
              <span
                className={`text-base font-medium text-white absolute transition-all duration-700 ease-in
              ${!isSideNavbarOpen && !isMobile && 'left-16'}
              ${isSideNavbarOpen && !isMobile && 'left-12'}
              ${isSideNavbarOpen && isMobile && 'left-12'}
                 capitalize whitespace-nowrap`}
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
              className={`text-base font-medium text-white absolute transition-all duration-500 ease-in
               ${!isSideNavbarOpen && !isMobile && 'left-16'}
              ${isSideNavbarOpen && !isMobile && 'left-12'}
              ${isSideNavbarOpen && isMobile && 'left-12'}
              capitalize whitespace-nowrap`}
            >
              Logout
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideNavbar;

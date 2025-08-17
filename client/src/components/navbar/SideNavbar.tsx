import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideNavbar } from '../../features/sideNavbar/sideNavbarSlice';
import LogoImage from '../../../public/assets/logo/logo.png';
import { Tooltip } from 'react-tooltip';
import React, { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UserLogout } from '@/services/auth';
import { Loader2, LogOut } from 'lucide-react';
import { getActiveRouteLink } from '@/utils/utility';
import Cookies from 'universal-cookie';
import { googleLogout } from '@react-oauth/google';
import { userSidenavbarListType } from '@/data/UserSideNavbarList';

interface SideNavbarProps {
  userSidenavbarList: userSidenavbarListType[];
}

const SideNavbar: React.FC<SideNavbarProps> = ({ userSidenavbarList }) => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const overlayRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );
  const showOverlayEffect = useSelector(
    (state: any) => state.sideNavbar.showOverlayEffect
  );
  const isMobile = useSelector((state: any) => state.windowWidth.isMobile);

  useEffect(() => {
    const handleNavbarClose = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        overlayRef.current &&
        overlayRef.current.contains(target) &&
        navbarRef.current &&
        !navbarRef.current.contains(target) &&
        window.innerWidth < 768
      ) {
        dispatch(closeSideNavbar());
      }
    };

    document.addEventListener('click', handleNavbarClose);

    return () => {
      document.removeEventListener('click', handleNavbarClose);
    };
  }, []);

  const { mutateAsync: userLogoutMutate, isPending } = useMutation({
    mutationFn: UserLogout,
    onSuccess: (data) => {
      console.log(data?.message);
      googleLogout();
      cookie.remove('accessToken', { path: '/' });
      navigate('/');
      // make default light mode becasue landing page not available for dark
      document.body.classList.remove('dark');
      localStorage.removeItem('hasSeenTour');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleUserLogout = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    userLogoutMutate();
  };

  return (
    <>
      {showOverlayEffect && (
        <div
          ref={overlayRef}
          className={`overlay_effect fixed inset-0 z-[11] h-full w-full bg-black/30 backdrop-blur-sm md:static`}
        ></div>
      )}
      <div
        ref={navbarRef}
        className={`sidenavbar_container fixed top-0 font-karla ${isSideNavbarOpen && !isMobile ? 'left-0 w-52' : ''} ${isSideNavbarOpen && isMobile ? 'left-0 w-52' : ''} ${!isSideNavbarOpen && !isMobile ? 'left-0 w-[68px]' : ''} ${!isSideNavbarOpen && isMobile ? 'left-[-210px] w-0' : ''} z-50 flex h-full flex-col gap-2 overflow-hidden bg-white px-3 py-5 text-text_sidebar shadow-lg dark:bg-bg_sidebar`}
      >
        <Link
          to="/"
          className="sidenavbar_heading_container relative flex items-center py-5 pl-2.5 2xl:py-6"
        >
          {/* 
        <img className="h-6" src="./assets/logo/logo_name.png" alt="logo" /> 
        */}
          {!isSideNavbarOpen && !isMobile && (
            <img className="relative right-1 h-8" src={LogoImage} alt="logo" />
          )}
          {isSideNavbarOpen && (
            <>
              <img
                className="relative right-1 h-8"
                src={LogoImage}
                alt="logo"
              />
              <h1 className="ml-2 bg-gradient-to-r from-[#2e7dff] to-[#00b87c] bg-clip-text text-2xl font-bold text-transparent dark:text-gray-200">
                Budgetter
              </h1>
            </>
          )}
        </Link>
        {/* menu icons */}
        <div
          id="sidebar_section"
          className="sidenavbar_menu_container flex flex-col gap-2 sm:gap-3"
        >
          {userSidenavbarList.map(({ route, name, icon: Icon }, index) => (
            <Link
              data-tooltip-id="navbarTooltip"
              data-tooltip-content={name}
              data-tooltip-place="right"
              key={index}
              to={`/${route}`}
              onClick={() => dispatch(closeSideNavbar())}
              className={`sidenavbar_menulink_container relative flex w-full justify-start gap-3 rounded-sm px-3 py-3 sm:py-2.5 ${getActiveRouteLink() === route ? 'bg-gradient-to-r from-[#065f46]/80 via-[#047857]/80 to-[#059669]/80 font-semibold text-white dark:bg-bg_active_sidebar_link' : 'font-semibold text-slate-700 dark:text-white sm:font-medium'} items-center hover:bg-[#059669]/40 dark:hover:bg-slate-700`}
            >
              <Icon className="h-5 w-5" />
              <span
                className={`font- absolute text-base ${!isSideNavbarOpen && !isMobile && 'left-16'} ${isSideNavbarOpen && !isMobile && 'left-11'} ${isSideNavbarOpen && isMobile && 'left-11'} whitespace-nowrap capitalize`}
              >
                {name}
              </span>
            </Link>
          ))}
        </div>
        {/* logout button */}
        <div
          id="logout_section"
          className="menu_logout_container absolute bottom-5 left-3 right-3 flex flex-col gap-3"
        >
          <button
            data-tooltip-id="navbarTooltip"
            data-tooltip-content="Logout"
            data-tooltip-place="right"
            className="logout_container relative flex w-full items-center justify-start gap-3 rounded-sm bg-gradient-to-r from-[#065f46]/80 via-[#047857]/80 to-[#059669]/80 px-3 py-2.5 hover:bg-gradient-to-tr"
            onClick={handleUserLogout}
          >
            {isPending ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="absolute left-12">Signin out . . .</span>
              </>
            ) : (
              <>
                <LogOut className="h-5 w-5" />
                <span
                  className={`absolute text-base ${!isSideNavbarOpen && !isMobile && 'left-16'} ${isSideNavbarOpen && !isMobile && 'left-11'} ${isSideNavbarOpen && isMobile && 'left-11'} whitespace-nowrap capitalize`}
                >
                  Logout
                </span>
              </>
            )}
          </button>
        </div>
      </div>
      <Tooltip
        className="custom-react-tooltip dark:custom-react-tooltip"
        id="navbarTooltip"
      />
    </>
  );
};

export default SideNavbar;

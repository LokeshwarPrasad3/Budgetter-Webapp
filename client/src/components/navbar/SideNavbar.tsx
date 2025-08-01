import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { closeSideNavbar } from '../../features/sideNavbar/sideNavbarSlice';
import LogoImage from '../../../public/assets/logo/logo.png';
import { Tooltip } from 'react-tooltip';
import React, { useEffect, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { UserLogout } from '@/services/auth';
import { Loader2 } from 'lucide-react';
import { getActiveRouteLink } from '@/utils/utility';
import Cookies from 'universal-cookie';
import { googleLogout } from '@react-oauth/google';

interface SideNavbarPropType {
  route: string;
  name: string;
  icon: string;
}
interface SideNavbarProps {
  userSidenavbarList: SideNavbarPropType[];
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
        className={`sidenavbar_container fixed top-0 font-karla ${isSideNavbarOpen && !isMobile ? 'left-0 w-52' : ''} ${isSideNavbarOpen && isMobile ? 'left-0 w-52' : ''} ${!isSideNavbarOpen && !isMobile ? 'left-0 w-[72px]' : ''} ${!isSideNavbarOpen && isMobile ? 'left-[-210px] w-0' : ''} z-50 flex h-full flex-col gap-2 overflow-hidden bg-bg_sidebar px-3 py-5 text-text_sidebar shadow-lg`}
      >
        <Link
          to="/"
          className="sidenavbar_heading_container relative flex items-center py-5 pl-4"
        >
          {/* 
        <img className="h-6" src="./assets/logo/logo_name.png" alt="logo" /> 
        */}
          {!isSideNavbarOpen && !isMobile && (
            <img className="relative right-1 h-8" src={LogoImage} alt="logo" />
          )}
          {isSideNavbarOpen && !isMobile && (
            <h1 className="text-2xl font-bold text-gray-200">Budgetter</h1>
          )}
          {isSideNavbarOpen && isMobile && (
            <h1 className="text-2xl font-bold text-gray-200">Budgetter</h1>
          )}
        </Link>
        {/* menu icons */}
        <div
          id="sidebar_section"
          className="sidenavbar_menu_container flex flex-col gap-3"
        >
          {userSidenavbarList.map(({ route, name, icon }, index) => (
            <Link
              data-tooltip-id="navbarTooltip"
              data-tooltip-content={name}
              data-tooltip-place="right"
              key={index}
              to={`/${route}`}
              onClick={() => dispatch(closeSideNavbar())}
              className={`sidenavbar_menulink_container relative flex w-full justify-start gap-3 rounded-sm px-3 py-2 ${getActiveRouteLink() === route ? 'bg-bg_active_sidebar_link' : ''} items-center hover:bg-slate-700`}
            >
              <i className={`${icon} text-2xl`}></i>
              <span
                className={`font- absolute text-base ${!isSideNavbarOpen && !isMobile && 'left-16'} ${isSideNavbarOpen && !isMobile && 'left-12'} ${isSideNavbarOpen && isMobile && 'left-12'} whitespace-nowrap capitalize`}
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
            className="logout_container relative flex h-12 w-full items-center justify-start gap-3 rounded-sm bg-slate-700 px-3 py-2 hover:bg-bg_active_sidebar_link dark:hover:bg-slate-500"
            onClick={handleUserLogout}
          >
            <i className="ri-logout-box-r-line text-2xl"></i>
            <span
              className={`font-mediu absolute text-base transition-all duration-500 ease-in ${!isSideNavbarOpen && !isMobile && 'left-16'} ${isSideNavbarOpen && !isMobile && 'left-12'} ${isSideNavbarOpen && isMobile && 'left-12'} whitespace-nowrap capitalize`}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                'Logout'
              )}
            </span>
          </button>
        </div>
      </div>
      <Tooltip className="custom-react-tooltip" id="navbarTooltip" />
    </>
  );
};

export default SideNavbar;

import React, { useEffect, useState } from 'react';
import { getTopHeaderName } from '../hooks/HeaderName';
import { useLocation } from 'react-router-dom';
import { toggleSideNavbar } from '../../features/sideNavbar/sideNavbarSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from 'react-tooltip';
import { Link } from 'react-router-dom';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Bell, Fullscreen, Minimize, Moon, Play, Sun } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { CheckUserAccountVerified } from '@/services/auth';
import { setUserVerified } from '@/features/user/user';
import UserTourGuide from '../layout/UserTourGuide';
import { toggleThemeMode } from '@/features/theme/themeModeSlice';

const TopHeader: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  type Notification = {
    value: string;
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const isNewUser = useSelector((state: any) => state.user.user.lastLogin);

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentHeaderName, setCurrentHeaderName] = useState<string>('');
  // for triggering user tour guide
  const [isTourTriggered, setIsTourTriggered] = useState<boolean>(false);

  // get user verified or not
  const { data } = useQuery({
    queryFn: () => CheckUserAccountVerified(),
    queryKey: ['checkUserAccountVerified'],
  });

  const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(
    useSelector((state: any) => !state.user?.user?.isVerified)
  );

  const handlePopoverClose = (open: boolean) => {
    setIsPopoverOpen(open);
  };

  const isUserVerified = useSelector(
    (state: any) => state.user?.user?.isVerified
  );

  const isDarkMode = useSelector((state: any) => state.themeMode.isDarkMode);
  const handleToggleThemeMode = () => {
    dispatch(toggleThemeMode());
  };

  useEffect(() => {
    const path = location.pathname;
    // const pathParts = path.split('/');
    // const pathName = pathParts[pathParts.length - 1];

    const headerName = getTopHeaderName(path);
    setCurrentHeaderName(headerName);
  }, [location.pathname]);

  useEffect(() => {
    if (data?.data) {
      setNotifications([]);
      dispatch(setUserVerified(true));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if (!isUserVerified) {
      setNotifications([
        { value: 'Your Account is not Verified, Please Check Your Email.' },
      ]);
    }
  }, [isUserVerified]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      setIsFullScreen(true);
      // Maximize (Enter fullscreen mode)
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      // Minimize (Exit fullscreen mode)
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    const alreadySeenTour = localStorage.getItem('hasSeenTour');
    if (!isNewUser && !alreadySeenTour) {
      localStorage.setItem('hasSeenTour', 'true');
      setIsTourTriggered(true);
    }
  }, [isNewUser]);

  return (
    <>
      <div className="topheader_container sticky top-0 z-40 flex h-full min-h-16 w-full items-center bg-bg_primary_light px-1 text-text_primary_light shadow-sm dark:border-l dark:bg-bg_primary_dark dark:text-text_primary_dark">
        <i
          id="menu_toggle_button_section"
          onClick={() => dispatch(toggleSideNavbar())}
          className="ri-menu-line mx-4 cursor-pointer text-xl font-bold text-text_primary_light dark:text-text_primary_dark"
        ></i>
        <div className="name text-lg">
          <h2 className="font-bold">{currentHeaderName}</h2>
        </div>
        <div className="notification_and_profile_ absolute right-4 flex items-center justify-center gap-2.5 sm:right-6">
          <button
            // data-tooltip-id="header-tooltip"
            // data-tooltip-content="Start Tour"
            id="start_tour_guide"
            onClick={() => setIsTourTriggered(true)}
            className="group hidden h-10 w-10 cursor-pointer items-center overflow-hidden rounded-full bg-[#f2f5fa] p-2.5 text-black transition-all duration-300 hover:h-9 hover:w-[132px] hover:bg-[#047857]/20 hover:px-4 focus:outline-none dark:bg-[#10101c] dark:text-white dark:hover:bg-slate-700 sm:flex"
          >
            <Play className="h-5 w-5 shrink-0 transition-all duration-300" />
            <span className="ml-1.5 whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Take a Tour
            </span>
          </button>
          <button
            onClick={toggleFullscreen}
            // data-tooltip-id="header-tooltip"
            // data-tooltip-content="Maximize Screen"
            // data-tooltip-id="header-tooltip"
            // data-tooltip-content="Minimize Screen"
            id="fullscreens_tour_guide"
            className={`group hidden h-10 w-10 cursor-pointer items-center overflow-hidden rounded-full bg-[#f2f5fa] p-2.5 text-black transition-all duration-300 hover:h-9 hover:w-[118px] hover:bg-[#047857]/20 hover:px-4 focus:outline-none dark:bg-[#10101c] dark:text-white dark:hover:bg-slate-700 sm:flex ${isFullScreen ? 'bg-[#047857]/20 dark:bg-slate-700' : ''} `}
          >
            {!isFullScreen ? (
              <Fullscreen className="h-5 w-5 shrink-0 transition-all duration-300" />
            ) : (
              <Minimize className="h-5 w-5 shrink-0 transition-all duration-300" />
            )}
            <span className="ml-1.5 whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {isFullScreen ? 'Minmize' : 'Maximize'}
            </span>
          </button>
          <button
            id="theme_change_tour"
            // data-tooltip-id="header-tooltip"
            // data-tooltip-content="Switch to Dark"
            // data-tooltip-id="header-tooltip"
            // data-tooltip-content="Switch to Light"
            onClick={handleToggleThemeMode}
            className="theme_container_toggle group hidden h-10 w-10 cursor-pointer items-center overflow-hidden rounded-full bg-[#f2f5fa] p-2.5 text-black transition-all duration-300 hover:h-9 hover:w-[156px] hover:bg-[#047857]/20 hover:px-4 focus:outline-none dark:bg-[#10101c] dark:text-white dark:hover:bg-slate-700 sm:flex"
          >
            {!isDarkMode ? (
              <Moon className="h-5 w-5 shrink-0 transition-all duration-300" />
            ) : (
              <Sun className="h-5 w-5 shrink-0 transition-all duration-300" />
            )}
            <span className="ml-1.5 whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {isDarkMode ? 'Switch to Light' : 'Switch to Dark'}
            </span>
          </button>
          <Popover onOpenChange={handlePopoverClose} open={isPopoverOpen}>
            <PopoverTrigger asChild>
              <div className="container_notification relative">
                <button
                  id="notification_section"
                  // data-tooltip-id="header-tooltip"
                  // data-tooltip-content="Notification"
                  // data-tooltip-place="bottom"
                  className="notification_icon group relative hidden h-10 w-10 cursor-pointer items-center overflow-hidden rounded-full bg-[#f2f5fa] p-2.5 text-black transition-all duration-300 hover:h-9 hover:w-[132px] hover:bg-[#047857]/20 hover:px-4 focus:outline-none dark:bg-[#10101c] dark:text-white dark:hover:bg-slate-700 sm:flex"
                >
                  <Bell className="h-5 w-5 shrink-0 transition-all duration-300" />
                  <span className="ml-1.5 whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Notification
                  </span>
                </button>
                {notifications.length !== 0 && (
                  <span className="absolute -right-0 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC4EA2] text-xs text-white">
                    {notifications.length}
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="mr-2 w-auto p-2 px-3">
              <div className="content_container">
                <p
                  className="cursor-pointer"
                  onClick={() => handlePopoverClose(false)}
                >
                  {notifications.length === 0 ? (
                    ' No Notification 😊'
                  ) : (
                    <>
                      {notifications.map(({ value }, index) => (
                        <span key={index} className="font-medium text-red-700">
                          {value}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              </div>
            </PopoverContent>
          </Popover>
          <Link
            id="profile_section"
            to="/user/profile"
            // data-tooltip-id="header-tooltip"
            // // data-tooltip-content="Profile"
            // data-tooltip-place="bottom"
            className="group flex h-9 w-9 items-center justify-start gap-1 overflow-hidden rounded-full border border-pink-300 transition-all duration-300 hover:w-32 hover:border-pink-200 hover:bg-[#047857]/20 hover:p-1 hover:py-2 dark:border-0 dark:hover:bg-slate-700 sm:flex"
          >
            <img
              src={useSelector((state: any) => state.user.user.avatar)}
              alt="avatar"
              className="h-9 w-9 shrink-0 rounded-full object-cover group-hover:h-8 group-hover:w-8"
            />
            <span className="whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Visit Profile
            </span>
          </Link>
        </div>
      </div>
      <Tooltip className="custom-react-tooltip" id="header-tooltip" />
      <UserTourGuide
        isTourTriggered={isTourTriggered}
        setIsTourTriggered={setIsTourTriggered}
      />
    </>
  );
};

export default TopHeader;

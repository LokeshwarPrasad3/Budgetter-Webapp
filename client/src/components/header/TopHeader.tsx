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
          <div
            id="start_tour_guide"
            className="hidden h-10 w-10 items-center justify-center rounded-full bg-[#f2f5fa] hover:bg-slate-200 dark:bg-[#10101c] dark:hover:bg-slate-800 sm:flex"
          >
            <Play
              data-tooltip-id="header-tooltip"
              data-tooltip-content="Start Tour"
              onClick={() => setIsTourTriggered(true)}
              className="h-5 w-5 cursor-pointer"
            />
          </div>
          <div
            id="fullscreens_tour_guide"
            className={`flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f5fa] hover:bg-slate-200 dark:bg-[#10101c] dark:hover:bg-slate-800 ${isFullScreen ? 'bg-slate-200 dark:bg-slate-700' : ''} `}
          >
            {!isFullScreen ? (
              <Fullscreen
                onClick={toggleFullscreen}
                data-tooltip-id="header-tooltip"
                data-tooltip-content="Maximize Screen"
                className="h-5 w-5 cursor-pointer outline-none ring-offset-0"
              />
            ) : (
              <Minimize
                onClick={toggleFullscreen}
                data-tooltip-id="header-tooltip"
                data-tooltip-content="Minimize Screen"
                className="h-5 w-5 cursor-pointer outline-none ring-offset-0"
              />
            )}
          </div>
          <div className="theme_container_toggle flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f5fa] hover:bg-slate-200 dark:bg-[#10101c] dark:hover:bg-slate-800">
            {!isDarkMode ? (
              <Moon
                onClick={handleToggleThemeMode}
                data-tooltip-id="header-tooltip"
                data-tooltip-content="Switch to Dark"
                className="h-5 w-5 cursor-pointer select-none focus:outline-none"
              />
            ) : (
              <Sun
                onClick={handleToggleThemeMode}
                data-tooltip-id="header-tooltip"
                data-tooltip-content="Switch to Light"
                className="h-5 w-5 cursor-pointer select-none focus:outline-none"
              />
            )}
          </div>
          <Popover onOpenChange={handlePopoverClose} open={isPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                id="notification_section"
                className="notification_icon relative flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f5fa] hover:bg-slate-200 dark:bg-[#10101c] dark:hover:bg-slate-800"
              >
                <Bell
                  data-tooltip-id="header-tooltip"
                  data-tooltip-content="Notification"
                  data-tooltip-place="bottom"
                  className="h-5 w-5 focus:outline-none focus:ring-0 focus:ring-offset-0"
                />
                {notifications.length !== 0 && (
                  <span className="absolute -right-0 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#DC4EA2] text-xs text-text_primary_light">
                    {notifications.length}
                  </span>
                )}
              </button>
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
            className="profile_container h-8 w-8 cursor-pointer overflow-hidden rounded-full border border-pink-500"
          >
            <img
              data-tooltip-id="header-tooltip"
              data-tooltip-content="Profile"
              data-tooltip-place="bottom"
              src={useSelector((state: any) => state.user.user.avatar)}
              className="h-full w-full"
              alt="logo"
            />
          </Link>
        </div>
      </div>
      <Tooltip className="z-50 hidden md:block" id="header-tooltip" />
      <UserTourGuide
        isTourTriggered={isTourTriggered}
        setIsTourTriggered={setIsTourTriggered}
      />
    </>
  );
};

export default TopHeader;

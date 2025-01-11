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
import { Bell, Play } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { CheckUserAccountVerified } from '@/services/auth';
import { setUserVerified } from '@/features/user/user';
import UserTourGuide from '../layout/UserTourGuide';

const TopHeader: React.FC = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  type Notification = {
    value: string;
  };

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

  useEffect(() => {
    const path = location.pathname;
    const pathParts = path.split('/');
    const pathName = pathParts[pathParts.length - 1];

    const headerName = getTopHeaderName(pathName);
    setCurrentHeaderName(headerName);
  }, [location.pathname]);

  useEffect(() => {
    if (data?.data) {
      setNotifications([]);
      dispatch(setUserVerified(true));
    }
  }, [data, dispatch]);

  useEffect(() => {
    if(!isUserVerified){
      setNotifications([
        { value: 'Your Account is not Verified, Please Check Your Email.' },
      ]);
    }
  }, [isUserVerified]);

  return (
    <>
      <div className="topheader_container sticky top-0 text-black bg-[#FFFEFE] z-0 shadow-sm w-full h-16 flex items-center px-1">
        <i
          id="menu_toggle_button_section"
          onClick={() => dispatch(toggleSideNavbar())}
          className="ri-menu-line cursor-pointer text-black font-bold mx-4 text-xl"
        ></i>
        <div className="name text-lg">
          <h2 className="font-bold ">{currentHeaderName}</h2>
        </div>
        <div className="notification_and_profile_ absolute right-4 sm:right-6 flex justify-center items-center gap-4">
          <div
            id="start_tour_guide"
            className="flex justify-center items-center bg-[#f2f5fa] dark:bg-[#10101c] rounded-full h-10 w-10"
          >
            <Play
              data-tooltip-id="header-tooltip"
              data-tooltip-content="Start Tour"
              onClick={() => setIsTourTriggered(true)}
              className="cursor-pointer h-5 w-5 text-slate-700"
            />
          </div>
          <Link
            id="profile_section"
            to="/user/profile"
            className="profile_container cursor-pointer h-8 w-8 rounded-full border border-pink-500 overflow-hidden"
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
          <Popover onOpenChange={handlePopoverClose} open={isPopoverOpen}>
            <PopoverTrigger asChild>
              <button
                id="notification_section"
                className="relative notification_icon flex justify-center items-center bg-[#f2f5fa] dark:bg-[#10101c] rounded-full h-10 w-10"
              >
                <Bell
                  data-tooltip-id="header-tooltip"
                  data-tooltip-content="Notification"
                  data-tooltip-place="bottom"
                  className="focus:outline-none focus:ring-0 focus:ring-offset-0 text-red-700"
                />
                {notifications.length !== 0 && (
                  <span className="absolute flex justify-center items-center -top-1 -right-0 h-4 w-4 rounded-full bg-[#DC4EA2] text-white text-xs">
                    {notifications.length}
                  </span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2 px-3 mr-2">
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
                        <span key={index} className="text-red-700 font-medium">
                          {value}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <Tooltip className="hidden md:block" id="header-tooltip" />
      <UserTourGuide
        isTourTriggered={isTourTriggered}
        setIsTourTriggered={setIsTourTriggered}
      />
    </>
  );
};

export default TopHeader;

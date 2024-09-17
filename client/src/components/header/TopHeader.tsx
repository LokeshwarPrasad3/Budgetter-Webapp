import { useEffect, useState } from 'react';
import { getTopHeaderName } from '../hooks/HeaderName';
import { useLocation } from 'react-router-dom';
import { toggleSideNavbar } from '../../features/sideNavbar/sideNavbarSlice';
import { useDispatch } from 'react-redux';
import {Tooltip} from "react-tooltip"

const TopHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [currentHeaderName, setCurrentHeaderName] = useState('');

  useEffect(() => {
    const path = location.pathname;
    const pathParts = path.split('/');
    const pathName = pathParts[pathParts.length - 1];

    const headerName = getTopHeaderName(pathName);
    setCurrentHeaderName(headerName);
  }, [location.pathname]);

  return (
    <>
      <div className="topheader_container relative text-black bg-[#F6F7FB] w-full h-16 flex items-center px-1">
        <i
          onClick={() => dispatch(toggleSideNavbar())}
          className="ri-menu-line cursor-pointer text-black font-bold mx-4 text-xl"
        ></i>
        <div className="name text-lg">
          <h2 className="font-bold ">{currentHeaderName}</h2>
        </div>
        <div className="notification_and_profile_ absolute right-4 sm:right-6 flex justify-center items-center gap-4">
          <div className="profile_container h-8 w-8 rounded-full border border-pink-500 overflow-hidden">
            <img
              data-tooltip-id="header-tooltip"
              data-tooltip-content="Profile"
              data-tooltip-place="bottom"
              src="https://picsum.photos/200/200"
              className="h-full w-full"
              alt="logo"
            />
          </div>
          <button className="">
            <i
              data-tooltip-id="header-tooltip"
              data-tooltip-content="Notification"
              className="ri-notification-line text-black text-xl font-bold"
            ></i>
          </button>
        </div>
      </div>
      <Tooltip id="header-tooltip" />
    </>
  );
};

export default TopHeader;

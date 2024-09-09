import { useEffect, useState } from 'react';
import { getTopHeaderName } from '../hooks/HeaderName';
import { useLocation } from 'react-router-dom';
import { toggleSideNavbar } from '../../features/sideNavbar/sideNavbarSlice';
import { useDispatch } from 'react-redux';

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
    <div className="topheader_container relative text-black bg-[#e0e0e4] w-full h-16 flex items-center px-1">
      <i
        onClick={() => dispatch(toggleSideNavbar())}
        className="ri-menu-line cursor-pointer text-black font-bold mx-4 text-xl"
      ></i>
      <div className="name text-lg">
        <h2 className="font-bold ">{currentHeaderName}</h2>
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

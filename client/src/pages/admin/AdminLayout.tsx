import SideNavbar from '@/components/navbar/SideNavbar';
import TopHeader from '@/components/header/TopHeader';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { adminSidenavbarList } from '@/data/AdminSidebarList';
const adminPassword = import.meta.env.VITE_BUDGETTER_ADMIN_PASSWORD;

const AdminLayout: React.FC = () => {
  // get from reducer state
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );
  // const windowWidth = useSelector(
  //   (state: any) => state.windowWidth.windowWidth
  // );
  const isMobile = useSelector((state: any) => state.windowWidth.isMobile);

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const navigate = useNavigate();
  const hasPrompted = useRef(false); // To track if the prompt has been shown already

  useEffect(() => {
    if (hasPrompted.current) return; // Prevent re-executing the prompt if it's already done

    const password = prompt('Admin Password ???');

    const isAuthenticated = password === adminPassword;

    setIsAdminAuthenticated(isAuthenticated);
    hasPrompted.current = true; // Mark the prompt as shown

    // Redirect only if authentication fails
    if (!isAuthenticated) {
      navigate('/user/dashboard');
    }
  }, [navigate]);

  return (
    <div
      className={`h-full w-full ${isAdminAuthenticated ? 'block' : 'hidden'}`}
    >
      <SideNavbar userSidenavbarList={adminSidenavbarList} />
      <div
        className={`dashboard_layout_container absolute right-0 top-0 flex flex-col ${isSideNavbarOpen && !isMobile && 'dashboard_layout_container_large_screen_open'} ${!isSideNavbarOpen && !isMobile && 'dashboard_layout_container_large_screen_close'} ${isMobile && 'dashboard_layout_container_small_screen_close'} `}
      >
        <TopHeader />
        <div className="flex flex-col items-center justify-start gap-5 px-6 py-5 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;

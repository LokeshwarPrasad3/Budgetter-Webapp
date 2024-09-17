import SideNavbar from '@/components/navbar/SideNavbar';
import TopHeader from '@/components/header/TopHeader';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  // get from reducer state
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );
  // const windowWidth = useSelector(
  //   (state: any) => state.windowWidth.windowWidth
  // );
  const isMobile = useSelector((state: any) => state.windowWidth.isMobile);

  return (
    <>
      <SideNavbar />
      <div
        className={`dashboard_layout_container absolute top-0 right-0 flex flex-col bg-[#F6F7FB]
       ${isSideNavbarOpen && !isMobile && 'dashboard_layout_container_large_screen_open'} 
        ${!isSideNavbarOpen && !isMobile && 'dashboard_layout_container_large_screen_close'} 
        ${isMobile && 'dashboard_layout_container_small_screen_close'} 
        `}
      >
        <TopHeader />
        <Outlet />
      </div>
    </>
  );
};

export default UserLayout;

import SideNavbar from '@/components/navbar/SideNavbar';
import TopHeader from '@/components/user/TopHeader';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
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
        className={`dashboard_layout_container absolute top-0 right-0 flex flex-col
       ${isSideNavbarOpen && !isMobile && 'dashboard_layout_container_large_screen_open'} 
        ${!isSideNavbarOpen && !isMobile && 'dashboard_layout_container_large_screen_close'} 
        ${isMobile && 'dashboard_layout_container_small_screen_close'} 
        `}
      >
        <TopHeader />
      </div>
    </>
  );
};

export default DashboardLayout;

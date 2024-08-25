import SideNavbar from '@/components/navbar/SideNavbar';
import TopHeader from '@/components/user/TopHeader';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
  // get from reducer state
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );
  const windowWidth = useSelector(
    (state: any) => state.windowWidth.windowWidth
  );
  const isMobile = useSelector((state: any) => state.windowWidth.isMobile);

  return (
    <>
      <SideNavbar />
      <div
        className="dashboard_layout_container absolute top-0 right-0 flex flex-col"
        style={{
          width: `${isSideNavbarOpen && !isMobile ? 'calc(100% - 208px)' : 'calc(100% - 65px)'}`,
        }}
      >
        <TopHeader />
      </div>
    </>
  );
};

export default DashboardLayout;

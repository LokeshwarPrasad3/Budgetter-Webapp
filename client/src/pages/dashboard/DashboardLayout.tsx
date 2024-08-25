import SideNavbar from '@/components/navbar/SideNavbar';
import TopHeader from '@/components/user/TopHeader';
import { useSelector } from 'react-redux';

const DashboardLayout = () => {
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );

  return (
    <>
      <SideNavbar />
      <div
        className="dashboard_layout_container absolute top-0 right-0 flex flex-col"
        style={{
          width: `${isSideNavbarOpen ? 'calc(100% - 208px)' : '100%'}`,
        }}
      >
        <TopHeader />
      </div>
    </>
  );
};

export default DashboardLayout;

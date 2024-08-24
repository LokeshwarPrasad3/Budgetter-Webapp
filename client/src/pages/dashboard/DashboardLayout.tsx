import SideNavbar from '@/components/navbar/SideNavbar';
import TopHeader from '@/components/user/TopHeader';

const DashboardLayout = () => {
  return (
    <>
      <SideNavbar />
      <div className="dashboard_layout_container absolute top-0 right-0 flex flex-col">
        <TopHeader />
      </div>
    </>
  );
};

export default DashboardLayout;

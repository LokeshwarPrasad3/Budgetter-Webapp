import SideNavbar from '@/components/navbar/SideNavbar';
import TopHeader from '@/components/header/TopHeader';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import DashboardLoader from './Loader/DashboardLoader';
import TopHeaderLoader from './Loader/TopHeaderLoader';
import React, { useEffect } from 'react';
import { userSidenavbarList } from '@/data/UserSideNavbarList';
import { getUserAllExpenses } from '@/services/expenses';
import { useQuery } from '@tanstack/react-query';
import { setAllExpenses } from '@/features/expenses/expenses';

const UserLayout: React.FC = () => {
  const dispatch = useDispatch();
  // get from reducer state
  const isSideNavbarOpen = useSelector(
    (state: any) => state.sideNavbar.isSideNavbarOpen
  );
  // const windowWidth = useSelector(
  //   (state: any) => state.windowWidth.windowWidth
  // );
  const isMobile = useSelector((state: any) => state.windowWidth.isMobile);

  const user = useSelector((state: any) => state.user?.user);

  // Use useQuery to fetch data only when necessary
  const { data: allExpensesResData } = useQuery({
    queryFn: getUserAllExpenses,
    queryKey: ['user-all-expenses'],
  });

  // Update Redux store with fetched data when available
  useEffect(() => {
    if (allExpensesResData?.success) {
      dispatch(setAllExpenses(allExpensesResData.data));
    }
  }, [allExpensesResData, dispatch]);

  return (
    <>
      <SideNavbar userSidenavbarList={userSidenavbarList} />
      <div
        className={`dashboard_layout_container absolute right-0 top-0 flex flex-col ${isSideNavbarOpen && !isMobile && 'dashboard_layout_container_large_screen_open'} ${!isSideNavbarOpen && !isMobile && 'dashboard_layout_container_large_screen_close'} ${isMobile && 'dashboard_layout_container_small_screen_close'} `}
      >
        {user?._id ? <TopHeader /> : <TopHeaderLoader />}
        <div className="flex flex-col items-center justify-start gap-5 px-6 py-5">
          {user?._id ? <Outlet /> : <DashboardLoader />}
        </div>
      </div>
    </>
  );
};

export default UserLayout;

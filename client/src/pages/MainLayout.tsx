import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/user';
import { Toaster } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import {
  navigateToLandingPage,
  navigateToUserPage,
} from '@/utils/navigate/NavigateRightPath';

const MainLayout = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = cookie.get('accessToken');
    // console.log(accessToken);
    if (!accessToken || accessToken === undefined) {
      console.log('not found');
      navigate(navigateToLandingPage());
      return;
    } else {
      navigate(navigateToUserPage());
    }
  }, [location.pathname]);

  const { data } = useQuery({
    queryFn: () => getCurrentUser(),
    queryKey: ['user'],
  });

  useEffect(() => {
    if (data?.data) {
      console.log('user', data);
      const {
        _id,
        username,
        name,
        email,
        avatar,
        currentPocketMoney,
        PocketMoneyHistory,
      } = data.data;
      dispatch(
        setUser({
          _id,
          username,
          name,
          email,
          avatar,
          currentPocketMoney,
          PocketMoneyHistory,
        })
      );
      navigate(navigateToUserPage());
    }
  }, [data]);

  return (
    <>
      <div className="w-full h-full">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
};

export default MainLayout;

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { getCurrentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/user';
import { getCookie } from '@/utils/cookies/cookies';
import { Toaster } from 'react-hot-toast';

const MainLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    // console.log(accessToken);
    if (!accessToken || accessToken === undefined) {
      console.log('not found');
      return;
    }
  }, []);

  const { data } = useQuery({
    queryFn: () => getCurrentUser(),
    queryKey: ['user'],
  });

  useEffect(() => {
    if (data?.success) {
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

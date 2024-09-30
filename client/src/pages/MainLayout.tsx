import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/user';
import { getCookie } from '@/utils/cookies/cookies';

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    console.log(accessToken);
    if (!accessToken || accessToken === undefined) {
      console.log('not found');
      navigate('/');
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
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default MainLayout;

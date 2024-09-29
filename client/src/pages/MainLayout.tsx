import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/user';

const MainLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getCookie = (name: string): string | undefined => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) {
      return parts.pop()?.split(';').shift();
    }

    return undefined;
  };

  useEffect(() => {
    const accessToken = getCookie('accessToken');
    console.log(accessToken);
    if (!accessToken) {
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

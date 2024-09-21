import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import { getCurrentUser } from '@/services/auth';

const MainLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const accessToken = Cookies.get('accessToken');

      console.log(accessToken);
      if (!accessToken) {
        console.log('not found');
        navigate('/');
        return;
      }
      const data = await getCurrentUser();
      console.log(data);
      navigate('/user/dashboard');
    })();
  }, []);

  return (
    <div className="w-full h-full">
      <Outlet />
    </div>
  );
};

export default MainLayout;

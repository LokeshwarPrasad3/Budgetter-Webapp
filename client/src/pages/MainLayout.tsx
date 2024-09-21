import { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { getCurrentUser } from '@/services/auth';

const MainLayout = () => {
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
    (async () => {
      const accessToken = getCookie('accessToken');
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

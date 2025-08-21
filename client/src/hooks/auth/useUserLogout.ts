import { useMutation } from '@tanstack/react-query';
import { UserLogout } from '@/services/auth';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export function useUserLogout() {
  const navigate = useNavigate();
  const cookie = new Cookies();

  const { mutateAsync: userLogoutMutate, isPending } = useMutation({
    mutationFn: UserLogout,
    onSuccess: (data) => {
      console.log(data?.message);
      googleLogout();
      cookie.remove('accessToken', { path: '/' });
      navigate('/');
      // reset theme
      document.body.classList.remove('dark');
      localStorage.removeItem('hasSeenTour');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleUserLogout = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault?.();
    userLogoutMutate();
  };

  return { handleUserLogout, isPending };
}

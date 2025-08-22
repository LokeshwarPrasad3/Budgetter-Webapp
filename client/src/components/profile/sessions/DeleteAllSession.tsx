import { Button } from '@/components/ui/button';
import { deleteAllUserSessions } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const DeleteAllSession = () => {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const { mutateAsync: deleteAllSessionsMutate, isPending } = useMutation({
    mutationFn: deleteAllUserSessions,
    onSuccess: (data) => {
      console.log(data?.message);

      // clear accessToken local and redirect to login/
      cookie.remove('accessToken', { path: '/' });
      navigate('/');
      // make default light mode becasue landing page not available for dark
      document.body.classList.remove('dark');
      localStorage.removeItem('hasSeenTour');
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleAllSessions = () => {
    deleteAllSessionsMutate();
  };

  return (
    <Button
      onClick={handleAllSessions}
      className="inline-flex items-center gap-2 rounded-md bg-gradient-to-br from-red-500 via-red-500/80 to-red-500/70 px-3 py-1 text-sm font-medium text-white shadow hover:from-red-500 hover:via-red-500 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-red-400"
    >
      {isPending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Deleting..
        </>
      ) : (
        'Log out from all devices'
      )}
    </Button>
  );
};

export default DeleteAllSession;

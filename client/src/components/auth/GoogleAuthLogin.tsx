import { SignupWithGoogle } from '@/services/auth';
import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { setUser } from '@/features/user/user';
import { Spinner } from '../ui/spinner';

const GoogleAuthLogin = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useDispatch();

  const { mutateAsync: SignWithGoogleMutate, isPending } = useMutation({
    mutationFn: SignupWithGoogle,
    onSuccess: (data) => {
      // console.log('Logged data', data);
      const {
        _id,
        username,
        name,
        email,
        avatar,
        currentPocketMoney,
        PocketMoneyHistory,
        LentMoneyHistory,
        activeSessions,
        isVerified,
        profession,
        dob,
        instagramLink,
        facebookLink,
        lastLogin,
        createdAt,
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
          LentMoneyHistory,
          activeSessions,
          isVerified,
          profession,
          dob,
          instagramLink,
          facebookLink,
          lastLogin,
          createdAt,
        })
      );
      console.log(data?.message);
      // const expirationDate = new Date();
      // expirationDate.setDate(expirationDate.getDate() + 3);
      cookie.set('accessToken', activeSessions[0].token, {
        path: '/',
        // expires: expirationDate,
      });
      const localIsDarkMode = localStorage.getItem('isDarkMode') === 'true';
      if (localIsDarkMode) {
        document.body.classList.toggle('dark', localIsDarkMode);
      }
      navigate('/user/dashboard');
    },
    onError: (error) => {
      console.log('Error during login', error);
    },
  });

  if (isPending) {
    return (
      <div className="flex h-[40px] w-full items-center justify-center gap-2 rounded border border-gray-300 bg-white text-slate-600">
        <Spinner className="h-4 w-4" />
        <span className="text-sm font-medium">Signing in...</span>
      </div>
    );
  }

  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        // console.log(credentialResponse);
        SignWithGoogleMutate({ token: credentialResponse.credential || '' });
      }}
      onError={() => {
        console.log('Errror During auth ');
      }}
    />
  );
};

export default GoogleAuthLogin;

import { SignupWithGoogle } from '@/services/auth';
import { GoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { setUser } from '@/features/user/user';

const GoogleAuthLogin = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useDispatch();

  const { mutateAsync: SignWithGoogleMutate } = useMutation({
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
        accessToken,
        isVerified,
        profession,
        dob,
        instagramLink,
        facebookLink,
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
          accessToken,
          isVerified,
          profession,
          dob,
          instagramLink,
          facebookLink,
        })
      );
      console.log(data?.message);
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 3);
      cookie.set('accessToken', accessToken, {
        path: '/',
        expires: expirationDate,
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

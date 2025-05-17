import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { LoginUser } from '@/services/auth';
import { Loader2 } from 'lucide-react';
import { setUser } from '@/features/user/user';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useFormik } from 'formik';
import { loginSchema } from '@/schemas';
import GoogleAuthLogin from './GoogleAuthLogin';

const LoginSection: React.FC = () => {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync: loginUserMutate, isPending } = useMutation({
    mutationFn: LoginUser,
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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        emailOrUsername: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: (value) => {
        // console.log('🚀 ~ value:', value);
        const [email, username, password] = [
          value.emailOrUsername,
          value.emailOrUsername,
          value.password,
        ];
        toast.promise(loginUserMutate({ username, email, password }), {
          loading: 'Logging to Your Account......',
          success: <span>Successfully Logged In !!</span>,
          error: <span>Invalid Credentials, Please try again !!</span>,
        });
      },
    });

  return (
    <div className="w-full max-w-full rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-2xl font-bold tracking-tighter text-gray-800">
        Log In
      </h1>
      <p className="mb-6 text-center text-gray-600">
        New to Budgetter?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up today.
        </Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-3">
          <i className="ri-mail-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.emailOrUsername}
            type="text"
            name="emailOrUsername"
            placeholder="Username or Email"
            required={false}
            className="mt-1 block w-full rounded-md border border-gray-300 px-9 py-2 font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          {errors.emailOrUsername && touched.emailOrUsername ? (
            <span className="ml-1 text-sm text-red-500">
              {errors.emailOrUsername}
            </span>
          ) : null}
        </div>

        <div className="relative mb-4">
          <i className="ri-lock-line absolute left-3 top-1.5 text-gray-500"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            autoComplete="off"
            placeholder="Password"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-9 pr-12 font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          {errors.password && touched.password ? (
            <span className="ml-1 text-sm text-red-500">{errors.password}</span>
          ) : null}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1.5 flex items-center pr-3"
          >
            {showPassword ? (
              <i className="ri-eye-off-line h-5 w-5 text-gray-500"></i>
            ) : (
              <i className="ri-eye-line h-5 w-5 text-gray-500"></i>
            )}
          </button>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="keep-logged-in"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="keep-logged-in"
              className="ml-2 select-none text-sm text-gray-600"
            >
              Keep me logged in
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          disabled={isPending}
          className="h-10 w-full rounded-md bg-blue-600 px-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Login'
          )}
        </Button>

        <div className="my-2 text-center font-bold text-slate-500">Or</div>

        <div className="flex items-center justify-center gap-4">
          <GoogleAuthLogin />
        </div>
      </form>
    </div>
  );
};

export default LoginSection;

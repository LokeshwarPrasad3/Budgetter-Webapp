import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/services/auth';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/user';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useFormik } from 'formik';
import { signupSchema } from '@/schemas/userAuth';
import GoogleAuthLogin from './GoogleAuthLogin';
import { UserDetailsResType } from '@/types/api/auth/auth';

const SignupSection: React.FC = () => {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync: registerUserMutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: UserDetailsResType) => {
      // console.log('User registered successfully:', data);
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
          isVerified,
          profession,
          dob,
          instagramLink,
          facebookLink,
          lastLogin,
          createdAt,
        })
      );
      // toast.success('Successfully Signup!!');
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 3);
      cookie.set('accessToken', accessToken, {
        path: '/',
        expires: expirationDate,
      });
      navigate('/user/dashboard');
    },
    onError: (error: Error) => {
      console.error('Registration error:', error);
      toast.error('Oops! Something went wrong');
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        username: '',
        name: '',
        email: '',
        password: '',
      },
      validationSchema: signupSchema,
      onSubmit: (value) => {
        // console.log('🚀 ~ value:', value);
        const [username, name, email, password] = [
          value.username,
          value.name,
          value.email,
          value.password,
        ];
        toast.promise(registerUserMutate({ username, name, email, password }), {
          loading: 'Processing, Sending Verification Email..',
          success: <span>Successfully Account Created!!</span>,
          error: <span>Something went wrong!!</span>,
        });
      },
    });

  return (
    <div className="w-full max-w-full rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-2xl font-bold tracking-tighter text-gray-800">
        Sign Up
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in.
        </Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-3">
          <i className="ri-user-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            placeholder="Username"
            className="mt-1 block w-full rounded-md border border-gray-300 px-10 py-2 font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          {errors.username && touched.username ? (
            <span className="ml-1 text-sm text-red-500">{errors.username}</span>
          ) : null}
        </div>
        <div className="relative mb-3">
          <i className="ri-user-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Your Name"
            className="mt-1 block w-full rounded-md border border-gray-300 px-10 py-2 font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          {errors.name && touched.name ? (
            <span className="ml-1 text-sm text-red-500">{errors.name}</span>
          ) : null}
        </div>
        <div className="relative mb-3">
          <i className="ri-mail-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email address"
            className="mt-1 block w-full rounded-md border border-gray-300 px-10 py-2 font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          {errors.email && touched.email ? (
            <span className="ml-1 text-sm text-red-500">{errors.email}</span>
          ) : null}
        </div>

        <div className="relative mb-4">
          <i className="ri-lock-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Password"
            className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-10 pr-12 font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          {errors.password && touched.password ? (
            <span className="ml-1 text-sm text-red-500">{errors.password}</span>
          ) : null}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-[7px] flex items-center pr-3"
          >
            {showPassword ? (
              <i className="ri-eye-off-line h-5 w-5 text-gray-500"></i>
            ) : (
              <i className="ri-eye-line h-5 w-5 text-gray-500"></i>
            )}
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between"></div>

        <Button
          disabled={isPending}
          className={`h-10 w-full rounded-md bg-blue-600 px-4 text-base font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'} `}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Signup'
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

export default SignupSection;

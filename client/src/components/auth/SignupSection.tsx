import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser, RegisterUserResponseType } from '@/services/auth';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/user';
import toast from 'react-hot-toast';
import Cookies from 'universal-cookie';
import { useFormik } from 'formik';
import { signupSchema } from '@/schemas';

const SignupSection: React.FC = () => {
  const cookie = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { mutateAsync: registerUserMutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: RegisterUserResponseType) => {
      // console.log('User registered successfully:', data);
      const {
        _id,
        username,
        name,
        email,
        avatar,
        currentPocketMoney,
        PocketMoneyHistory,
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
          isVerified,
          profession,
          dob,
          instagramLink,
          facebookLink,
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
    <div className="w-full max-w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold tracking-tighter text-gray-800 text-center mb-2">
        Sign Up
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in.
        </Link>
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3 relative">
          <i className="ri-user-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            type="text"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            placeholder="Username"
            className="text-slate-900 font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.username && touched.username ? (
            <span className="text-red-500 text-sm ml-1">{errors.username}</span>
          ) : null}
        </div>
        <div className="mb-3 relative">
          <i className="ri-user-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            placeholder="Your Name"
            className="text-slate-900 font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.name && touched.name ? (
            <span className="text-red-500 text-sm ml-1">{errors.name}</span>
          ) : null}
        </div>
        <div className="mb-3 relative">
          <i className="ri-mail-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder="Email address"
            className="text-slate-900 font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.email && touched.email ? (
            <span className="text-red-500 text-sm ml-1">{errors.email}</span>
          ) : null}
        </div>

        <div className="mb-4 relative">
          <i className="ri-lock-line absolute left-3 top-[7px] text-gray-500"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            placeholder="Password"
            className="text-slate-900 font-medium mt-1 block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.password && touched.password ? (
            <span className="text-red-500 text-sm ml-1">{errors.password}</span>
          ) : null}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-[7px] flex items-center pr-3"
          >
            {showPassword ? (
              <i className="ri-eye-off-line text-gray-500 h-5 w-5"></i>
            ) : (
              <i className="ri-eye-line text-gray-500 h-5 w-5"></i>
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4"></div>

        <Button
          disabled={isPending}
          className={`w-full h-10 text-base px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none ${isPending ? 'cursor-not-allowed' : 'cursor-pointer'} `}
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

        <div className="my-2 text-center text-slate-500 font-bold">Or</div>

        <div className="flex justify-center flex-col gap-4">
          <Button
            onClick={() => toast.success('Feature is pending!!')}
            type="button"
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Continue with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignupSection;

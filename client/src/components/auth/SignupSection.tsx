import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { registerUser, RegisterUserResponseType } from '@/services/auth';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/user';
import toast from 'react-hot-toast';

const SignupSection: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { mutateAsync: registerUserMutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data: RegisterUserResponseType) => {
      console.log('User registered successfully:', data);
      const { _id, username, name, email, avatar, currentPocketMoney } =
        data.data;
      dispatch(
        setUser({ _id, username, name, email, avatar, currentPocketMoney })
      );
      toast.success('Successfully Signup!!');
      navigate('/user/dashboard');
    },
    onError: (error: Error) => {
      console.error('Registration error:', error);
      toast.error('Oops! Something went wrong');
    },
  });

  const handleUserRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (username.length < 5 || !name || !email || !password) {
      console.log('All Fields are Required!!');
      return;
    }
    registerUserMutate({ username, name, email, password });
  };

  return (
    <div className="w-full max-w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold tracking-tighter text-gray-800 text-center mb-2">
        Sign Up
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log in.
        </Link>
      </p>

      <form>
        <div className="mb-3 relative">
          <i className="ri-user-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="text-slate-900 font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-3 relative">
          <i className="ri-user-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            placeholder="Your Name"
            className="text-slate-900 font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="mb-3 relative">
          <i className="ri-mail-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="text-slate-900 font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4 relative">
          <i className="ri-lock-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="text-slate-900 font-medium mt-1 block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
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
          onClick={handleUserRegistration}
          className="w-full h-10 text-base px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
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
          <button
            type="button"
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupSection;

// LoginSection.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginSection: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full max-w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold tracking-tighter text-gray-800 text-center mb-2">
        Log In
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        New to Budgetter?{' '}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up today.
        </Link>
      </p>

      <form>
        <div className="mb-3 relative">
          <i className="ri-mail-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            className="text-slate-900 font-medium mt-1 block w-full px-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div className="mb-4 relative">
          <i className="ri-lock-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
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

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="keep-logged-in"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label
              htmlFor="keep-logged-in"
              className="ml-2 text-sm text-gray-600"
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

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log In
        </button>

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

export default LoginSection;
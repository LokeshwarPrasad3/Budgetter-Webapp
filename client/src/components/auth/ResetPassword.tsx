import React from 'react';

const ResetPassword: React.FC = () => {
  return (
    <div className="w-full max-w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold tracking-tighter text-gray-800 text-center mb-2">
        Reset Your Password
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Enter a new password and confirm it to reset your password.
      </p>

      <form>
        <div className="mb-3 relative">
          <input
            type="password"
            id="password"
            placeholder="New Password"
            className="text-slate-900 font-medium mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <i className="ri-lock-password-line absolute right-3 top-2 text-gray-500"></i>
        </div>

        <div className="mb-4 relative">
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            className="text-slate-900 font-medium mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <i className="ri-lock-password-line absolute right-3 top-2 text-gray-500"></i>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Reset Password
        </button>

        <div className="my-2 text-center text-slate-500 font-bold">Or</div>

        <div className="flex justify-center flex-col gap-4">
          <a
            href="/login"
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
          >
            Back to Login
          </a>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;

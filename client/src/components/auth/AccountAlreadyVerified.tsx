import React from 'react';
import { Link } from 'react-router-dom';

const AccountAlreadyVerified: React.FC = () => {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center rounded-lg border border-green-200 bg-green-50 p-6 shadow-md">
      <i className="ri-check-double-line mb-4 text-6xl text-green-600"></i>
      <h1 className="mb-2 text-2xl font-bold text-green-800">
        Your Account Already Verified!
      </h1>
      <p className="text-center font-semibold text-red-700">
        Token has been Expired
      </p>
      <div className="mt-4 flex flex-col justify-center">
        <Link
          to="/login"
          className="w-full rounded-md bg-slate-700 px-4 py-2 text-center font-semibold text-white shadow-sm hover:bg-gray-300 hover:text-black focus:outline-none"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default AccountAlreadyVerified;

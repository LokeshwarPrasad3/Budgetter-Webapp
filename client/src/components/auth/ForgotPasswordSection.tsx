// ForgotPasswordSection.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { SendResetLinkToUserEmail } from '@/services/auth';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const ForgotPasswordSection: React.FC = () => {
  const [email, setEmail] = useState('');

  const { mutateAsync: sendResetLinkMutate, isPending } = useMutation({
    mutationFn: SendResetLinkToUserEmail,
    onSuccess: (data) => {
      console.log(data);
      toast.success('Reset Link Sent, Please Check Email!!');
      setEmail('');
    },
    onError: (error) => {
      console.log(error);
      toast.error('Email does not exist!!');
    },
  });

  const handlePasswordReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please Enter Valid Email!!');
      return;
    }
    sendResetLinkMutate({ email });
  };

  return (
    <div className="w-full max-w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold tracking-tighter text-gray-800 text-center mb-2">
        Forgot Password
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Enter your email address and we’ll send you a link to reset your
        password.
      </p>

      <form>
        <div className="mb-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            placeholder="Email address"
            className="text-slate-900 font-medium mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <Button
          disabled={isPending}
          onClick={handlePasswordReset}
          className="w-full h-10 text-base px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Send Reset Link'
          )}
        </Button>

        <div className="my-2 text-center text-slate-500 font-bold">Or</div>

        <div className="flex justify-center flex-col gap-4">
          <Link
            to="/login"
            className="w-full py-2 px-4 bg-gray-200 text-gray-800 font-semibold rounded-md shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-center"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordSection;

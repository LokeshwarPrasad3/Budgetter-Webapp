// ForgotPasswordSection.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { SendResetLinkToUserEmail } from '@/services/auth';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { forgotPasswordSchema } from '@/schemas';

const ForgotPasswordSection: React.FC = () => {
  const { mutateAsync: sendResetLinkMutate, isPending } = useMutation({
    mutationFn: SendResetLinkToUserEmail,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: '',
      },
      validationSchema: forgotPasswordSchema,
      onSubmit: (value, action) => {
        toast.promise(sendResetLinkMutate({ email: value.email }), {
          loading: 'Processing, Sending Verification Email..',
          success: <span>Reset Link Sent, Please Check Email !!</span>,
          error: <span>Email does not exist!!!</span>,
        });
        action.resetForm();
      },
    });

  return (
    <div className="w-full max-w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold tracking-tighter text-gray-800 text-center mb-2">
        Forgot Password
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Enter your email address and we’ll send you a link to reset your
        password.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="email"
            onBlur={handleBlur}
            onChange={handleChange}
            name="email"
            value={values.email}
            id="email"
            placeholder="Email address"
            className="text-slate-900 font-medium mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.email && touched.email ? (
            <span className="text-red-500 text-sm ml-1">{errors.email}</span>
          ) : null}
        </div>

        <Button
          disabled={isPending}
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

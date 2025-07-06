// ForgotPasswordSection.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { SendResetLinkToUserEmail } from '@/services/auth';
import { Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { forgotPasswordSchema } from '@/schemas/userAuth';

const ForgotPasswordSection: React.FC = () => {
  const { mutateAsync: sendResetLinkMutate, isPending } = useMutation({
    mutationFn: SendResetLinkToUserEmail,
    onSuccess: (data) => {
      console.log(data?.message);
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
    <div className="w-full max-w-full rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-2 text-center text-2xl font-bold tracking-tighter text-gray-800">
        Forgot Password
      </h1>
      <p className="mb-6 text-center text-gray-600">
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
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 font-medium text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
          />
          {errors.email && touched.email ? (
            <span className="ml-1 text-sm text-red-500">{errors.email}</span>
          ) : null}
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
            'Send Reset Link'
          )}
        </Button>

        <div className="my-2 text-center font-bold text-slate-500">Or</div>

        <div className="flex flex-col justify-center gap-4">
          <Link
            to="/login"
            className="w-full rounded-md bg-gray-200 px-4 py-2 text-center font-semibold text-gray-800 shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordSection;

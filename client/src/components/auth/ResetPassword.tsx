import { ResetUserPassword } from '@/services/auth';
import { useMutation } from '@tanstack/react-query';
import { Loader2, Eye, EyeOff } from 'lucide-react'; // Import visibility icons
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { resetPasswordSchema } from '@/schemas';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false); // Toggle for password visibility
  const [showCPassword, setShowCPassword] = useState<boolean>(false); // Toggle for confirm password visibility

  const { mutateAsync: changeUserPasswordMutate, isPending } = useMutation({
    mutationFn: ResetUserPassword,
    onSuccess: (data) => {
      console.log(data?.message);
      navigate('/login');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        password: '',
        confirm_password: '',
      },
      validationSchema: resetPasswordSchema,
      onSubmit: (value, action) => {
        // console.log('🚀 ~ value:', value);
        const ID = location.pathname?.split('/')[2];
        // if (!ID) {
        //   toast.error('Something went wrong!');
        //   return;
        // }
        const newPassword = value.password;
        toast.promise(changeUserPasswordMutate({ userId: ID, newPassword }), {
          loading: 'Processing, Resetting password...',
          success: <span>Password Changed Successfully !!</span>,
          error: <span>Something Went Wrong !!!</span>,
        });
        action.resetForm();
      },
    });

  return (
    <div className="w-full max-w-full p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold tracking-tighter text-gray-800 text-center mb-2">
        Reset Your Password
      </h1>
      <p className="text-gray-600 mb-6 text-center">
        Enter a new password and confirm it to reset your password.
      </p>

      <form onSubmit={handleSubmit}>
        {/* New Password Input */}
        <div className="mb-3 relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Enter New Password"
            className="text-slate-900 font-medium mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.password && touched.password ? (
            <span className="text-red-500 text-sm ml-1">{errors.password}</span>
          ) : null}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {!showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Confirm Password Input */}
        <div className="mb-4 relative">
          <Input
            id="confirm-password"
            type={showCPassword ? 'text' : 'password'} // Toggle input type
            name="confirm_password"
            value={values.confirm_password}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Confirm New Password"
            className="text-slate-900 font-medium mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          {errors.confirm_password && touched.confirm_password ? (
            <span className="text-red-500 text-sm ml-1">
              {errors.confirm_password}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setShowCPassword(!showCPassword)}
            className="absolute right-3 top-2 text-gray-500"
          >
            {!showCPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Submit Button */}
        <Button
          disabled={isPending}
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            'Reset Password'
          )}
        </Button>

        {/* Back to Login */}
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

export default ResetPassword;

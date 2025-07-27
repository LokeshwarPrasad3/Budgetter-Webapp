// pages/auth/AuthLayout.tsx
import AuthHeader from '@/components/auth/AuthHeader';
import React from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
// import AuthFooter from '@/components/auth/AuthFooter';

const AuthLayout: React.FC = () => {
  return (
    <div
      className="auth_layout_container relative h-full min-h-[100svh] w-full font-karla text-slate-200"
      style={{
        background: `url("./assets/bg/bottom-left-bg.svg") bottom left / 300px auto no-repeat ,url("./assets/bg/full-bg.svg") center -300px / 1870px auto no-repeat`,
        backgroundColor: '#2C396A',
      }}
    >
      {/*  */}
      <div className="auth_layout_container gap- flex h-full w-full max-w-full flex-col justify-normal px-4 py-4 sm:justify-between md:py-5 lg:px-5 2xl:gap-10">
        {/* header section */}
        <AuthHeader />

        {/* main content section */}
        <div className="auth_main_content_container flex min-h-[30rem] flex-col items-center justify-between gap-7 md:flex-row lg:justify-center lg:gap-20">
          <div className="left_part flex w-full max-w-full flex-col gap-2 md:w-[50%] md:max-w-[28rem] md:gap-4">
            {/* <img
              className="h-14 md:h-20 w-14 md:w-20 "
              src="/assets/logo/logo.png"
              alt="logo"
            /> */}
            <Link to="/home" className="flex items-center my-3 sm:mt-0">
              <img
                className="relative -top-0.5 right-0.5 h-12"
                src="/assets/logo/logo.png"
                alt="Budgetter"
              />
              {/* <img
              className="h-7 pl-4 relative top-1 right-2"
              src="/assets/logo/logo_name.png"
              alt="Budgetter"
            /> */}
              <span className="relative top-0.5 bg-gradient-to-r from-[#2e7dff] to-[#00b87c] bg-clip-text pl-1 text-4xl font-bold text-transparent">
                Budgetter
              </span>
            </Link>
            <h3 className="text-2xl font-bold md:text-4xl">
              Elevate Your Spending
            </h3>
            <p className="text-sm font-medium md:text-lg">
              Simplify tracking and budgeting for a brighter financial future.
            </p>
          </div>
          <div className="right_part w-full max-w-full md:w-[50%] md:max-w-[28rem]">
            {/* <LoginSection /> */}
            {/* <SignupSection /> */}
            <Outlet />
          </div>
        </div>

        {/* footer section */}
        {/* <AuthFooter /> */}
      </div>
    </div>
  );
};

export default AuthLayout;

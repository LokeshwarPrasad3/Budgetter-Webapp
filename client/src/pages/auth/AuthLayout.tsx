// pages/auth/AuthLayout.tsx
import AuthHeader from '@/components/auth/AuthHeader';
import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/layout/Footer';

const AuthLayout: React.FC = () => {
  return (
    <div
      className="auth_layout_container relative text-slate-200 font-karla min-h-screen h-full w-full"
      style={{
        background: `url("./assets/bg/bottom-left-bg.svg") bottom left / 300px auto no-repeat ,url("./assets/bg/full-bg.svg") center -300px / 1870px auto no-repeat`,
        backgroundColor: '#2C396A',
      }}
    >
      <div className="auth_layout_container h-full w-full max-w-full flex justify-normal sm:justify-between flex-col px-4 py-4 pb-0 md:py-5 lg:px-5 gap-8 sm:gap-28">
        {/* header section */}
        <AuthHeader />

        {/* main content section */}
        <div className="auth_main_content_container flex flex-col md:flex-row justify-between lg:justify-center items-center gap-7 lg:gap-20">
          <div className="left_part w-full md:w-[50%] max-w-full md:max-w-[28rem] flex gap-2 md:gap-4 flex-col ">
            <img
              className="h-14 md:h-20 w-14 md:w-20 "
              src="./assets/logo/logo.png"
              alt="logo"
            />
            <h3 className="text-2xl md:text-4xl font-bold">
              Elevate Your Spending
            </h3>
            <p className="text-sm md:text-lg font-medium">
              Simplify tracking and budgeting for a brighter financial future.
            </p>
          </div>
          <div className="right_part w-full md:w-[50%] max-w-full md:max-w-[28rem] ">
            {/* <LoginSection /> */}
            {/* <SignupSection /> */}
            <Outlet />
          </div>
        </div>

        {/* footer section */}
        <Footer noBg={true} />
      </div>
    </div>
  );
};

export default AuthLayout;

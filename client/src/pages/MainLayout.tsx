import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/services/auth';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/user/user';
import { Toaster } from 'react-hot-toast';
import Cookies from 'universal-cookie';
import {
  navigateToLandingPage,
  navigateToUserPage,
} from '@/utils/navigate/NavigateRightPath';
import { getPageTitle } from '@/utils/utility';

const MainLayout: React.FC = () => {
  const navigate = useNavigate();
  const cookie = new Cookies();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = cookie.get('accessToken');
    // console.log(accessToken);
    if (!accessToken || accessToken === undefined) {
      navigate(navigateToLandingPage());
      return;
    } else {
      navigate(navigateToUserPage());
    }
  }, [location.pathname]);

  const { data } = useQuery({
    queryFn: () => getCurrentUser(),
    queryKey: ['user'],
  });

  useEffect(() => {
    if (data?.data) {
      // console.log('user', data);
      const {
        _id,
        username,
        name,
        email,
        avatar,
        currentPocketMoney,
        PocketMoneyHistory,
        LentMoneyHistory,
        isVerified,
        profession,
        dob,
        instagramLink,
        facebookLink,
        createdAt,
        lastLogin,
      } = data.data;
      dispatch(
        setUser({
          _id,
          username,
          name,
          email,
          avatar,
          currentPocketMoney,
          PocketMoneyHistory,
          LentMoneyHistory,
          isVerified,
          profession,
          dob,
          instagramLink,
          facebookLink,
          createdAt,
          lastLogin,
        })
      );
      navigate(navigateToUserPage());
    }
  }, [data]);

  useEffect(() => {
    const localIsDarkMode = localStorage.getItem('isDarkMode') === 'true';
    if (localIsDarkMode) {
      document.body.classList.toggle('dark', localIsDarkMode);
    }
  }, []);

  // get current route and set to as title
  useEffect(() => {
    const getCurrentPageTitle = getPageTitle();
    document.title = getCurrentPageTitle;
  }, [location.pathname]);

  return (
    <>
      <div id="main_layout" className="h-full w-full dark:bg-slate-900">
        <Outlet />
      </div>
      <Toaster />
    </>
  );
};

export default MainLayout;

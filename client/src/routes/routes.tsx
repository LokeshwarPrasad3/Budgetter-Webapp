import AccountVerified from '@/components/auth/AccountVerified';
import ForgotPasswordSection from '@/components/auth/ForgotPasswordSection';
import LoginSection from '@/components/auth/LoginSection';
import ResetPassword from '@/components/auth/ResetPassword';
import SignupSection from '@/components/auth/SignupSection';
import AuthLayout from '@/pages/auth/AuthLayout';
import MainLayout from '@/pages/MainLayout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import UserLayout from '@/pages/user/UserLayout';
import HomeLayout from '@/pages/home/HomeLayout';
import Dashboard from '@/pages/user/dashboard/Dashboard';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginSection />} />
        <Route path="signup" element={<SignupSection />} />
        <Route path="forgot-password" element={<ForgotPasswordSection />} />
        <Route path="account-verified" element={<AccountVerified />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>

      {/* protected routes */}
      <Route path="user" element={<UserLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
      {/* home */}
      <Route path="/" element={<HomeLayout />} />
    </Route>
  )
);

export default routes;

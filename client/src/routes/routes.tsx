import AccountVerified from '@/components/auth/AccountVerified';
import ForgotPasswordSection from '@/components/auth/ForgotPasswordSection';
import LoginSection from '@/components/auth/LoginSection';
import ResetPassword from '@/components/auth/ResetPassword';
import SignupSection from '@/components/auth/SignupSection';
import Navbar from '@/components/navbar/Navbar';
import AuthLayout from '@/pages/auth/AuthLayout';
import HomeLayout from '@/pages/Home/HomeLayout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<AuthLayout />}>
        <Route path="/login" element={<LoginSection />} />
        <Route path="/signup" element={<SignupSection />} />
        <Route path="/forgot-password" element={<ForgotPasswordSection />} />
        <Route path="/account-verified" element={<AccountVerified />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/home" element={<HomeLayout />} />
    </>
  )
);

export default routes;

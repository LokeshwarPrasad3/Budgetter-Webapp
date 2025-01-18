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
  Navigate,
  Route,
} from 'react-router-dom';
import UserLayout from '@/pages/user/UserLayout';
import HomePage from '@/pages/home/HomePage';
import Dashboard from '@/pages/user/dashboard/Dashboard';
import AddMoney from '@/pages/user/addMoney/AddMoney';
// import Reports from '@/pages/user/reports/Reports';
import ShowExpenses from '@/pages/user/showExpenses/ShowExpenses';
import AddExpenses from '@/pages/user/addExpenses/AddExpenses';
import ProfilePage from '@/pages/user/Profile/ProfilePage';
import AccountAlreadyVerified from '@/components/auth/AccountAlreadyVerified';
import Reports from '@/pages/user/reports/Reports';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      {/* public routes */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<LoginSection />} />
        <Route path="signup" element={<SignupSection />} />
        <Route path="forgot-password" element={<ForgotPasswordSection />} />
        <Route path="account-verified" element={<AccountVerified />} />
        <Route path="account-already-verified" element={<AccountAlreadyVerified />} />
        <Route path="reset-password/*" element={<ResetPassword />} />
      </Route>

      {/* protected routes */}
      <Route path="user" element={<UserLayout />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="add-expenses" element={<AddExpenses />} />
        <Route path="show-expenses" element={<ShowExpenses />} />
        <Route path="reports" element={<Reports />} />
        <Route path="reports" element={<Dashboard />} />
        <Route path="add-money" element={<AddMoney />} />
      </Route>
      {/* home */}
      <Route path="/" element={<HomePage />} />
      {/* logout page routes */}
      <Route path="logout" element={<Navigate to="/login" />} />
    </Route>
  )
);

export default routes;

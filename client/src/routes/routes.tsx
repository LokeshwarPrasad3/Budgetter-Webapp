import LoginSection from '@/components/auth/LoginSection';
import SignupSection from '@/components/auth/SignupSection';
import AuthLayout from '@/pages/auth/AuthLayout';
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
      </Route>
    </>
  )
);

export default routes;

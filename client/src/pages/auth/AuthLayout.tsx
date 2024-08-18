// pages/auth/AuthLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <div>
      <header>Auth Header</header>
      <Outlet /> {/* Renders nested routes */}
    </div>
  );
};

export default AuthLayout;

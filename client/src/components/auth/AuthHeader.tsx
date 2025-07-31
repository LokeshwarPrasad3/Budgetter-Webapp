import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <div className="auth_layout_header hidden h-10 items-center justify-start sm:flex md:h-14">
      <p className="text-3xl font-bold uppercase md:text-4xl">
        Budgetter<span className="text-5xl text-indigo-600">.</span>{' '}
      </p>
    </div>
  );
};

export default AuthHeader;

export const getTopHeaderName = (pathName: string): string => {
  switch (pathName) {
    // for user routes
    case '/user/dashboard':
      return 'Dashboard';
    case '/user/add-expenses':
      return 'Add Expenses';
    case '/user/show-expenses':
      return 'Show Expenses';
    case '/user/reports':
      return 'Reports';
    case '/user/add-money':
      return 'Add Pocket Money';
    case '/user/add-lent-money':
      return 'Add Lent Money';
    case '/user/profile':
      return 'Profile';
    // for admin private routes
    case '/admin/users':
      return 'App Users';
    default:
      return 'Oops! Wrong Page';
  }
};

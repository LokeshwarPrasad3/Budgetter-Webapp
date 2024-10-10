export const getTopHeaderName = (pathName: string): string => {
  switch (pathName) {
    case 'dashboard':
      return 'Dashboard';
    case 'add-expenses':
      return 'Add Expenses';
    case 'show-expenses':
      return 'Show Expenses';
    case 'reports':
      return 'Report & Visualization';
    case 'add-money':
      return 'Add Pocket Money';
    case 'profile':
      return 'Profile';
    default:
      return 'Oops! Wrong Page';
  }
};

export interface OptionType {
  value: string;
  label: string;
}

export const LabelOptions: OptionType[] = [
  { value: '', label: 'No Label' },
  { value: 'market', label: 'Market' },
  { value: 'health', label: 'Health' },
  { value: 'family', label: 'Family' },
  { value: 'office', label: 'Office' },
  { value: 'trip', label: 'Trip' },
];

export const getActiveRouteLink = () => {
  const path = location.pathname;
  switch (path) {
    case '/user/dashboard':
      return 'user/dashboard';
    case '/user/add-expenses':
      return 'user/add-expenses';
    case '/user/show-expenses':
      return 'user/show-expenses';
    case '/user/reports':
      return 'user/reports';
    case '/user/add-lent-money':
      return 'user/add-lent-money';
    case '/user/add-money':
      return 'user/add-money';
    case '/admin/newsletter':
      return 'admin/newsletter';
    case '/admin/users':
      return 'admin/users';
    default:
      return '/';
  }
};

export const getPageTitle = (): string => {
  const path = location.pathname;

  const routes: Record<string, string> = {
    '/user/dashboard': 'Dashboard',
    '/user/add-expenses': 'Add Expenses',
    '/user/show-expenses': 'Show Expenses',
    '/user/reports': 'Reports',
    '/user/add-money': 'Add Money',
    '/admin/users': 'Admin Page',
  };

  const pageTitle = routes[path] || 'Home';
  return `${pageTitle} • Budgetter | Your Everyday Expenses Tracker`;
};

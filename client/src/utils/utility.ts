export const getActiveRouteLink = () => {
  const path = location.pathname;
  switch(path){
    case '/user/dashboard': return "user/dashboard";
    case '/user/add-expenses': return "user/add-expenses";
    case '/user/show-expenses': return "user/show-expenses";
    case '/user/reports': return "user/reports";
    case '/user/add-money': return "user/add-money";
    default: return "/";
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

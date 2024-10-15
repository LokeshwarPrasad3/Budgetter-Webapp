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

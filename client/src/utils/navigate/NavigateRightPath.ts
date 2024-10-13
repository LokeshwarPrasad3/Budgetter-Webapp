export const navigateToLandingPage = (): string => {
  const path = location.pathname;
  if (path.includes('/login') || path.includes('/signup')) {
    return path;
  } else if (path.includes('/user/')) {
    return '/login';
  } else {
    return path;
  }
};

export const navigateToUserPage = (): string => {
  const path = location.pathname;
  if (path.includes('/user/')) {
    return path;
  } else {
    return '/user/dashboard';
  }
};


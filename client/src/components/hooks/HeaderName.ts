export const getTopHeaderName = (pathName: string): string => {
  switch (pathName) {
    case 'dashboard':
      return 'Dashboard';
    default:
      return 'Lokeshwar';
  }
};

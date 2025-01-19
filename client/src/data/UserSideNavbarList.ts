type userSidenavbarListType = {
  route: string;
  name: string;
  icon: string;
};

export const userSidenavbarList: userSidenavbarListType[] = [
  {
    route: 'user/dashboard',
    name: 'Dashboard',
    icon: 'ri-dashboard-line',
  },
  {
    route: 'user/add-expenses',
    name: 'Add Expenses',
    icon: 'ri-add-circle-line',
  },
  {
    route: 'user/show-expenses',
    name: 'show-expenses',
    icon: 'ri-eye-line',
  },
  {
    route: 'user/reports',
    name: 'reports',
    icon: 'ri-folder-chart-line',
  },
  {
    route: 'user/add-money',
    name: 'Add Money',
    icon: 'ri-money-rupee-circle-line',
  },
  {
    route: 'user/add-lent-money',
    name: 'Add Lent Money',
    icon: 'ri-copper-coin-line',
  },
];

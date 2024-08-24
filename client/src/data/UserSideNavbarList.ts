type userSidenavbarListType = {
  route: string;
  name: string;
  icon: string;
};

export const userSidenavbarList: userSidenavbarListType[] = [
  {
    route: 'dashboard',
    name: 'Dashboard',
    icon: 'ri-dashboard-line',
  },
  {
    route: 'add-expenses',
    name: 'Add Expenses',
    icon: 'ri-add-circle-line',
  },
  {
    route: 'Show Expenses',
    name: 'show-expenses',
    icon: 'ri-eye-line',
  },
  {
    route: 'Graphs & Reports',
    name: 'reports',
    icon: 'ri-folder-chart-line',
  },
  {
    route: 'Transactions',
    name: 'transactions',
    icon: 'ri-money-rupee-circle-line',
  },
];

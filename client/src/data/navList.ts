type navListType = {
  route: string;
  name: string;
};

export const navListArray: navListType[] = [
  {
    route: 'user/dashboard',
    name: 'Dashboard',
  },
  {
    route: 'user/add-expenses',
    name: 'Add Expenses',
  },
  {
    route: 'user/show-expenses',
    name: 'show-expenses',
  },
  {
    route: 'user/reports',
    name: 'reports',
  },
];

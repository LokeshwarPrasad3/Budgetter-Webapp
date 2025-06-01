type adminSidenavbarListType = {
  route: string;
  name: string;
  icon: string;
};

export const adminSidenavbarList: adminSidenavbarListType[] = [
  {
    route: 'admin/users',
    name: 'Users',
    icon: 'ri-shield-user-line',
  },
  // {
  //   route: 'admin/users',
  //   name: 'reports',
  //   icon: 'ri-folder-chart-line',
  // },
  {
    route: 'admin/newsletter',
    name: 'NewsLetter',
    icon: 'ri-mail-line',
  },
];

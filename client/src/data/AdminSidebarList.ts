import { Shield, Mail } from 'lucide-react';

type AdminSidenavbarListType = {
  route: string;
  name: string;
  icon: React.ElementType;
};

export const adminSidenavbarList: AdminSidenavbarListType[] = [
  {
    route: 'admin/users',
    name: 'Users',
    icon: Shield,
  },
  // {
  //   route: 'admin/reports',
  //   name: 'Reports',
  //   icon: BarChart3,
  // },
  {
    route: 'admin/newsletter',
    name: 'NewsLetter',
    icon: Mail,
  },
];

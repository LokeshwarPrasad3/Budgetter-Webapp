import {
  HandCoins,
  CirclePlus,
  ListOrdered,
  ChartPie,
  LayoutDashboard,
  Wallet,
} from 'lucide-react';

export type userSidenavbarListType = {
  route: string;
  name: string;
  icon: React.ElementType;
};

export const userSidenavbarList: userSidenavbarListType[] = [
  {
    route: 'user/dashboard',
    name: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    route: 'user/add-expenses',
    name: 'Add Expenses',
    icon: CirclePlus,
  },
  {
    route: 'user/show-expenses',
    name: 'Show-expenses',
    icon: ListOrdered,
  },
  {
    route: 'user/reports',
    name: 'Reports',
    icon: ChartPie,
  },
  {
    route: 'user/add-money',
    name: 'Add Money',
    icon: Wallet,
  },
  {
    route: 'user/add-lent-money',
    name: 'Add Lent Money',
    icon: HandCoins,
  },
];

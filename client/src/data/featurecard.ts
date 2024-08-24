type cardDataType = {
  title: string;
  description: string;
  icon: string;
  bg: string;
};

export const cardData: cardDataType[] = [
  {
    title: 'Expense Tracking',
    description:
      'Easily log your daily expenses and categorize them to better understand your spending habits.',
    icon: 'ri-wallet-line',
    bg: '#fae973',
  },
  {
    title: 'Weekly Insights',
    description:
      'Get a visual summary of your weekly spending, highlighting the most significant expenses.',
    icon: 'ri-calendar-check-line',
    bg: '#B7B0FF',
  },
  {
    title: 'Budget Management',
    description:
      'Create budgets for different categories and track your progress in real-time.',
    icon: 'ri-money-cny-circle-line',
    bg: '#F7CEDC',
  },
];

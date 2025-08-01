import { Step } from 'react-joyride';

const commonLayoutSteps: Step[] = [
  {
    target: '#start_tour_guide',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">
          {' '}
          🎉 Welcome to Budgetter Tour!
        </h3>
        <p>
          Welcome to Budgetter - your personal finance manager that makes
          budgeting simple and smart!
        </p>
      </div>
    ),
    placement: 'center',
  },

  // {
  //   target: '#fullscreens_tour_guide',
  //   content: <div>
  //     <h3 className="text-xl font-bold mb-2">Full Screen Mode</h3>
  //     <p>Toggle full screen mode for a more immersive budgeting experience!</p>
  //   </div>,
  //   spotlightPadding: 10,
  // },
  // {
  //   target: '#notification_section',
  //   content: <div>
  //     <h3 className="text-xl font-bold mb-2">Notifications Center</h3>
  //     <p>Stay updated with important alerts and reminders about your budget.</p>
  //   </div>,
  //   spotlightPadding: 10,
  // },
  {
    target: '#profile_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Profile Management</h3>
        <p>
          Manage your profile settings and customize your account preferences
          here.
        </p>
      </div>
    ),
    spotlightPadding: 10,
  },
  // {
  //   target: '#navigation_menu_tour',
  //   content: (
  //     <div>
  //       <h3 className="mb-2 text-xl font-bold">Navigation Menu</h3>
  //       <p>Access different sections of the application from here.</p>
  //     </div>
  //   ),
  //   spotlightPadding: 10,
  // },
  //   target: '#theme_change_tour',
  //   content: (
  //     <div>
  //       <h3 className="mb-2 text-xl font-bold">Theme Customization</h3>
  //       <p>Switch between light and dark themes to suit your preference.</p>
  //     </div>
  //   ),
  //   spotlightPadding: 10,
  // },

  // {
  //   target: '#menu_toggle_button_section',
  //   content: <div>
  //     <h3 className="text-xl font-bold mb-2">Menu Toggle</h3>
  //     <p>Click here to show/hide the navigation sidebar for better workspace management.</p>
  //   </div>,
  //   spotlightPadding: 10,
  // },
  {
    target: '#sidebar_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Navigation Menu</h3>
        <p>
          Access all your financial tools and features through this easy-to-use
          menu.
        </p>
      </div>
    ),
    spotlightPadding: 10,
  },
  // {
  //   target: '#logout_section',
  //   content: <div>
  //     <h3 className="text-xl font-bold mb-2">Logout</h3>
  //     <p>Securely end your session when you're done managing your budget.</p>
  //   </div>,
  //   spotlightPadding: 10,
  // },
];

const dashboardPageSteps = [
  {
    target: '#filter_report_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Report Filters</h3>
        <p>
          Use filters to customize your financial reports and get the insights
          you need.
        </p>
      </div>
    ),
    spotlightPadding: 10,
  },
  {
    target: '#summarize_budget_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Budget Summary</h3>
        <p>
          Get a clear overview of your finances - track your income, expenses,
          and savings in one place.
        </p>
      </div>
    ),
    spotlightPadding: 10,
  },
  {
    target: '#donut_chart_category_expense_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Expense Categories</h3>
        <p>
          Understand your spending patterns with this clear, interactive expense
          chart.
        </p>
      </div>
    ),
    spotlightPadding: 10,
  },
  {
    target: '#interval_time_expense_insight_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Time-based Expense Analysis</h3>
        <p>
          Monitor your spending trends and patterns over different time periods.
        </p>
      </div>
    ),
    spotlightPadding: 10,
  },
  {
    target: '#individual_expenses_by_category_insight_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Category-wise Breakdown</h3>
        <p>
          Explore detailed breakdowns of your spending in each expense category.
        </p>
      </div>
    ),
    spotlightPadding: 10,
  },
];

const pocketMoneyTourStep = [
  {
    target: '#current_pocket_money_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Current Pocket Money</h3>
        <p>Track your current balance and available funds in real-time.</p>
      </div>
    ),
    disableBeacon: true,
  },
];

const expensesFilteredTableStep = [
  {
    target: '#today_expenses_show_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Today's Expenses</h3>
        <p>Review your daily expenses and track your spending activities.</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#export_expenses_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Export button</h3>
        <p>Generate and download detailed expense reports in PDF format.</p>
      </div>
    ),
    disableBeacon: true,
  },
];

const addExpensesPageSteps = [
  {
    target: '#inputs_for_add_expense_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">
          Fill Your New Expense Details
        </h3>
        <p>
          Record your expenses quickly with our simple and efficient entry
          system.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#add_new_expense_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Add New Expense</h3>
        <p>Add new expenses instantly with our streamlined entry form.</p>
      </div>
    ),
    disableBeacon: true,
  },
];

const showExpensesPageSteps = [
  {
    target: '#filter_expenses_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Smart Expense Filter</h3>
        <p>
          Search and find your expenses easily using dates, categories, or
          amounts.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
];

const reportsPageSteps = [
  {
    target: '#filter_your_all_expense_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Comprehensive Reports</h3>
        <p>
          View your complete spending history with useful filtering options.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#all_expense_data_in_table_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Detailed Transaction View</h3>
        <p>
          Browse your transactions in a clear, well-organized expense table.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
];

const addPocketMoneyPageSteps = [
  {
    target: '#inputs_add_pocket_money_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Add Pocket Money</h3>
        <p>Add funds to your account with our simple deposit system.</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#pocket_money_details_table_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Transaction History</h3>
        <p>Monitor all your transactions and manage your money in one place.</p>
      </div>
    ),
    disableBeacon: true,
  },
];

const lentMoneyPageSteps = [
  {
    target: '#inputs_lent_money_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Record Lent Money</h3>
        <p>
          Track money you've lent to others with our lending management feature.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#lent_records_details_table_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Lending History</h3>
        <p>
          View and manage all your lending records in an organized dashboard.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
];

const profilePageSteps = [
  {
    target: '#your_profile_picture_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Profile Picture</h3>
        <p>
          Personalize your account with a profile picture that represents you.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#change_your_avatar_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Update Avatar</h3>
        <p>
          Choose from our collection of avatars to update your profile picture.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#your_membership_and_last_active_details_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Account Status</h3>
        <p>
          Check your account status and review your recent account activities.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#update_your_basic_deatils_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Personal Details</h3>
        <p>Manage your account information and adjust your preferences.</p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#fun_time_spin_wheel_section',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Spin & Win</h3>
        <p>
          Try your luck with our reward wheel - spin to win special benefits!
        </p>
      </div>
    ),
    disableBeacon: true,
  },
  {
    target: '#account_advance_options',
    content: (
      <div>
        <h3 className="mb-2 text-xl font-bold">Account Settings</h3>
        <p>
          Access account settings and security options, including account
          deletion with password protection.
        </p>
      </div>
    ),
    disableBeacon: true,
  },
];

export const getStepsForPath = (path: string): Step[] => {
  switch (path) {
    case '/user/dashboard':
      return [...commonLayoutSteps, ...dashboardPageSteps];
    case '/user/add-expenses':
      return [
        ...pocketMoneyTourStep,
        ...addExpensesPageSteps,
        ...expensesFilteredTableStep,
      ];
    case '/user/show-expenses':
      return [
        ...pocketMoneyTourStep,
        ...showExpensesPageSteps,
        ...expensesFilteredTableStep,
      ];
    case '/user/reports':
      return [...reportsPageSteps];
    case '/user/add-money':
      return [...pocketMoneyTourStep, ...addPocketMoneyPageSteps];
    case '/user/add-lent-money':
      return [...pocketMoneyTourStep, ...lentMoneyPageSteps];
    case '/user/profile':
      return [...profilePageSteps];
    default:
      return [];
  }
};

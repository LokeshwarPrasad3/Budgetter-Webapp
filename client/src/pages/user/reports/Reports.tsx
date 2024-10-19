import AllExpensesTable from '@/components/user/reports/table/AllExpensesTable';
import React from 'react';

const Reports: React.FC = () => {
  return (
    <div className="dashboard_page_ flex flex-col justify-start items-start w-full gap-5">
      <AllExpensesTable />
    </div>
  );
};

export default Reports;

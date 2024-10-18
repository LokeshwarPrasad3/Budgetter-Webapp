import ExpenseDetailsTable from '@/components/user/addExpenses/ExpenseDetailsTable';
import FilterSection from '@/components/user/addExpenses/FilterSection';
import React from 'react';

const AddExpenses: React.FC = () => {
  return (
    <>
      <FilterSection />
      <ExpenseDetailsTable />
    </>
  );
};

export default AddExpenses;

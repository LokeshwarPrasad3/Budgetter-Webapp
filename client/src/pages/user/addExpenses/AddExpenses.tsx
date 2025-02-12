import ExpenseDetailsTable from '@/components/user/addExpenses/ExpenseDetailsTable';
import FilterSection from '@/components/user/addExpenses/FilterSection';
import ShowMoney from '@/components/user/addMoney/ShowMoney';
import React from 'react';

const AddExpenses: React.FC = () => {
  return (
    <>
      <ShowMoney />
      <FilterSection />
      <ExpenseDetailsTable />
    </>
  );
};

export default AddExpenses;

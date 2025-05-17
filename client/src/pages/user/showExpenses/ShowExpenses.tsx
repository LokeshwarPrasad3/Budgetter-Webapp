import ShowMoney from '@/components/user/addMoney/ShowMoney';
import FilterShowExpenses from '@/components/user/showExpenses/FilterShowExpenses';
import React from 'react';

const ShowExpenses: React.FC = () => {
  return (
    <>
      <ShowMoney />
      <FilterShowExpenses />
    </>
  );
};

export default ShowExpenses;

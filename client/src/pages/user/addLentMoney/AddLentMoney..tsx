import AddLentSection from '@/components/user/addLentMoney/AddLentSection';
import LentRecordsDetailsTable from '@/components/user/addLentMoney/LentRecordsDetailsTable';
import ShowMoney from '@/components/user/addMoney/ShowMoney';
import React from 'react';

const AddLentMoney: React.FC = () => {
  return (
    <>
      <ShowMoney/>
      <AddLentSection />
      <LentRecordsDetailsTable />
    </>
  );
};

export default AddLentMoney;

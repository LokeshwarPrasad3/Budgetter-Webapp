import AddLentSection from '@/components/user/addLentMoney/AddLentSection';
import LentRecordsDetailsTable from '@/components/user/addLentMoney/LentRecordsDetailsTable';
import React from 'react';

const AddLentMoney: React.FC = () => {
  return (
    <>
      <AddLentSection />
      <LentRecordsDetailsTable />
    </>
  );
};

export default AddLentMoney;

import ExpenseDetailsTable from '@/components/user/addExpenses/ExpenseDetailsTable';
import FilterSection from '@/components/user/addExpenses/FilterSection';

const AddExpenses = () => {
  return (
    <>
      <FilterSection />
      <ExpenseDetailsTable />
    </>
  );
};

export default AddExpenses;

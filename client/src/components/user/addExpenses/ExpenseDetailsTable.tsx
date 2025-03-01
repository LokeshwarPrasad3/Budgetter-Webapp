import UserExpenseTable from './table/UserExpenseTable';

const ExpenseDetailsTable = () => {
  return (
    <div className="expense_details_container flex flex-col justify-start items-start bg-bg_primary_light dark:bg-bg_primary_dark rounded-md border border-border_light dark:border-border_dark w-full shadow-sm">
      <h4 className="text-base font-semibold p-4">Your Today Expenses</h4>
      <div className="flex justify-center items-center w-full">
        <UserExpenseTable />
      </div>
    </div>
  );
};

export default ExpenseDetailsTable;

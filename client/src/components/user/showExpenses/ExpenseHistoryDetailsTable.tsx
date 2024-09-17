import UserHistoryExpenseTable from './table/UserHistoryExpenseTable';

const ExpenseHistoryDetailsTable = () => {
  return (
    <div className="expense_details_container flex flex-col justify-start items-start bg-[#FFFEFE] rounded-md w-full shadow-sm">
      <h4 className="text-base font-semibold p-4">
              Your 17 September Expenses
      </h4>
      <div className="flex justify-center items-center w-full">
        <UserHistoryExpenseTable />
      </div>
    </div>
  );
};

export default ExpenseHistoryDetailsTable;

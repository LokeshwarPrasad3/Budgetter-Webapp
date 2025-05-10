import { getTodayDate } from '@/utils/date/date';
import UserHistoryExpenseTable from '../showExpenses/table/UserHistoryExpenseTable';

const ExpenseDetailsTable = () => {

  return (
    <div className="expense_details_container flex w-full flex-col items-start justify-start rounded-md border border-border_light bg-bg_primary_light shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
      {/* <h4 className="p-4 text-base font-semibold">Your Today Expenses</h4> */}
      <div className="flex w-full items-center justify-center">
        {/* <UserExpenseTable /> */}
        <UserHistoryExpenseTable
          expensesDate={new Date()}
          storedExpenseDate={getTodayDate()}
        />
      </div>
    </div>
  );
};

export default ExpenseDetailsTable;

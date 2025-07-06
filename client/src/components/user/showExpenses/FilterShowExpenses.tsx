import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/DatePicker';
import { setExpenses } from '@/features/user/user';
import { getExpensesByDate } from '@/services/expenses';
import { formatDate } from '@/utils/date/date';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import UserHistoryExpenseTable from './table/UserHistoryExpenseTable';

const FilterShowExpenses = () => {
  const dispatch = useDispatch();
  // const [isDataFound, setIsDataFound] = useState(false);
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date());
  const [storedExpenseDate, setStoredExpenseDate] = useState<string>(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  });

  const { mutateAsync: showExpensesMutate, isPending } = useMutation({
    mutationFn: getExpensesByDate,
    onSuccess: (data) => {
      // console.log(data?.data?.message);
      // console.log("here", data)
      setStoredExpenseDate(data?.data?.date);
      // setIsDataFound(true);
      let products: any[];
      if (data?.data === null) {
        products = [];
      } else {
        products = data?.data?.products;
      }
      dispatch(setExpenses(products));
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleDate = () => {
    const formattedDate = formatDate(inputDate);
    console.log(formattedDate);
    showExpensesMutate({ date: formattedDate });
  };

  return (
    <>
      <div className="add_expense_container flex w-full flex-col items-start justify-start gap-4 rounded-md border border-border_light bg-bg_primary_light p-4 px-5 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
        <h4 className="text-base font-semibold">Filter Your Expenses</h4>
        <div className="flex w-full flex-col flex-wrap items-start justify-start gap-3 md:gap-5">
          <div className="input_containers grid w-full grid-cols-12 gap-3 md:gap-5 lg:w-8/12">
            <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 lg:col-span-3">
              <p className="text-sm">Choose Date</p>
              <DatePicker inputDate={inputDate} setInputDate={setInputDate} />
            </div>
          </div>
          <div className="action_buttons flex items-center justify-start gap-4 py-2">
            <Button
              disabled={isPending}
              onClick={handleDate}
              className="bg-green-500"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                'Show All'
              )}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center justify-center rounded-md border border-border_light bg-bg_primary_light shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
        {/* <div className="expense_details_container flex w-full flex-col items-start justify-start">
          {isDataFound && (
            <h4 className="p-4 text-base font-semibold">
              Your {formatDate(inputDate)} Expenses
            </h4>
          )}
        </div> */}
        <UserHistoryExpenseTable
          setStoredExpenseDate={setStoredExpenseDate}
          fromAddExpensePage={false}
          storedExpenseDate={storedExpenseDate}
          expensesDate={inputDate ?? new Date()}
        />
      </div>
    </>
  );
};

export default FilterShowExpenses;

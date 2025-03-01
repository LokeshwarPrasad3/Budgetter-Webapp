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
  const [isDataFound, setIsDataFound] = useState(false);
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date());

  const { mutateAsync: showExpensesMutate, isPending } = useMutation({
    mutationFn: getExpensesByDate,
    onSuccess: (data) => {
      console.log('Expenses fetched successfully', data?.data?.products);
      // console.log("here", data)
      setIsDataFound(true);
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
      <div className="add_expense_container flex flex-col justify-start items-start gap-4 bg-bg_primary_light dark:bg-bg_primary_dark rounded-md border border-border_light dark:border-border_dark w-full p-4 px-5 shadow-sm">
        <h4 className="text-base font-semibold">Filter Your Expenses</h4>
        <div className="flex justify-start flex-wrap flex-col items-start gap-3 md:gap-5 w-full">
          <div className="input_containers grid grid-cols-12 w-full lg:w-8/12 gap-3 md:gap-5">
            <div className="col-span-12 sm:col-span-6 w-full lg:col-span-3 input_section flex justify-start flex-col items-start gap-1">
              <p className="text-sm">Choose Date</p>
              <DatePicker inputDate={inputDate} setInputDate={setInputDate} />
            </div>
          </div>
          <div className="action_buttons flex gap-4 justify-start items-center py-2">
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
      <div className="flex justify-center flex-col items-center w-full bg-bg_primary_light dark:bg-bg_primary_dark rounded-md border border-border_light dark:border-border_dark shadow-sm">
        <div className="expense_details_container flex flex-col justify-start items-start w-full">
          {isDataFound && (
            <h4 className="text-base font-semibold p-4">
              Your {formatDate(inputDate)} Expenses
            </h4>
          )}
        </div>
        <UserHistoryExpenseTable />
      </div>
    </>
  );
};

export default FilterShowExpenses;

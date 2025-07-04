import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DatePicker } from '@/components/ui/DatePicker';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CirclePlus, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { formatDate } from '@/utils/date/date';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addExpenses } from '@/services/expenses';
import { AddExpensesCredType } from '@/types/api/expenses/credentials';

const FilterSection = () => {
  const queryClient = useQueryClient();
  const [inputDate, setInputDate] = useState<Date | undefined>(new Date());
  const [expenseName, setExpenseName] = useState<string>('');
  const [expenseCategory, setExpenseCategory] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const { mutateAsync: addExpensesMutate, isPending } = useMutation({
    mutationFn: addExpenses,
    onSuccess: (data) => {
      console.log(data?.message);
      toast.success('Expenses Added Successfully!!');
      queryClient.invalidateQueries({ queryKey: ['todayExpense'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['all-expenses'] });
      setExpenseCategory('');
      setExpenseName('');
      setPrice('');
    },
    onError: (error) => {
      console.log('Error on add expenses', error);
      toast.error('Something went wrong!!');
    },
  });

  const handleAddExpenses = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // console.log(inputDate, expenseName, expenseCategory, price);
    if (!inputDate || !expenseName || !expenseCategory || !price) {
      toast.error('Input Not be Empty!!');
      return;
    }
    // console.log(inputDate, expenseCategory, expenseName, price);
    const formattedDate: string = formatDate(inputDate);
    console.log(formatDate(inputDate));
    const pastDaysExpensesArray: AddExpensesCredType['pastDaysExpensesArray'] =
      [
        {
          date: formattedDate,
          productsArray: [
            {
              name: expenseName,
              price: parseInt(price),
              category: expenseCategory,
            },
          ],
        },
      ];
    const expensesData: AddExpensesCredType = {
      date: formattedDate,
      pastDaysExpensesArray: pastDaysExpensesArray,
    };

    // Now pass this object to the mutation
    addExpensesMutate(expensesData);
  };

  const handleAddNew = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.error('Feature is Pending!');
  };

  return (
    <div className="add_expense_container flex w-full flex-col items-start justify-start gap-4 rounded-md border border-border_light bg-bg_primary_light p-4 px-5 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
      <h4 className="text-base font-semibold">Add Your Expenses</h4>
      <div className="flex w-full flex-col flex-wrap items-start justify-start gap-3 md:gap-5">
        <div className="input_containers grid w-full max-w-5xl grid-cols-12 gap-3 md:gap-5">
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 xl:col-span-3">
            <p className="text-sm">Date of Expense</p>
            <DatePicker inputDate={inputDate} setInputDate={setInputDate} />
          </div>
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 xl:col-span-3">
            <p className="text-sm">Name of Expense</p>
            <Input
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              type="text"
              placeholder="Enter Expense"
            />
          </div>
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 xl:col-span-3">
            <p className="text-sm">Expenses Category</p>
            <Select
              value={expenseCategory}
              onValueChange={(value) => setExpenseCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Groceries">Groceries</SelectItem>
                  <SelectItem value="Housing & Utilities">
                    Housing & Utilities
                  </SelectItem>
                  <SelectItem value="Medical">Medical </SelectItem>
                  <SelectItem value="Food">Food</SelectItem>
                  <SelectItem value="Personal">Personal</SelectItem>
                  <SelectItem value="Educational">Educational</SelectItem>
                  <SelectItem value="Transportation">Transportation</SelectItem>
                  <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="input_section col-span-12 flex w-full flex-col items-start justify-start gap-1 sm:col-span-6 xl:col-span-3">
            <p className="text-sm">Expense Price</p>
            <Input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Enter Price"
            />
          </div>
        </div>
        <div className="action_buttons flex items-center justify-start gap-4 py-2">
          <Button onClick={handleAddNew} className="bg-green-500">
            <CirclePlus className="h-5 w-5" /> &nbsp; New
          </Button>
          <Button
            disabled={isPending}
            onClick={handleAddExpenses}
            className="bg-blue-500"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Add Expense'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;

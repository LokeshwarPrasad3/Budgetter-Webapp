import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Edit, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { editUserExpense } from '@/services/expenses';
import CreatableSelect from 'react-select/creatable';
import { LabelOptions, OptionType } from '@/utils/utility';
import { getCustomReactSelectStyles } from '@/styles/global';
import { useSelector } from 'react-redux';
import { RootState } from '@/components/admin/NewsLetter/UploadForm';
import { ExpensesTableTypes } from '@/types/api/expenses/credentials';

interface EditExpensesDialogPropType {
  storedExpenseDate: string;
  expensesDate: Date;
  info: ExpensesTableTypes;
}

const EditExpensesDialog: React.FC<EditExpensesDialogPropType> = ({
  storedExpenseDate,
  expensesDate,
  info,
}) => {
  const queryClient = useQueryClient();
  const { _id, category, name, price, label } = info;
  const [open, setOpen] = useState(false);

  const [expenseDate, setExpenseDate] = useState<string>(() => {
    const date = new Date(expensesDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  });

  const isDarkMode = useSelector(
    (state: RootState) => state.themeMode.isDarkMode
  );

  const [expenseName, setExpenseName] = useState<string>(name);
  const [expenseCategory, setExpenseCategory] = useState<string>(category);
  const [expensePrice, setExpensePrice] = useState<number>(price);
  const [selectedLabel, setSelectedLabel] = useState<OptionType | null>({
    label: label ?? 'No Label',
    value: label ?? '',
  });

  const [labelOptions, setLabelOptions] = useState<OptionType[]>(LabelOptions);

  const handleCreate = (inputValue: string) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setLabelOptions((prev) => [...prev, newOption]);
    setSelectedLabel(newOption);
  };

  const { mutateAsync: editExpenseMutate, isPending } = useMutation({
    mutationFn: editUserExpense,
    onSuccess: (data) => {
      console.log(data?.message);
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['user-all-expenses'] });
      queryClient.invalidateQueries({ queryKey: ['todayExpense'] });
      toast.success('Expense Edited Successfully!!');
      setOpen(false);
    },
    onError: (error) => {
      toast.error('Error updating expense');
      console.log('Error on updating expense', error);
    },
  });

  const handleUpdateExpense = () => {
    const actualDate = storedExpenseDate;
    if (
      !expenseDate ||
      !expenseName?.trim() ||
      !expenseCategory?.trim() ||
      !expensePrice ||
      expensePrice <= 0
    ) {
      toast.error('Please fill all fields');
      return;
    }
    // validaton
    // console.log('Expense updated:', {
    //   actualDate,
    //   expenseId: _id,
    //   expenseName,
    //   expensePrice,
    //   expenseCategory,
    //   expenseDate,
    // });
    editExpenseMutate({
      actualDate,
      expenseId: _id,
      expenseName,
      expensePrice,
      expenseCategory,
      selectedLabel: selectedLabel?.value ?? null,
      expenseDate,
    });
  };

  const formatToInputDate = (ddmmyyyy: string) => {
    const [day, month, year] = ddmmyyyy.split('-');
    return `${year}-${month}-${day}`; // yyyy-MM-dd for input
  };

  const customReactSelectStyles = getCustomReactSelectStyles(isDarkMode);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-green-600 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700">
          <Edit className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="max-w-2xl overflow-visible"
      >
        <DialogTitle className="hidden"></DialogTitle>
        <div className="flex w-full flex-col items-start justify-start gap-4 rounded-md border border-border_light bg-bg_primary_light shadow-sm dark:border-none dark:border-border_dark dark:bg-transparent">
          <h4 className="text-base font-semibold">Edit Your Expenses</h4>
          <div className="flex w-full flex-col gap-5">
            <div className="col-span-10 grid w-full grid-cols-10 gap-5">
              {/* Date Picker */}
              <div className="col-span-10 flex flex-col gap-1 sm:col-span-5">
                <p className="text-sm">Date of Expense *</p>
                <input
                  type="date"
                  value={expenseDate ? formatToInputDate(expenseDate) : ''}
                  onChange={(e) => {
                    const value = e.target.value; // yyyy-MM-dd
                    const [year, month, day] = value.split('-');
                    setExpenseDate(`${day}-${month}-${year}`); // Save as dd-mm-yyyy
                  }}
                  className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-bg_secondary_dark"
                />
              </div>

              {/* Expense Name */}
              <div className="col-span-10 flex flex-col gap-1 sm:col-span-5">
                <p className="text-sm">Name of Expense *</p>
                <Input
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  type="text"
                  placeholder="Enter Expense"
                />
              </div>

              {/* Category */}
              <div className="col-span-10 flex flex-col gap-1 sm:col-span-5">
                <p className="text-sm">Expenses Category *</p>
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
                      <SelectItem value="Medical">Medical</SelectItem>
                      <SelectItem value="Food">Food</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Educational">Educational</SelectItem>
                      <SelectItem value="Transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="Miscellaneous">
                        Miscellaneous
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Price */}
              <div className="col-span-10 flex flex-col gap-1 sm:col-span-5">
                <p className="text-sm">Expense Price *</p>
                <Input
                  value={expensePrice}
                  onChange={(e) => setExpensePrice(Number(e.target.value))}
                  type="number"
                  placeholder="Enter Price"
                />
              </div>

              {/* label */}
              <div className="col-span-10 flex flex-col gap-1 sm:col-span-5">
                <p className="text-sm">Label</p>
                <CreatableSelect
                  placeholder="Choose Label"
                  options={labelOptions}
                  value={selectedLabel}
                  onChange={setSelectedLabel}
                  onCreateOption={handleCreate}
                  isSearchable
                  styles={customReactSelectStyles}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex items-center justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                className="w-32"
              >
                Cancel
              </Button>

              <Button
                onClick={handleUpdateExpense}
                className="bg-blue-500 hover:bg-blue-600"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </>
                ) : (
                  'Update Expense'
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditExpensesDialog;

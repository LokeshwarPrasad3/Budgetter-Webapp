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
import { RootState } from '@/components/admin/NewsLetter/UploadForm';
import { useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable';
import { LabelOptions, OptionType } from '@/utils/utility';
import { getCustomReactSelectStyles } from '@/styles/global';
import { useFormik } from 'formik';
import { expensesCategories } from '@/utils/ui/utility';
import { addExpensesSchema } from '@/schemas/expenses';

const FilterSection = () => {
  const queryClient = useQueryClient();
  // const [inputDate, setInputDate] = useState<Date | undefined>(new Date());
  // const [expenseName, setExpenseName] = useState<string>('');
  // const [expenseCategory, setExpenseCategory] = useState<string>('');
  // const [price, setPrice] = useState<string>('');
  // const [selectedLabel, setSelectedLabel] = useState<OptionType | null>(null);

  interface FormValues {
    inputDate: Date;
    expenseName: string;
    expenseCategory: string;
    price: string;
    selectedLabel: OptionType | null;
  }

  const initialValues: FormValues = {
    inputDate: new Date(),
    expenseName: '',
    expenseCategory: '',
    price: '',
    selectedLabel: null,
  };
  const formik = useFormik<FormValues>({
    initialValues,
    validationSchema: addExpensesSchema,
    onSubmit: (value, _) => {
      // destrucuture values after click to submit
      const { inputDate, expenseName, expenseCategory, price, selectedLabel } =
        value;
      const label = selectedLabel?.value || null;

      const formattedDate: string = formatDate(inputDate);
      const pastDaysExpensesArray: AddExpensesCredType['pastDaysExpensesArray'] =
        [
          {
            date: formattedDate,
            productsArray: [
              {
                name: expenseName,
                price: parseInt(price),
                category: expenseCategory,
                label: label,
              },
            ],
          },
        ];
      const expensesData: AddExpensesCredType = {
        date: formattedDate,
        pastDaysExpensesArray: pastDaysExpensesArray,
      };

      // Now pass this object to the mutation to call function
      addExpensesMutate(expensesData);
    },
  });

  const [labelOptions, setLabelOptions] = useState<OptionType[]>(LabelOptions);
  const handleCreate = (inputValue: string) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setLabelOptions((prev) => [...prev, newOption]);
    formik.setFieldValue('selectedLabel', newOption);
  };

  const isDarkMode = useSelector(
    (state: RootState) => state.themeMode.isDarkMode
  );

  const { mutateAsync: addExpensesMutate, isPending } = useMutation({
    mutationFn: addExpenses,
    onSuccess: (data) => {
      console.log(data?.message);
      toast.success('Expenses Added Successfully!!');
      queryClient.invalidateQueries({ queryKey: ['todayExpense'] });
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['all-expenses'] });
      formik.resetForm({
        values: {
          inputDate: formik.values.inputDate,
          expenseName: '',
          expenseCategory: formik.values.expenseCategory,
          price: '',
          selectedLabel: formik.values.selectedLabel,
        },
      });
    },
    onError: (error) => {
      console.log('Error on add expenses', error);
      toast.error('Something went wrong!!');
    },
  });

  const handleAddNew = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toast.error('Feature is Pending!');
  };

  const customReactSelectStyles = getCustomReactSelectStyles(isDarkMode);

  return (
    <div className="add_expense_container flex w-full flex-col items-start justify-start gap-4 rounded-md border border-border_light bg-bg_primary_light p-4 px-5 shadow-sm dark:border-border_dark dark:bg-bg_primary_dark">
      <h4 className="text-base font-semibold">Add Your Expenses</h4>
      <form
        onSubmit={formik.handleSubmit}
        className="flex w-full flex-col flex-wrap items-start justify-start gap-3 md:gap-5"
      >
        <div className="input_containers grid w-full max-w-7xl grid-cols-10 gap-3 md:gap-5">
          <div className="input_section col-span-10 flex w-full flex-col items-start justify-start gap-1 sm:col-span-5 xl:col-span-2">
            <p className="text-sm">
              Date of Expense{' '}
              <span className="text-red-500 dark:text-red-200">*</span>{' '}
            </p>
            <DatePicker
              inputDate={formik.values.inputDate}
              setInputDate={(date) => formik.setFieldValue('inputDate', date)}
            />
            {formik.errors.inputDate && formik.touched.inputDate && (
              <span className="ml-1 text-sm text-red-500">
                {typeof formik.errors.inputDate === 'string'
                  ? formik.errors.inputDate
                  : ''}
              </span>
            )}
          </div>
          <div className="input_section col-span-10 flex w-full flex-col items-start justify-start gap-1 sm:col-span-5 xl:col-span-2">
            <p className="text-sm">
              Name of Expense{' '}
              <span className="text-red-500 dark:text-red-200">*</span>{' '}
            </p>
            <Input
              name="expenseName"
              type="text"
              placeholder="Enter Expense"
              value={formik.values.expenseName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.expenseName && formik.touched.expenseName && (
              <span className="ml-1 text-sm text-red-500">
                {formik.errors.expenseName}
              </span>
            )}
          </div>
          <div className="input_section col-span-10 flex w-full flex-col items-start justify-start gap-1 sm:col-span-5 xl:col-span-2">
            <p className="text-sm">
              Expenses Category{' '}
              <span className="text-red-500 dark:text-red-200">*</span>{' '}
            </p>
            <Select
              value={formik.values.expenseCategory}
              onValueChange={(value) =>
                formik.setFieldValue('expenseCategory', value)
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {expensesCategories.map((category: string) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {formik.errors.expenseCategory &&
              formik.touched.expenseCategory && (
                <span className="ml-1 text-sm text-red-500">
                  {formik.errors.expenseCategory}
                </span>
              )}
          </div>
          <div className="input_section col-span-10 flex w-full flex-col items-start justify-start gap-1 sm:col-span-5 xl:col-span-2">
            <p className="text-sm">
              Expense Price{' '}
              <span className="text-red-500 dark:text-red-200">*</span>{' '}
            </p>
            <Input
              name="price"
              type="number"
              placeholder="Enter Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.price && formik.touched.price && (
              <span className="ml-1 text-sm text-red-500">
                {formik.errors.price}
              </span>
            )}
          </div>
          <div className="input_section col-span-10 flex w-full flex-col items-start justify-start gap-1 sm:col-span-5 xl:col-span-2">
            <p className="text-sm">
              Label <span className="text-xs font-medium">(optional)</span>{' '}
            </p>
            <CreatableSelect
              name="selectedLabel"
              placeholder="Choose Label"
              options={labelOptions}
              value={formik.values.selectedLabel}
              onChange={(value) => formik.setFieldValue('selectedLabel', value)}
              onBlur={() => formik.setFieldTouched('selectedLabel', true)}
              onCreateOption={handleCreate}
              isSearchable
              styles={customReactSelectStyles}
            />
          </div>
        </div>
        <div className="action_buttons flex items-center justify-start gap-4 py-2">
          <Button onClick={handleAddNew} className="bg-green-500">
            <CirclePlus className="h-5 w-5" /> &nbsp; New
          </Button>
          <Button type="submit" disabled={isPending} className="bg-blue-500">
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
      </form>
    </div>
  );
};

export default FilterSection;

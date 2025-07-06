import { expensesCategories } from '@/utils/ui/utility';
import * as Yup from 'yup';

export const addExpensesSchema = Yup.object({
  inputDate: Yup.date().required('Please select a date.'),
  expenseName: Yup.string()
    .min(3, 'Name should be at least 3 characters.')
    .required('Expense name is required.'),
  expenseCategory: Yup.string()
    .oneOf(expensesCategories, 'Select a valid category.')
    .required('Category is required.'),
  price: Yup.number()
    .typeError('Enter a valid number.')
    .positive('Price must be greater than 0.')
    .required('Price is required.'),
  selectedLabel: Yup.object()
    .shape({
      value: Yup.string().required(),
      label: Yup.string().required(),
    })
    .nullable(),
});

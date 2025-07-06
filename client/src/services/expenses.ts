import { AddExpensesCredType, DeleteExpenseCredType, EditExpenseCredType, GetExpensesCredType } from '@/types/api/expenses/credentials';
import { AddExpensesResType, DeletedExpenseResType, EditedExpenseResType, ExpensesResType, TodayExpensesResType } from '@/types/api/expenses/expenses';
import { apiURL } from '@/lib/http';

// GET EXPENSES BY DATE
export const getExpensesByDate = async (
  credentials: GetExpensesCredType
): Promise<ExpensesResType> => {
  const { data } = await apiURL.post<ExpensesResType>(
    `/user/show-past-date-expenses`,
    credentials,
  );
  console.log(data);
  return data;
};

// ADD EXPENSES OF DATE OR TODAY
export const addExpenses = async (
  credentials: AddExpensesCredType
): Promise<AddExpensesResType> => {
  const { data } = await apiURL.post<AddExpensesResType>(
    `/user/add-past-date-expenses`,
    credentials,
  );
  return data;
};

// SHOW TODAY EXPENSES
export const getTodayExpenses = async (): Promise<TodayExpensesResType> => {
  const { data } = await apiURL.get<TodayExpensesResType>(
    `/user/show-today-expenses`,
  );
  return data;
};

// SHOW-ALL EXPENSES
export const getUserAllExpenses = async (): Promise<AddExpensesResType> => {
  const { data } = await apiURL.get<AddExpensesResType>(
    `/user/show-all-date-expenses`,
  );
  return data;
};

// Edit existing EXPENSES
export const editUserExpense = async (
  credentials: EditExpenseCredType
): Promise<EditedExpenseResType> => {
  const { data } = await apiURL.patch<EditedExpenseResType>(
    `/user/edit-expenses`,
    credentials,
  );
  return data;
};

// Delete existing EXPENSES

export const deleteUserExpense = async (
  credentials: DeleteExpenseCredType
): Promise<DeletedExpenseResType> => {
  
  const { data } = await apiURL.delete<DeletedExpenseResType>(
    `/user/delete-expenses`,
    {
      data: credentials,
    }
  );
  return data;
};

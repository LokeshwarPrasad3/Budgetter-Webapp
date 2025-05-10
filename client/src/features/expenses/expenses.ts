import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allExpenses: [],
};

export const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    setAllExpenses: (state, action) => {
      state.allExpenses = action.payload;
    },
    deleteExpensesFromAllCollection: (state, action) => {
      const { id, expenseDate } = action.payload;
      const newExpensesData = (state.allExpenses as any[]).map(
        (expense: any) => {
          if (expense.date === expenseDate) {
            const newProducts = (expense.products as any[]).filter(
              (product: any) => product._id !== id
            );
            return { ...expense, products: newProducts };
          }
          return expense;
        }
      );

      (state.allExpenses as any) = newExpensesData;
    },
  },
});

export const { setAllExpenses, deleteExpensesFromAllCollection } =
  expensesSlice.actions;
export default expensesSlice.reducer;

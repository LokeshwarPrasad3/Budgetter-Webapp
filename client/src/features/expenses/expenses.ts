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
        }
    }
})

export const { setAllExpenses } = expensesSlice.actions;
export default expensesSlice.reducer
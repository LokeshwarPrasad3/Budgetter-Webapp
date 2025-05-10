import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    username: '',
    name: '',
    email: '',
    avatar: '',
    currentPocketMoney: '',
    isVerified: false,
    profession: '',
    dob: '',
    instagramLink: '',
    facebookLink: '',
  },
  expenses: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setExpenses: (state, action) => {
      state.expenses = action.payload;
    },
    deleteFilteredExpense: (state, action) => {
      const { id } = action.payload;
      const newExpenses = state.expenses.filter(
        (expense: any) => expense._id !== id
      );
      state.expenses = newExpenses;
    },
    setUserVerified: (state, action) => {
      state.user.isVerified = action.payload;
    },
  },
});

export const { setUser, setExpenses, deleteFilteredExpense, setUserVerified } =
  userSlice.actions;

export default userSlice.reducer;

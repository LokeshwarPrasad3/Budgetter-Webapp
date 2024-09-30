import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: '',
    username: '',
    name: '',
    email: '',
    avatar: '',
    currentPocketMoney: '',
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
      console.log('from state', typeof action.payload);
      // const { projects } =
      state.expenses = action.payload;
    },
  },
});

export const { setUser, setExpenses } = userSlice.actions;

export default userSlice.reducer;

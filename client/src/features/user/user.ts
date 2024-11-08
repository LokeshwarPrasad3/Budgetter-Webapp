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
      console.log('from state', typeof action.payload);
      console.log('from state', action.payload);
      // const { projects } =
      state.expenses = action.payload;
    },
    setUserVerified : (state, action) =>{
      state.user.isVerified = action.payload;
    }
  },
});

export const { setUser, setExpenses, setUserVerified } = userSlice.actions;

export default userSlice.reducer;

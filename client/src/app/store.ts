import { configureStore } from '@reduxjs/toolkit';
import sideNavbarReducer from '../features/sideNavbar/sideNavbarSlice';
import windowWidthReducer from '../features/windowWidth/windowWidthSlice';
import userReducer from '../features/user/user';
import expensesReducer from '../features/expenses/expenses';
import themeModeReducer from '../features/theme/themeModeSlice';

export const store = configureStore({
  reducer: {
    sideNavbar: sideNavbarReducer,
    windowWidth: windowWidthReducer,
    user: userReducer,
    expenses: expensesReducer,
    themeMode: themeModeReducer,
  },
});

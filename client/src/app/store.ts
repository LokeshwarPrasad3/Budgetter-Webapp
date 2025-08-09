import { configureStore } from '@reduxjs/toolkit';
import sideNavbarReducer from '../features/sideNavbar/sideNavbarSlice';
import windowWidthReducer from '../features/windowWidth/windowWidthSlice';
import userReducer from '../features/user/user';
import expensesReducer from '../features/expenses/expenses';
import themeModeReducer from '../features/theme/themeModeSlice';

export const createStore = () =>
  configureStore({
    reducer: {
      sideNavbar: sideNavbarReducer,
      windowWidth: windowWidthReducer,
      user: userReducer,
      expenses: expensesReducer,
      themeMode: themeModeReducer,
    },
  });

// ✅ For the real app — single instance
export const store = createStore();

// ✅ For tests — fresh instance each time
export const setupStore = createStore;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

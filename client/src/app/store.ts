import { configureStore } from '@reduxjs/toolkit';
import sideNavbarReducer from '@/features/sideNavbar/SideNavbarSlice';

export const store = configureStore({
  reducer: {
    sideNavbar: sideNavbarReducer,
  },
});

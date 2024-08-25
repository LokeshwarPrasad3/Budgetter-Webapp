import { configureStore } from '@reduxjs/toolkit';
import sideNavbarReducer from '@/features/sideNavbar/SideNavbarSlice';
import windowWidthReducer from '@/features/windowWidth/windowWidthSlice';

export const store = configureStore({
  reducer: {
    sideNavbar: sideNavbarReducer,
    windowWidth: windowWidthReducer,
  },
});

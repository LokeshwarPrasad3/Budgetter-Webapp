import { configureStore } from '@reduxjs/toolkit';
import sideNavbarReducer from '../features/sideNavbar/sideNavbarSlice';
import windowWidthReducer from '../features/windowWidth/windowWidthSlice';

export const store = configureStore({
  reducer: {
    sideNavbar: sideNavbarReducer,
    windowWidth: windowWidthReducer,
  },
});

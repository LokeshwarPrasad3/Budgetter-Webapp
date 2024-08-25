import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  isSideNavbarOpen: boolean;
}

const initialState: initialStateType = {
  isSideNavbarOpen: true,
};

const sideNavbarSlice = createSlice({
  name: 'sideNavbar',
  initialState,
  reducers: {
    closeSideNavbar: (state) => {
      state.isSideNavbarOpen = false;
    },
    openSideNavbar: (state) => {
      state.isSideNavbarOpen = true;
    },
    toggleSideNavbar: (state) => {
      state.isSideNavbarOpen = !state.isSideNavbarOpen;
    },
  },
});

export const { closeSideNavbar, openSideNavbar, toggleSideNavbar } =
  sideNavbarSlice.actions;

export default sideNavbarSlice.reducer;

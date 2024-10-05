import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  isSideNavbarOpen: boolean;
  showOverlayEffect: boolean;
}

const initialState: initialStateType = {
  isSideNavbarOpen: true,
  showOverlayEffect: true,
};

const sideNavbarSlice = createSlice({
  name: 'sideNavbar',
  initialState,
  reducers: {
    closeSideNavbar: (state) => {
      state.showOverlayEffect = false;
      state.isSideNavbarOpen = false;
    },
    openSideNavbar: (state) => {
      state.showOverlayEffect = true;
      state.isSideNavbarOpen = true;
    },
    toggleSideNavbar: (state) => {
      state.showOverlayEffect = !state.showOverlayEffect;
      state.isSideNavbarOpen = !state.isSideNavbarOpen;
    },
  },
});

export const { closeSideNavbar, openSideNavbar, toggleSideNavbar } =
  sideNavbarSlice.actions;

export default sideNavbarSlice.reducer;

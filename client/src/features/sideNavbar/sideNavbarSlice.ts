import { createSlice } from '@reduxjs/toolkit';

interface initialStateType {
  isSideNavbarOpen: boolean;
  showOverlayEffect: boolean;
}

const initialState: initialStateType = {
  isSideNavbarOpen: window.innerWidth < 768 ? false : true,
  showOverlayEffect: window.innerWidth < 768 ? false : true,
};

const sideNavbarSlice = createSlice({
  name: 'sideNavbar',
  initialState,
  reducers: {
    closeSideNavbar: (state) => {
      if (window.innerWidth < 768) {
        state.showOverlayEffect = false;
        state.isSideNavbarOpen = false;
      }
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

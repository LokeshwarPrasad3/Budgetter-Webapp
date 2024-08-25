import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  windowWidth: window.innerWidth,
  isMobile: false,
};

const windowWidthSlice = createSlice({
  name: 'windowWidth',
  initialState,
  reducers: {
    setCurrentWindowWidth: (state, action) => {
      console.log(action.payload);
      state.windowWidth = action.payload.windowWidth;
    },
    getCurrentWindowWidth: (state) => {
      state.windowWidth = state.windowWidth;
    },
    isMobile: (state) => {
      state.isMobile = state.windowWidth <= 768;
    },
  },
});

export const { getCurrentWindowWidth, setCurrentWindowWidth } =
  windowWidthSlice.actions;

export default windowWidthSlice.reducer;

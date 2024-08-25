import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  windowWidth: window.innerWidth,
  isMobile: window.innerWidth <= 768,
};

const windowWidthSlice = createSlice({
  name: 'windowWidth',
  initialState,
  reducers: {
    setCurrentWindowWidth: (state, action) => {
      console.log('current from redux ', action.payload);
      state.windowWidth = action.payload.windowWidth;
    },
    setIsMobile: (state, action) => {
      console.log('from set is mobile', action.payload);
      state.isMobile = action.payload;
    },
  },
});

export const { setCurrentWindowWidth, setIsMobile } = windowWidthSlice.actions;

export default windowWidthSlice.reducer;

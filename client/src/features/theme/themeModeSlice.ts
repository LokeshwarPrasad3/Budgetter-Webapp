import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: localStorage.getItem('isDarkMode') === 'true',
};

const themeModeSlice = createSlice({
  name: 'themeMode',
  initialState,
  reducers: {
    toggleThemeMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
      document.body.classList.toggle('dark', state.isDarkMode);
    },
  },
});

export const { toggleThemeMode } = themeModeSlice.actions;
export default themeModeSlice.reducer;

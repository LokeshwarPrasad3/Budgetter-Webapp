export const getCustomReactSelectStyles = (isDarkMode: boolean) => ({
  control: (base: any, state: any) => ({
    ...base,
    backgroundColor: isDarkMode ? '#0F0F1B' : '#fff',
    width: '100%',
    maxHeight: '36px',
    minHeight: '36px',
    borderColor: isDarkMode ? '#2A2A3B' : '#E2E8F0',
    color: isDarkMode ? '#fff' : '#000',
    boxShadow: state.isFocused ? '0 0 0 1px #4F46E5' : 'none',
    '&:hover': {
      borderColor: isDarkMode ? '#3B3B4F' : '#CBD5E0',
    },
    fontSize: '14px',
  }),
  container: (base: any) => ({
    ...base,
    width: '100%',
  }),
  menu: (base: any) => ({
    ...base,
    backgroundColor: isDarkMode ? '#1A1A2E' : '#fff',
    color: isDarkMode ? '#fff' : '#000',
  }),
  singleValue: (base: any) => ({
    ...base,
    color: isDarkMode ? '#fff' : '#000',
  }),
  input: (base: any) => ({
    ...base,
    color: isDarkMode ? '#fff' : '#000',
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isFocused
      ? isDarkMode
        ? '#2C2C3E'
        : '#E0E7FF'
      : 'transparent',
    color: isDarkMode ? '#fff' : '#000',
    cursor: 'pointer',
    fontSize: '13px',
  }),
  dropdownIndicator: (base: any) => ({
    ...base,
    color: isDarkMode ? '#aaa' : '#33333350',
    '& > svg': {
      width: '16px',
      height: '16px',
    },
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    backgroundColor: isDarkMode ? '#333' : '#ccc',
  }),
});

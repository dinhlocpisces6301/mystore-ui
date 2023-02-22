import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    h6: {
      fontSize: '16px',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

export default light;

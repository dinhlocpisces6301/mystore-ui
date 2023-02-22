import { createTheme } from '@mui/material/styles';

const dark = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    h6: {
      fontSize: '16px',
    },
  },
});

export default dark;

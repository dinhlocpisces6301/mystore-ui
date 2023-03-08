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
  components: {
    MuiCssBaseline: {
      styleOverrides: (themeParam) => ({
        body: {
          '&::-webkit-scrollbar': {
            borderRadius: 0,
            width: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            borderRadius: '16px',
            backgroundColor: 'rgba(168, 168, 168, 0.9)',
          },
          '&::-webkit-scrollbar-track': {
            borderRadius: 0,
            backgroundColor: 'rgba(168, 168, 168, 0)',
          },
        },
      }),
    },
  },
});

export default light;

import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    h6: {
      fontSize: '16px',
    },
    subtitle1: {
      fontSize: '16px',
    },
    subtitle2: {
      fontSize: '12px',
    },
    title: {
      fontSize: '32px',
      textAlign: 'left',
      fontWeight: 'bold',
      color: '#000',
    },
    'orign-price': {
      fontSize: '16px',
      textAlign: 'left',
      textDecoration: 'line-through',
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    price: {
      fontSize: '24px',
      textAlign: 'left',
      fontWeight: 'bold',
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
        a: {
          textDecoration: 'none',
          color: '#000',
        },
      }),
    },
  },
});

export default light;

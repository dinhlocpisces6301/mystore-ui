import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    h5: {
      fontWeight: 'bold',
    },
    h6: {
      fontSize: '16px',
    },
    contactText: {
      fontSize: '16px',
      display: 'block',
    },
    copyright: {
      fontSize: '12px',
      lineHeight: '16px',
      display: 'block',
    },
    title: {
      fontSize: '28px',
      textAlign: 'left',
      fontWeight: 'bold',
      color: '#000',
      margin: '32px',
      display: 'block',
    },
    subTitle: {
      fontSize: '20px',
      textAlign: 'center',
      fontWeight: 'bold',
      color: '#000',
      margin: '0px',
      display: 'block',
    },
    company: {
      fontSize: '18px',
      textAlign: 'left',
      fontWeight: 'bold',
      display: 'block',
      color: '#000',
    },
    'origin-price': {
      fontSize: '14px',
      textAlign: 'left',
      textDecoration: 'line-through',
      fontWeight: 'bold',
      color: '#4c4c4c',
      display: 'block',
    },
    price: {
      fontSize: '16px',
      textAlign: 'left',
      fontWeight: 'bold',
      color: '#000',
      display: 'block',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
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

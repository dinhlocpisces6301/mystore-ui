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
            backgroundColor: 'rgba(23, 26, 33, 1)',
          },
        },
        svg: {
          color: '#fff',
        },
      }),
    },
  },
});

export default dark;

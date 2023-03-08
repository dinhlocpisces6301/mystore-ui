import { Fragment, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { dark, light } from '~/themes';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import { scrollToPosition } from './utils';
import ScrollButton from './components/ScrollButton';
import ChangeThemeButton from './components/ChangeThemeButton';
function App() {
  const [isDarkMode] = useState(false);

  let location = useLocation();
  useEffect(() => {
    scrollToPosition(0);
  }, [location.pathname]);

  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      <CssBaseline />
      <ScrollButton />
      <ChangeThemeButton />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = DefaultLayout;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </ThemeProvider>
  );
}

export default App;

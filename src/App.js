import { Fragment, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { dark, light } from '~/themes';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';

function App() {
  const [isDarkMode] = useState(false);

  return (
    <ThemeProvider theme={isDarkMode ? dark : light}>
      <CssBaseline />
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

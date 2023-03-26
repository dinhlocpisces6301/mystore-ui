import { Fragment, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { scrollToPosition } from './utils';
import { dark, light } from '~/themes';
import DefaultLayout, { HeaderOnly } from '~/layouts';
import { authRoutes, privateRoutes, publicRoutes } from '~/routes';
import ScrollButton from './components/ScrollButton';
import ChangeThemeButton from './components/ChangeThemeButton';
import config from './config';

import * as authServices from '~/services/authServices';

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
        {authRoutes.map((route, index) => {
          const Page = route.component;
          const isLoggedIn = authServices.isLoggedIn;
          let Layout = HeaderOnly;
          // Login rồi không vào trang Login, Sign Up, Forget Password được nữa
          return (
            <Route
              key={index}
              path={route.path}
              element={
                isLoggedIn ? (
                  <Navigate to={config.routes.home} replace={true} />
                ) : (
                  <Layout>
                    <Page />
                  </Layout>
                )
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout = HeaderOnly;
          const isLoggedIn = authServices.isLoggedIn();
          // Chưa Loggin thì không vào được trang Profile, Cart, WishList, Checkout
          return (
            <Route
              key={index}
              path={route.path}
              element={
                isLoggedIn ? (
                  <Layout>
                    <Page />
                  </Layout>
                ) : (
                  <Navigate to={config.routes.login} replace={true} />
                )
              }
            />
          );
        })}
      </Routes>
    </ThemeProvider>
  );
}

export default App;

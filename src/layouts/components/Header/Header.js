import classNames from 'classnames/bind';
import { Button, Tooltip, Box, Stack, IconButton, AppBar, Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Grid from '@mui/material/Unstable_Grid2';
import { Link, NavLink } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';

import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  return (
    <AppBar position="sticky" className={cx('wrapper')}>
      <Grid container className={cx('container')}>
        <Grid
          xs={12}
          lg={3}
          sx={{
            display: {
              xs: 'flex',
              md: 'flex',
            },
          }}
        >
          <IconButton
            className={cx('responsive-button')}
            sx={{
              display: {
                lg: 'none',
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box
            className={cx('logo')}
            sx={{
              flexGrow: {
                xs: 1,
              },
            }}
          >
            <Link to={config.routes.home}>
              <img src={images.logo} alt="Gaming store" />
            </Link>
          </Box>
          <IconButton
            className={cx('responsive-button')}
            sx={{
              display: {
                lg: 'none',
              },
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Grid>
        <Grid xs={0} lg={6}>
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            className={cx('navbar-items')}
            sx={{
              display: {
                xs: 'none',
                lg: 'flex',
              },
            }}
          >
            <NavLink to={config.routes.home} className={({ isActive }) => (isActive ? cx('active') : undefined)}>
              Trang chủ
            </NavLink>

            <NavLink to={config.routes.community} className={({ isActive }) => (isActive ? cx('active') : undefined)}>
              Cộng đồng
            </NavLink>

            <NavLink to={config.routes.contact} className={({ isActive }) => (isActive ? cx('active') : undefined)}>
              Phản hồi
            </NavLink>

            <NavLink to={config.routes.about} className={({ isActive }) => (isActive ? cx('active') : undefined)}>
              Về chúng tôi
            </NavLink>
          </Stack>
        </Grid>
        <Grid xs={0} lg={3}>
          {false ? (
            <Box
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Avatar alt="avatar" src={process.env.PUBLIC_URL + '/images/avatar-placeholder.jpg'}></Avatar>
            </Box>
          ) : (
            <Box
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}
            >
              <Tooltip title="Đăng ký">
                <Button variant="contained" color="primary" sx={{ mr: 1 }}>
                  Đăng ký
                </Button>
              </Tooltip>

              <Tooltip title="Đăng nhập">
                <Button variant="contained" color="error">
                  Đăng nhập
                </Button>
              </Tooltip>
            </Box>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Header;

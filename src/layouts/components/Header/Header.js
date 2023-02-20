import classNames from 'classnames/bind';
import { Button, Tooltip, Box, Stack, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link, NavLink } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';

import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  return (
    <>
      <AppBar position="sticky" className={cx('wrapper')}>
        <Toolbar
          className={cx('container')}
          sx={{
            px: {
              xs: 0,
              md: 8,
            },
          }}
        >
          <IconButton
            className={cx('responsive-button')}
            sx={{
              display: {
                md: 'none',
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
                md: 0,
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
                md: 'none',
              },
            }}
          >
            <AccountCircleIcon />
          </IconButton>

          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            alignItems="center"
            className={cx('navbar-items')}
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
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

          <Box
            sx={{
              display: {
                xs: 'none',
                md: 'flex',
              },
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
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;

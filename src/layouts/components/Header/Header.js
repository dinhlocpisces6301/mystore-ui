import classNames from 'classnames/bind';
import { Button, Box, Stack, IconButton, AppBar, Avatar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, NavLink } from 'react-router-dom';

import config from '~/config';
import images from '~/assets/images';
import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  return (
    <AppBar position="sticky" sx={{ background: '#171a21' }}>
      <Grid container className={cx('wrapper')}>
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
            className={cx('responsive-btn')}
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
            className={cx('responsive-btn')}
            sx={{
              display: {
                lg: 'none',
              },
            }}
          >
            <AccountCircleIcon />
          </IconButton>
        </Grid>
        <Grid
          lg={6}
          sx={{
            display: {
              xs: 'none',
              md: 'none',
              lg: 'flex',
            },
          }}
        >
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} className={cx('navbar-items')}>
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
        <Grid
          lg={3}
          sx={{
            display: {
              xs: 'none',
              lg: 'flex',
            },
          }}
        >
          {true ? (
            <Box
              className={cx('action')}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <Button variant="contained" color="success" className={cx('action-btn')}>
                {`Giỏ hàng (${0})`}
              </Button>
              <Button variant="contained" color="info" className={cx('action-btn')}>
                {`Wishlist (${1})`}
              </Button>
              <Avatar alt="avatar" src={process.env.PUBLIC_URL + '/images/avatar-placeholder.jpg'} />
            </Box>
          ) : (
            <Box
              className={cx('action')}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <Button variant="contained" color="primary" className={cx('action-btn')}>
                Đăng ký
              </Button>

              <Button variant="contained" color="error" className={cx('action-btn')}>
                Đăng nhập
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </AppBar>
  );
}

export default Header;

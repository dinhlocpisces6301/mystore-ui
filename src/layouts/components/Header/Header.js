import classNames from 'classnames/bind';
import {
  Button,
  Box,
  Stack,
  IconButton,
  AppBar,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  Typography,
  Drawer,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import config from '~/config';
import images from '~/assets/images';

import DrawerLeft from '../DrawerLeft';
import DrawerRight from '../DrawerRight';

import { getUserData, userSelector } from '~/store/reducers/userSlice';
import { getCart, cartSelector } from '~/store/reducers/cartSlice';
import { getWishlist, wishlistSelector } from '~/store/reducers/wishlistSlice';
import { getCheckout } from '~/store/reducers/checkoutSlice';

import * as authServices from '~/services/authServices';
import * as imageServices from '~/services/imageServices';

import styles from './Header.module.scss';
const cx = classNames.bind(styles);

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = authServices.isLoggedIn();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserData());
    dispatch(getCart());
    dispatch(getWishlist());
    dispatch(getCheckout());
  }, [dispatch]);

  const user = useSelector(userSelector);
  const [userName, setUserName] = useState(undefined);
  const [avatar, setAvatar] = useState(undefined);

  useLayoutEffect(() => {
    if (user.data !== undefined) {
      setUserName(user.data.userName);
      setAvatar(user.data.avatarPath);
    }
  }, [user]);

  const cart = useSelector(cartSelector);
  const [cartData, setCartData] = useState([]);
  useLayoutEffect(() => {
    setCartData(cart.data || []);
  }, [cart]);

  const wishlist = useSelector(wishlistSelector);
  const [wishlistData, setWishlistData] = useState([]);
  useLayoutEffect(() => {
    setWishlistData(wishlist.data || []);
  }, [wishlist]);

  // Phần điều hướng của Header
  const NavItems = () => {
    return (
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} className={cx('navbar-items')}>
        <NavLink to={config.routes.home} className={({ isActive }) => (isActive ? cx('active') : undefined)}>
          Trang chủ
        </NavLink>

        <NavLink to={'/category'} className={({ isActive }) => (isActive ? cx('active') : undefined)}>
          Thể loại
        </NavLink>

        <NavLink to={config.routes.contact} className={({ isActive }) => (isActive ? cx('active') : undefined)}>
          Phản hồi
        </NavLink>

        <NavLink to={config.routes.about} className={({ isActive }) => (isActive ? cx('active') : undefined)}>
          Về chúng tôi
        </NavLink>
      </Stack>
    );
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Menu của Header
  const NavMenu = ({ username = 'User Name' }) => {
    const handleLogout = () => {
      authServices.logout();
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        navigate(config.routes.login, { replace: true });
      }, 2000);
    };
    const handleRedirectToProfile = () => {
      navigate(`/profile/@${username}`);
    };

    return (
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            width: '200px',
          },
        }}
      >
        <MenuItem disableTouchRipple>
          <Typography
            variant="h6"
            sx={{ textAlign: 'center', width: '100%', background: '#cfe9f3', borderRadius: '4px' }}
          >
            {username}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleRedirectToProfile}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          Hồ sơ
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    );
  };

  const [drawer, setDrawer] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setDrawer({ ...drawer, [anchor]: open });
  };

  return (
    <AppBar position="sticky" sx={{ background: '#cfe9f3' }}>
      {/* Logo start */}
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
            onClick={toggleDrawer('left', true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer anchor={'left'} open={drawer['left']} onClose={toggleDrawer('left', false)}>
            <DrawerLeft onClose={toggleDrawer('left', false)} />
          </Drawer>

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
            onClick={toggleDrawer('right', true)}
          >
            <AccountCircleIcon />
          </IconButton>
          <Drawer anchor={'right'} open={drawer['right']} onClose={toggleDrawer('right', false)}>
            <DrawerRight onClose={toggleDrawer('right', false)} />
          </Drawer>
        </Grid>
        {/* Logo end */}

        {/* NavItem start */}
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
          <NavItems />
        </Grid>
        {/* NavItem end */}

        {/* Action start*/}
        <Grid
          lg={3}
          sx={{
            display: {
              xs: 'none',
              lg: 'flex',
            },
          }}
        >
          {isLoggedIn ? (
            <Box
              className={cx('action')}
              sx={{
                display: {
                  xs: 'none',
                  lg: 'flex',
                },
              }}
            >
              <Box className={cx('btn-container')}>
                <Button
                  variant="contained"
                  color="success"
                  className={cx('btn')}
                  onClick={() => navigate(config.routes.cart)}
                >
                  {`Giỏ hàng (${cartData.length})`}
                </Button>
                <Button
                  variant="contained"
                  color="info"
                  className={cx('btn')}
                  onClick={() => navigate(config.routes.wishlist)}
                >
                  {`Wishlist (${wishlistData.length})`}
                </Button>
              </Box>
              <IconButton
                aria-label=""
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar alt="avatar" src={imageServices.getImage(avatar)} variant="rounded" />
              </IconButton>
              <NavMenu username={userName} />
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
              <Button
                variant="contained"
                color="primary"
                className={cx('login-btn')}
                onClick={() => navigate(config.routes.signup)}
              >
                Đăng ký
              </Button>

              <Button
                variant="contained"
                color="error"
                className={cx('signup-btn')}
                onClick={() => navigate(config.routes.login)}
              >
                Đăng nhập
              </Button>
            </Box>
          )}
        </Grid>
        {/* Action end*/}
      </Grid>
    </AppBar>
  );
}

export default Header;

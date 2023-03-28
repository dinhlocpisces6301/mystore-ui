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

  const NavItems = () => {
    return (
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
  const NavMenu = ({ username = 'User Name' }) => {
    const handleLogout = () => {
      authServices.logout();
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        navigate(config.routes.login, { replace: true });
      }, 2000);
    };
    const handleRedirectToProfile = () => {
      navigate(config.routes.profile, { replace: true });
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
            mt: 1.5,
            width: '200px',
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 24,
              width: 16,
              height: 16,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem disableTouchRipple>
          <Typography variant="h6" sx={{ textAlign: 'center', width: '100%' }}>
            {username}
          </Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleRedirectToProfile}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          My account
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    );
  };

  return (
    <AppBar position="sticky" sx={{ background: '#cfe9f3' }}>
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
          <NavItems />
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
              <Button
                variant="contained"
                color="success"
                className={cx('action-btn')}
                onClick={() => navigate(config.routes.cart, { replace: true })}
              >
                {`Giỏ hàng (${cartData.length})`}
              </Button>
              <Button
                variant="contained"
                color="info"
                className={cx('action-btn')}
                onClick={() => navigate(config.routes.wishlist, { replace: true })}
              >
                {`Wishlist (${wishlistData.length})`}
              </Button>
              <IconButton
                aria-label=""
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Avatar alt="avatar" src={imageServices.getImage(avatar)} />
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
                className={cx('action-btn')}
                onClick={() => navigate(config.routes.signup, { replace: true })}
              >
                Đăng ký
              </Button>

              <Button
                variant="contained"
                color="error"
                className={cx('action-btn')}
                onClick={() => navigate(config.routes.login, { replace: true })}
              >
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

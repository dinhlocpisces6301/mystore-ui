import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import config from '~/config';

import { getUserData, userSelector } from '~/store/reducers/userSlice';
import { getCart, cartSelector } from '~/store/reducers/cartSlice';
import { getWishlist, wishlistSelector } from '~/store/reducers/wishlistSlice';
import { getCheckout } from '~/store/reducers/checkoutSlice';

import * as authServices from '~/services/authServices';
import * as imageServices from '~/services/imageServices';

function DrawerRight({ onClose }) {
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

  const handleLogout = () => {
    authServices.logout();
    const timerId = setTimeout(() => {
      clearTimeout(timerId);
      navigate(config.routes.login, { replace: true });
    }, 2000);
  };

  return (
    <Box onClick={onClose} sx={{ height: '100%' }}>
      <Box sx={{ height: '80px', width: '250px', background: '#cfe9f3' }}></Box>
      {isLoggedIn ? (
        <Stack spacing={2} m={2}>
          <Button onClick={() => navigate(`/profile/@${userName}`)}>
            <Avatar
              alt="avatar"
              src={imageServices.getImage(avatar)}
              variant="rounded"
              sx={{ height: '80px', width: '80px', border: '2px solid #ccc' }}
            />
          </Button>
          <Typography variant="subTitle">{userName}</Typography>
          <Button variant="contained" color="success" onClick={() => navigate(config.routes.cart)}>
            {`Giỏ hàng (${cartData.length})`}
          </Button>
          <Button variant="contained" color="info" onClick={() => navigate(config.routes.wishlist)}>
            {`Wishlist (${wishlistData.length})`}
          </Button>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Đăng xuất
          </Button>
        </Stack>
      ) : (
        <Stack spacing={2} m={1}>
          <Button variant="contained" color="primary" onClick={() => navigate(config.routes.signup)}>
            Đăng ký
          </Button>
          <Button variant="contained" color="error" onClick={() => navigate(config.routes.login)}>
            Đăng nhập
          </Button>
        </Stack>
      )}
    </Box>
  );
}

export default DrawerRight;

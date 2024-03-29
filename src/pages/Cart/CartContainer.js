import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography, Button, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getCart, cartSelector } from '~/store/reducers/cartSlice';
import CartItem from './CartItem';
import { currencyFormat } from '~/utils';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function CartContainer() {
  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  useEffect(() => {
    setCartData(cart.data || []);
  }, [cart]);

  const navigate = useNavigate();
  return (
    <Grid container xs={12}>
      <Grid xs={12}>
        <Typography variant="title">Giỏ hàng ({cartData.length})</Typography>
      </Grid>

      <Grid xs={12} md={7}>
        <Box className={cx('cart-container')}>
          {cartData.length > 0 ? (
            cartData.map((item, index) => {
              return <CartItem data={item} key={item.id} />;
            })
          ) : (
            <></>
          )}
        </Box>
      </Grid>
      <Grid xs={12} md={5} className={cx('cart-total-container')}>
        <Typography variant="subTitle">
          Tổng cộng: <strong>{currencyFormat(cartData.reduce((total, current) => total + current.price, 0))}</strong>
        </Typography>
        <Typography variant="subTitle">
          Giảm được:{' '}
          <strong>
            {currencyFormat(cartData.reduce((total, current) => total + (current.price * current.discount) / 100, 0))}
          </strong>
        </Typography>
        <Divider variant="middle" flexItem />
        <Typography variant="subTitle">
          Tiền phải thanh toán:{' '}
          <strong>
            {currencyFormat(
              cartData.reduce((total, current) => total + current.price * (1 - current.discount / 100), 0),
            )}
          </strong>
        </Typography>
        <Box className={cx('btn-container')}>
          <Button
            variant="contained"
            color="info"
            onClick={() => {
              navigate('/');
            }}
          >
            Tiếp tục mua sắm
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => {
              navigate('/checkout');
            }}
          >
            Thanh toán
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CartContainer;

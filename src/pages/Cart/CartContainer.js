import Grid from '@mui/material/Unstable_Grid2';
import CartItem from './CartItem';
import { Box, Typography, Button, Divider } from '@mui/material';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
const cx = classNames.bind(styles);

function CartContainer() {
  return (
    <Grid container xs={12}>
      <Grid xs={12}>
        <Typography variant="title">Giỏ hàng (4)</Typography>
      </Grid>

      <Grid xs={12} md={7}>
        <Box className={cx('cart-container')}>
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
          <CartItem />
        </Box>
      </Grid>
      <Grid xs={12} md={5} className={cx('cart-total-container')}>
        <Typography variant="subTitle">
          Tổng cộng: <strong>2.000.000đ</strong>
        </Typography>
        <Typography variant="subTitle">
          Giảm được: <strong>1.500.000đ</strong>
        </Typography>
        <Typography variant="subTitle" color="error">
          Thuế: 10%
        </Typography>
        <Divider variant="middle" flexItem />
        <Typography variant="subTitle">
          Tiền phải thanh toán: <strong>550.000đ</strong>
        </Typography>
        <Box className={cx('btn-container')}>
          <Button variant="contained" color="info">
            Tiếp tục mua sắm
          </Button>
          <Button variant="contained" color="success">
            Thanh toán
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CartContainer;

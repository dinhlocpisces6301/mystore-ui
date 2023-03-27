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
        </Box>
      </Grid>
      <Grid xs={12} md={5} className={cx('cart-total-container')}>
        <Typography variant="subTitle" align="left" marginX={2}>
          Tổng cộng: <strong>2.000.000đ</strong>
        </Typography>
        <Divider variant="middle" flexItem />
        <Typography variant="subTitle" align="left" marginX={2}>
          Giảm được: <strong>1.500.000đ</strong>
        </Typography>
        <Typography variant="subTitle" align="left" color="error" marginX={2}>
          Thuế: 10% ~ 50.000đ
        </Typography>
        <Divider variant="middle" flexItem />
        <Typography variant="subTitle" align="left" marginX={2}>
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

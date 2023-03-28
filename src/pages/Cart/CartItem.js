import Grid from '@mui/material/Unstable_Grid2';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
const cx = classNames.bind(styles);

function CartItem() {
  return (
    <Grid container xs={12} className={cx('cart-item')}>
      <Grid xs={5}>
        <Box className={cx('img')}>
          <img src={process.env.PUBLIC_URL + '/images/2.jpg'} alt="" className={cx('img')} />
        </Box>
      </Grid>
      <Grid xs={6} className={cx('cart-item-detail')}>
        <Typography variant="subTitle">Genshin Impact</Typography>
        <Typography variant="orign-price">200.000đ</Typography>
        <Typography variant="price">200.000đ</Typography>
      </Grid>
      <Grid xs={1} className={cx('cart-item-btn')}>
        <Typography className={cx('remove-btn')}>Xóa</Typography>
      </Grid>
    </Grid>
  );
}

export default CartItem;

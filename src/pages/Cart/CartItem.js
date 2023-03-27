import Grid from '@mui/material/Unstable_Grid2';

import classNames from 'classnames/bind';
import styles from './Cart.module.scss';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
const cx = classNames.bind(styles);

function CartItem() {
  return (
    <Grid container xs={12} className={cx('cart-item')}>
      <Grid xs={6}>
        <Box className={cx('img')}>
          <img src={process.env.PUBLIC_URL + '/images/tmp.jpg'} alt="" className={cx('img')} />
        </Box>
      </Grid>
      <Grid xs={6}>
        <Typography variant="subTitle" align="left" marginX={4} mt={2}>
          Genshin Impact
        </Typography>
        <Typography variant="orign-price" align="left" marginX={4}>
          200.000đ
        </Typography>
        <Typography variant="price" align="left" marginX={4}>
          200.000đ
        </Typography>
        <Typography className={cx('remove-btn')}>xóa</Typography>
      </Grid>
    </Grid>
  );
}

export default CartItem;

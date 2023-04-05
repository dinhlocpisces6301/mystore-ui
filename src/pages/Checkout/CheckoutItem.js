import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2/';
import { Box, Typography } from '@mui/material';

import { currencyFormat } from '~/utils';
import * as imageServices from '~/services/imageServices';

import styles from './Checkout.module.scss';
const cx = classNames.bind(styles);

function CheckoutItem({ data }) {
  return (
    <Grid container xs={12} className={cx('item')}>
      <Grid xs={5}>
        <Box className={cx('img')}>
          <img src={imageServices.getImage(data.imageList[1])} alt="" className={cx('img')} />
        </Box>
      </Grid>
      <Grid xs={7} className={cx('item-detail')}>
        <Typography variant="subTitle">{data.name}</Typography>
        {data.discount > 0 && <Typography variant="origin-price">{currencyFormat(data.price)}</Typography>}
        <Typography variant="price">{currencyFormat(data.price * (1 - data.discount / 100))}</Typography>
      </Grid>
    </Grid>
  );
}

export default CheckoutItem;

import classNames from 'classnames/bind';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

import { currencyFormat } from '~/utils';
import styles from './ProductList.module.scss';
const cx = classNames.bind(styles);

function Product() {
  return (
    <Grid xs={6} md={2.4} lg={2}>
      <Box className={cx('content')}>
        <Link to={'/product/9e8634ae-7dc7-4942-6890-08db2f8e91bc'}>
          <Box sx={{ height: '240px' }}>
            <img src={process.env.PUBLIC_URL + '/images/1.jpg'} alt="" className={cx('img')} />
          </Box>
        </Link>
        <Box className={cx('detail')}>
          <Link to={'/product/9e8634ae-7dc7-4942-6890-08db2f8e91bc'}>
            <Typography variant="subTitle">Red dead Redemption</Typography>
          </Link>
          <Typography variant="origin-price">{currencyFormat(200000)}</Typography>
          <Typography variant="price">{currencyFormat(150000)}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default Product;

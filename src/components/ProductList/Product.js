import classNames from 'classnames/bind';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

import { currencyFormat } from '~/utils';
import styles from './ProductList.module.scss';
const cx = classNames.bind(styles);

function Product() {
  return (
    <Grid xs={10} md={3} lg={3} xsOffset={1} mdOffset={0} lgOffset={0}>
      <Link to={'/'}>
        <Box className={cx('content')}>
          <Box sx={{ height: { xs: '200px', md: '240px', lg: '280px' } }}>
            <img src={process.env.PUBLIC_URL + '/images/tmp1.jpg'} alt="" className={cx('img')} />
          </Box>
          <Box className={cx('detail')}>
            <Typography variant="subTitle">Genshin Impact</Typography>
            <Typography variant="orign-price">{currencyFormat(200000)}</Typography>
            <Typography variant="price">{currencyFormat(150000)}</Typography>
          </Box>
        </Box>
      </Link>
    </Grid>
  );
}

export default Product;

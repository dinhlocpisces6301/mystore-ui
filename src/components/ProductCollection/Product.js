import classNames from 'classnames/bind';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { currencyFormat } from '~/utils';
import styles from './ProductCollection.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function Product() {
  return (
    <Grid container xs={12}>
      <Box className={cx('content')}>
        <Link to={'/product/id'}>
          <img src={process.env.PUBLIC_URL + '/images/2.jpg'} alt="" className={cx('img')} />
        </Link>
        <Box className={cx('detail')}>
          <Link to={'/product/id'}>
            <Typography variant="subTitle" sx={{ fontSize: '16px' }}>
              Red Dead Redemption 2
            </Typography>

            <Typography variant="orign-price" align="right">
              {currencyFormat(200000)}
            </Typography>

            <Typography variant="price" align="right">
              {currencyFormat(200000)}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}

export default Product;

import classNames from 'classnames/bind';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';

import * as imageServices from '~/services/imageServices';
import { currencyFormat } from '~/utils';
import styles from './ProductList.module.scss';
const cx = classNames.bind(styles);

function Product({ data }) {
  return (
    <Grid xs={6} md={2.4} lg={2}>
      <Box className={cx('content')}>
        <Link to={`/product/${data.id}`}>
          <img src={imageServices.getImage(data.listImage[0])} alt="" className={cx('img')} />
        </Link>
        <Box className={cx('detail')}>
          <Link to={`/product/${data.id}`}>
            <Typography variant="subTitle">{data.name}</Typography>
          </Link>
          {data.discount !== 0 && <Typography variant="origin-price">{currencyFormat(data.price)}</Typography>}
          <Typography variant="price">
            {data.price === 0 ? 'Miễn phí' : currencyFormat(data.price * (1 - data.discount / 100))}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

export default Product;

import classNames from 'classnames/bind';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';

import { currencyFormat } from '~/utils';
import * as imageServices from '~/services/imageServices';

import styles from './ProductCollection.module.scss';
const cx = classNames.bind(styles);

function Product({ data }) {
  return (
    <Grid container xs={12}>
      <Box className={cx('content')}>
        <Link to={`/product/${data.id || data.gameID}`} className={cx('img')}>
          <img src={imageServices.getImage(data.listImage[1])} alt="" className={cx('img')} />
        </Link>
        <Box className={cx('detail')}>
          <Link to={`/product/${data.id || data.gameID}`}>
            <Typography variant="subTitle">{data.name}</Typography>
            {data.discount !== 0 && <Typography variant="origin-price">{currencyFormat(data.price)}</Typography>}
            <Typography variant="price">
              {data.price === 0 ? 'Miễn phí' : currencyFormat(data.price * (1 - data.discount / 100))}
            </Typography>
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}

export default Product;

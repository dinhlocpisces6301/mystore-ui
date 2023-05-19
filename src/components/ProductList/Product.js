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
    <Grid xs={6} md={2.4} className={cx('wrapper')}>
      <Box className={cx('content')}>
        <Link to={`/product/${data.id || data.gameID}`}>
          <img src={imageServices.getImage(data.listImage[0])} alt="" className={cx('img')} />
        </Link>
        <Box className={cx('detail')}>
          <Link to={`/product/${data.id || data.gameID}`}>
            <Typography variant="subTitle">{data.name}</Typography>
          </Link>
          {data.status ? (
            <>
              {data.discount !== 0 && <Typography variant="origin-price">{currencyFormat(data.price)}</Typography>}
              <Typography variant="price">
                {data.price === 0 ? 'Miễn phí' : currencyFormat(data.price * (1 - data.discount / 100))}
              </Typography>
            </>
          ) : (
            <Typography variant="price">Sắp ra mắt</Typography>
          )}
        </Box>
      </Box>
    </Grid>
  );
}

export default Product;

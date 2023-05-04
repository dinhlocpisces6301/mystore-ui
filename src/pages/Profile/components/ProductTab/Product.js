import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, IconButton, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';

import { currencyFormat } from '~/utils';
import * as imageServices from '~/services/imageServices';
import styles from './ProductTab.module.scss';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function Product({ data }) {
  return (
    <Grid container xs={12} className={cx('item')}>
      <Grid xs={12} md={4}>
        <Box className={cx('item-img')}>
          <img src={imageServices.getImage(data.listImage[1])} alt="Game" />
        </Box>
      </Grid>
      <Grid xs={12} md={6}>
        <Box className={cx('item-detail')}>
          <Link to={`/product/${data.id}`}>
            <Typography variant="subTitle">{data.name}</Typography>
          </Link>
          <Typography variant="subTitle">
            <strong>Ngày mua:</strong> {new Date(data.createdDate).toLocaleDateString('en-GB')}
          </Typography>
          <Typography variant="subTitle">
            <strong>Giá mua:</strong> {currencyFormat(data.price * (1 - data.discount / 100))}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} md={2} className={cx('item-action')}>
        <IconButton>
          <CloudDownloadIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default Product;

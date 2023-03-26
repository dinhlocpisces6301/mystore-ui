import classNames from 'classnames/bind';
import { Button, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import Product from './Product';
import styles from './ProductCollection.module.scss';
const cx = classNames.bind(styles);
function ProductCollection() {
  return (
    <Grid container xs={12} disableEqualOverflow className={cx('wrapper')}>
      <Grid container xs={10} md lg xsOffset={1} mdOffset={0} lgOffset={0}>
        <Grid xs={12} className={cx('header')}>
          <Typography variant="h5">{`Bán chạy`}</Typography>
          <Button variant="outlined">Xem thêm</Button>
        </Grid>
        {Array.from({ length: 3 }).map((item, index) => (
          <Product key={index} />
        ))}
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid container xs={10} md lg xsOffset={1} mdOffset={0} lgOffset={0}>
        <Grid xs={12} className={cx('header')}>
          <Typography variant="h5">{`Mới ra mắt`}</Typography>
          <Button variant="outlined">Xem thêm</Button>
        </Grid>
        {Array.from({ length: 3 }).map((item, index) => (
          <Product key={index} />
        ))}
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid container xs={10} md lg xsOffset={1} mdOffset={0} lgOffset={0}>
        <Grid xs={12} className={cx('header')}>
          <Typography variant="h5">{`Yêu thích`}</Typography>
          <Button variant="outlined">Xem thêm</Button>
        </Grid>
        {Array.from({ length: 3 }).map((item, index) => (
          <Product key={index} />
        ))}
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />
    </Grid>
  );
}

export default ProductCollection;

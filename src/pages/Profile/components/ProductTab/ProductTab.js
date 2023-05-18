import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Product from './Product';
import { checkoutSelector, getCheckout } from '~/store/reducers/checkoutSlice';
import styles from './ProductTab.module.scss';
import { useEffect } from 'react';
const cx = classNames.bind(styles);

function ProductTab() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCheckout());
  }, [dispatch]);

  const checkout = useSelector(checkoutSelector);
  const { data, loaded } = checkout;
  console.log(data);
  return (
    <Grid container className={cx('wrapper')}>
      <Grid xs={12}>
        <Typography variant="title">Sản phẩm đã mua ({data.length})</Typography>
      </Grid>
      <Grid container xs={12} className={cx('container')}>
        {loaded &&
          data.map((item, index) => {
            return <Product key={item.id} data={item} />;
          })}
      </Grid>
    </Grid>
  );
}

export default ProductTab;

import classNames from 'classnames/bind';
import { Button, Divider, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

import * as productServices from '~/services/productServices';
import Product from './Product';
import styles from './ProductCollection.module.scss';
import { useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);
function ProductCollection() {
  // Gọi 3 Api chỗ này
  const [latestProducts, setLatestProducts] = useState([]);
  const [bestSellerProducts, setBestSellerProducts] = useState([]);
  const [salesProducts, setSalesProducts] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const salesResult = await productServices.getSalesProduct(1, 3);
      const bestseller = await productServices.getBestSellerProduct(1, 3);
      const latestResult = await productServices.getLatestProduct(1, 3);

      setLatestProducts(latestResult.items);
      setBestSellerProducts(bestseller.items);
      setSalesProducts(salesResult.items);
    };
    fetchApi();
  }, []);
  console.log(latestProducts);
  console.log(bestSellerProducts);
  console.log(salesProducts);
  const navigate = useNavigate();
  return (
    <Grid container xs={12} disableEqualOverflow className={cx('wrapper')}>
      <Grid container xs={10} md lg xsOffset={1} mdOffset={0} lgOffset={0} className={cx('container')}>
        <Grid xs={12} className={cx('header')}>
          <Typography variant="h5">Bán chạy</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/products/best-seller');
            }}
          >
            Xem thêm
          </Button>
        </Grid>
        {bestSellerProducts?.map((item) => (
          <Product key={item.gameID} data={item} />
        ))}
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid container xs={10} md lg xsOffset={1} mdOffset={0} lgOffset={0} className={cx('container')}>
        <Grid xs={12} className={cx('header')}>
          <Typography variant="h5">Mới ra mắt</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/products/latest');
            }}
          >
            Xem thêm
          </Button>
        </Grid>
        {latestProducts?.map((item) => (
          <Product key={item.id} data={item} />
        ))}
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />

      <Grid container xs={10} md lg xsOffset={1} mdOffset={0} lgOffset={0} className={cx('container')}>
        <Grid xs={12} className={cx('header')}>
          <Typography variant="h5">Khuyến Mãi</Typography>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/products/specials');
            }}
          >
            Xem thêm
          </Button>
        </Grid>
        {salesProducts?.map((item) => (
          <Product key={item.id} data={item} />
        ))}
      </Grid>

      <Divider orientation="vertical" variant="middle" flexItem />
    </Grid>
  );
}

export default ProductCollection;

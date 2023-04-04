import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';

import WishListItem from './WishListItem';
import { getWishlist, wishlistSelector } from '~/store/reducers/wishlistSlice';
import styles from './WishList.module.scss';
import { Box, Typography } from '@mui/material';
const cx = classNames.bind(styles);

function WishlistContainer() {
  const dispatch = useDispatch();
  const wishlist = useSelector(wishlistSelector);
  const [wishlistData, setWishlistData] = useState([]);
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  useEffect(() => {
    setWishlistData(wishlist.data || []);
  }, [wishlist]);
  return (
    <Grid container xs={12}>
      <Grid xs={12}>
        <Typography variant="title">Danh sách ước ({wishlistData.length})</Typography>
      </Grid>

      <Grid xs={12}>
        <Box className={cx('wishlist-container')}>
          {wishlistData.length > 0 ? (
            wishlistData.map((item, index) => {
              return <WishListItem data={item} key={item.gameID} />;
            })
          ) : (
            <></>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default WishlistContainer;

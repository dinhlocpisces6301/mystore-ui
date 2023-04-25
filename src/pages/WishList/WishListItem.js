import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useNotification } from '~/hooks';
import ToastPortal from '~/components/ToastPortal';
import GenreList from '~/components/GenreList';
import LoadingSpinner from '~/components/LoadingSpinner';
import { getCart, cartSelector } from '~/store/reducers/cartSlice';
import { getWishlist } from '~/store/reducers/wishlistSlice';
import * as cartServices from '~/services/cartServices';
import * as wishlistServices from '~/services/wishlistServices';
import * as imageServices from '~/services/imageServices';
import { currencyFormat } from '~/utils';

import styles from './WishList.module.scss';
import config from '~/config';
const cx = classNames.bind(styles);

function WishListItem({ data }) {
  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const removeItem = async () => {
    setLoading(true);
    const response = await wishlistServices.removeWishlist({ gameID: data.gameID });
    if (response.isSuccess === true) {
      Notify('Xóa thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        dispatch(getWishlist());
      }, 2000);
    }
    if (response.isSuccess === false) {
      Notify('Xóa thất bại', 'error');
      setLoading(false);
    }
  };

  const handleClick = () => {
    removeItem();
  };

  const [loading2, setLoading2] = useState(false);
  const cart = useSelector(cartSelector);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    setCartData(cart.data || []);
  }, [cart]);
  const addToCart = async () => {
    setLoading2(true);
    const response = await cartServices.addToCart({ gameID: data.gameID });
    if (response.isSuccess === true) {
      Notify('Thêm vào giỏ hàng thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading2(false);
        dispatch(getCart());
      }, 3000);
    }
    if (response.isSuccess === false) {
      Notify(response.message, 'error');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading2(false);
      }, 3000);
    }
  };
  const handleAddToCart = () => {
    addToCart();
  };

  return (
    <>
      <Grid container xs={12} className={cx('wishlist-item')}>
        <Grid xs={12} md={3}>
          <Box className={cx('img')}>
            <img src={imageServices.getImage(data.imageList[1])} alt="" className={cx('img')} />
          </Box>
        </Grid>
        <Grid xs={12} md={6} className={cx('wishlist-item-detail')}>
          <Typography variant="subTitle" className={cx('text', 'title')}>
            {data.name}
          </Typography>
          {data.discount > 0 && (
            <Typography variant="origin-price" className={cx('text')}>
              {currencyFormat(data.price)}
            </Typography>
          )}
          <Typography variant="price" className={cx('text')}>
            {currencyFormat(data.price * (1 - data.discount / 100))}
          </Typography>
          <GenreList data={{ genreIDs: data.genreIds, genreName: data.genreName }} />
        </Grid>
        <Grid xs={12} md={3} className={cx('wishlist-item-btn')}>
          {cartData.find((p) => p.id === data.gameID) === undefined ? (
            loading2 ? (
              <Button variant="contained" color="success" disableFocusRipple sx={{ height: '36.5px' }}>
                <LoadingSpinner />
              </Button>
            ) : (
              <Button variant="contained" color="success" onClick={handleAddToCart}>
                Thêm vào giỏ hàng
              </Button>
            )
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                navigate(config.routes.cart);
              }}
            >
              Xem giỏ hàng
            </Button>
          )}
          <Typography>Thêm vào ngày {new Date(data.addedDate).toLocaleDateString(undefined)}</Typography>
          {loading ? (
            <Typography className={cx('remove-btn')}>Xóa</Typography>
          ) : (
            <Typography className={cx('remove-btn')} onClick={handleClick}>
              Xóa
            </Typography>
          )}
        </Grid>
      </Grid>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default WishListItem;

import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import ToastPortal from '~/components/ToastPortal';
import { useNotification } from '~/hooks';
import { getCart } from '~/store/reducers/cartSlice';
import * as cartServices from '~/services/cartServices';
import * as imageServices from '~/services/imageServices';
import { currencyFormat } from '~/utils';

import styles from './Cart.module.scss';
const cx = classNames.bind(styles);

function CartItem({ data }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  const removeItem = async () => {
    setLoading(true);
    const response = await cartServices.removeCart({ id: data.id });
    if (response.isSuccess === true) {
      Notify('Xóa thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        dispatch(getCart());
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
  return (
    <>
      <Grid container xs={12} className={cx('cart-item')}>
        <Grid xs={5}>
          <Box className={cx('img')}>
            <img src={imageServices.getImage(data.imageList[1])} alt="" className={cx('img')} />
          </Box>
        </Grid>
        <Grid xs={6} className={cx('cart-item-detail')}>
          <Typography variant="subTitle">{data.name}</Typography>
          {data.discount > 0 && <Typography variant="origin-price">{currencyFormat(data.price)}</Typography>}
          <Typography variant="price">{currencyFormat(data.price * (1 - data.discount / 100))}</Typography>
        </Grid>
        <Grid xs={1} className={cx('cart-item-btn')}>
          {loading ? (
            <IconButton className={cx('remove-btn')}>
              <DeleteIcon />
            </IconButton>
          ) : (
            <IconButton className={cx('remove-btn')} onClick={handleClick}>
              <DeleteIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default CartItem;

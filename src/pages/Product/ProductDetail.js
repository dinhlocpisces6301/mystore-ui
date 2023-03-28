import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Divider } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';

import { cartSelector, getCart } from '~/store/reducers/cartSlice';
import { getWishlist, wishlistSelector } from '~/store/reducers/wishlistSlice';
import * as cartServices from '~/services/cartServices';
import * as wishlistServices from '~/services/wishlistServices';
import * as imageServices from '~/services/imageServices';
import * as authServices from '~/services/authServices';

import GenreList from '~/components/GenreList';
import ToastPortal from '~/components/ToastPortal';

import { useNotification } from '~/hooks';
import { currencyFormat } from '~/utils';
import config from '~/config';

import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '~/components/LoadingSpinner/LoadingSpinner';
const cx = classNames.bind(styles);

function ProductDetail({ data }) {
  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const [value, setValue] = useState(data);
  useEffect(() => {
    setValue(data);
  }, [data]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const addToCart = async () => {
    setLoading(true);
    const response = await cartServices.addToCart({ gameID: value.id });
    if (response.isSuccess === true) {
      Notify('Add to Cart Successfully');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        dispatch(getCart());
      }, 3000);
    }
    if (response.isSuccess === false) {
      Notify(response.message, 'error');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
      }, 3000);
    }
  };
  const handleAddToCart = () => {
    addToCart();
  };

  const [loading2, setLoading2] = useState(false);
  const addToWishlist = async () => {
    setLoading2(true);
    const response = await wishlistServices.addToWishlist({ gameID: value.id });
    if (response.isSuccess === true) {
      Notify('Thêm vào giỏ hàng thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading2(false);
        dispatch(getWishlist());
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
  const handleAddToWishlist = () => {
    addToWishlist();
  };
  const cart = useSelector(cartSelector);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    setCartData(cart.data || []);
  }, [cart]);

  const wishlist = useSelector(wishlistSelector);
  const [wishlistData, setWishListData] = useState([]);
  useEffect(() => {
    setWishListData(wishlist.data || []);
  }, [wishlist]);

  const isLoggedIn = authServices.isLoggedIn();
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const next = () => {
    if (index !== 3) {
      setIndex(index + 1);
    } else if (index === 3) {
      setIndex(0);
    }
  };
  useEffect(() => {
    const timerId = setInterval(next, 5000);
    return () => {
      clearInterval(timerId);
    };
  });

  return value !== undefined ? (
    <Grid container xs={12}>
      <Grid xs={12} className={cx('header')}>
        <Typography variant="title">{value.name}</Typography>
      </Grid>
      <Grid xs={12} md={7} className={cx('gallery-container')}>
        <Box className={cx('screen')}>
          <img src={imageServices.getImage(value.listImage[1])} alt="" className={index === 0 ? cx('focus') : ''} />
          <img src={imageServices.getImage(value.listImage[2])} alt="" className={index === 1 ? cx('focus') : ''} />
          <img src={imageServices.getImage(value.listImage[3])} alt="" className={index === 2 ? cx('focus') : ''} />
          <img src={imageServices.getImage(value.listImage[4])} alt="" className={index === 3 ? cx('focus') : ''} />
        </Box>
        <Box className={cx('gallery-items')}>
          <img
            src={imageServices.getImage(value.listImage[1])}
            alt=""
            className={index === 0 ? cx('gallery-item', 'focus') : cx('gallery-item')}
            onClick={() => {
              setIndex(0);
            }}
          />
          <img
            src={imageServices.getImage(value.listImage[2])}
            alt=""
            className={index === 1 ? cx('gallery-item', 'focus') : cx('gallery-item')}
            onClick={() => {
              setIndex(1);
            }}
          />
          <img
            src={imageServices.getImage(value.listImage[3])}
            alt=""
            className={index === 2 ? cx('gallery-item', 'focus') : cx('gallery-item')}
            onClick={() => {
              setIndex(2);
            }}
          />
          <img
            src={imageServices.getImage(value.listImage[3])}
            alt=""
            className={index === 3 ? cx('gallery-item', 'focus') : cx('gallery-item')}
            onClick={() => {
              setIndex(3);
            }}
          />
          <Box
            className={cx('arrow-up')}
            sx={{
              left: `${60 + 184 * index}px`,
            }}
          ></Box>
        </Box>
      </Grid>
      <Grid xs={12} md={5} className={cx('detail-container')}>
        <Box className={cx('detail-img')}>
          <img src={imageServices.getImage(value.listImage[1])} alt="" />
        </Box>
        <Box className={cx('detail-content')}>
          <Typography variant="subTitle" className={cx('title')}>
            {value.name}
          </Typography>
          <Divider flexItem />
          {value.discount !== 0 && <Typography variant="origin-price">{currencyFormat(value.price)}</Typography>}
          <Typography variant="price">
            {value.price === 0 ? 'Miễn phí' : currencyFormat(value.price * (1 - value.discount / 100))}
          </Typography>
        </Box>
        <Box className={cx('detail-action')}>
          {isLoggedIn ? (
            <>
              {cartData.find((element) => element.id === value.id) === undefined ? (
                loading ? (
                  <Button variant="contained" color="success" disableFocusRipple sx={{ height: '36.5px' }}>
                    <LoadingSpinner />
                  </Button>
                ) : (
                  <Button variant="contained" color="success" onClick={handleAddToCart}>
                    <AddShoppingCartIcon />
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
                  <AddShoppingCartIcon />
                  Xem giỏ hàng
                </Button>
              )}
              {wishlistData.find((element) => element.gameID === value.id) === undefined ? (
                loading2 ? (
                  <Button variant="contained" disableFocusRipple sx={{ height: '36.5px' }}>
                    <LoadingSpinner />
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleAddToWishlist}>
                    <AddCircleOutlineIcon />
                    Thêm vào wishlist
                  </Button>
                )
              ) : (
                <Button
                  variant="contained"
                  onClick={() => {
                    navigate(config.routes.wishlist);
                  }}
                >
                  <AddCircleOutlineIcon />
                  Xem wishlist
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                navigate('/login');
              }}
            >
              Đăng nhập
            </Button>
          )}
        </Box>
        <Box className={cx('detail-content')}>
          <Divider flexItem />
          <Typography variant="company">Nhà phát hành: {value.publisher || '. . .'}</Typography>
          <Typography variant="company">Ngày ra mắt: 28/09/2019</Typography>
          <Divider flexItem />
        </Box>
      </Grid>
      <Grid xs={12}>
        <Box className={cx('detail-script')}>
          <Divider flexItem variant="middle" />
          <Typography variant="subTitle">{value.description}</Typography>
          <Divider flexItem variant="middle" />
          <Typography variant="subTitle">Thể loại:</Typography>
          <GenreList data={{ genreIDs: value.genreIDs, genreName: value.genreName }} clickable />
          <Divider flexItem variant="middle" />
        </Box>
      </Grid>
      <Grid container xs={12} className={cx('system-requirement-container')}>
        <Grid xs={10} md={6} xsOffset={1} mdOffset={0} className={cx('requirement')}>
          <Typography>
            <strong>Tối thiểu</strong>
          </Typography>

          <Typography>
            Hệ điều hành: <strong>{value.srm.os}</strong>
          </Typography>
          <Typography>
            Nhân: <strong>{value.srm.processor}</strong>
          </Typography>
          <Typography>
            Bộ nhớ: <strong>{value.srm.memory}</strong>
          </Typography>
          <Typography>
            Card đồ họa: <strong>{value.srm.graphics}</strong>
          </Typography>
          <Typography>
            Lưu trữ: <strong>{value.srm.storage}</strong>
          </Typography>
          <Typography>
            Card âm thanh: <strong>{value.srm.soundcard}</strong>
          </Typography>

          <Divider flexItem variant="middle" />
        </Grid>
        <Grid xs={10} md={6} xsOffset={1} mdOffset={0} className={cx('requirement')}>
          <Typography>
            <strong>Khuyến nghị</strong>
          </Typography>

          <Typography>
            Hệ điều hành: <strong>{value.srr.os}</strong>
          </Typography>
          <Typography>
            Nhân: <strong>{value.srr.processor}</strong>
          </Typography>
          <Typography>
            Bộ nhớ: <strong>{value.srr.memory}</strong>
          </Typography>
          <Typography>
            Card đồ họa: <strong>{value.srr.graphics}</strong>
          </Typography>
          <Typography>
            Lưu trữ: <strong>{value.srr.storage}</strong>
          </Typography>
          <Typography>
            Card âm thanh: <strong>{value.srr.soundcard}</strong>
          </Typography>

          <Divider flexItem variant="middle" />
        </Grid>
      </Grid>
      <Grid xs={12} className={cx('conmment-container')}></Grid>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  ) : (
    <></>
  );
}

export default ProductDetail;

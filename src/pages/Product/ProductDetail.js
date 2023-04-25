import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Divider, Skeleton, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { cartSelector, getCart } from '~/store/reducers/cartSlice';
import { getWishlist, wishlistSelector } from '~/store/reducers/wishlistSlice';
import * as cartServices from '~/services/cartServices';
import * as wishlistServices from '~/services/wishlistServices';
import * as imageServices from '~/services/imageServices';
import * as authServices from '~/services/authServices';

import GenreList from '~/components/GenreList';
import ToastPortal from '~/components/ToastPortal';
import LoadingSpinner from '~/components/LoadingSpinner';
import StarsRating from '~/components/StarsRating';
import ProductRating from '~/components/ProductRating';

import { useNotification } from '~/hooks';
import { currencyFormat } from '~/utils';
import config from '~/config';

import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
const cx = classNames.bind(styles);

function ProductDetail({ data }) {
  const [product, setProduct] = useState(data);
  useEffect(() => {
    setProduct(data);
  }, [data]);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const addToCart = async () => {
    setLoading(true);
    const response = await cartServices.addToCart({ gameID: product.id });
    if (response.isSuccess === true) {
      Notify('Thêm vào giỏ hàng thành công');
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
    const response = await wishlistServices.addToWishlist({ gameID: product.id });
    if (response.isSuccess === true) {
      Notify('Thêm vào Wishlist thành công');
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

  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const navigate = useNavigate();
  const isLoggedIn = authServices.isLoggedIn();

  return product !== undefined ? (
    <Grid container xs={12}>
      <Grid xs={12} className={cx('header')}>
        <Typography variant="title" mb={1}>
          {product.name}
        </Typography>
        <StarsRating star={3.7} />
      </Grid>
      <Grid xs={12} md={7} className={cx('gallery-container')}>
        <Box className={cx('screen')}>
          <img src={imageServices.getImage(product.listImage[1])} alt="" className={index === 0 ? cx('focus') : ''} />
          <img src={imageServices.getImage(product.listImage[2])} alt="" className={index === 1 ? cx('focus') : ''} />
          <img src={imageServices.getImage(product.listImage[3])} alt="" className={index === 2 ? cx('focus') : ''} />
          <img src={imageServices.getImage(product.listImage[4])} alt="" className={index === 3 ? cx('focus') : ''} />
        </Box>
        <Box className={cx('gallery-items')}>
          <img
            src={imageServices.getImage(product.listImage[1])}
            alt=""
            className={index === 0 ? cx('gallery-item', 'focus') : cx('gallery-item')}
            onClick={() => {
              setIndex(0);
            }}
          />
          <img
            src={imageServices.getImage(product.listImage[2])}
            alt=""
            className={index === 1 ? cx('gallery-item', 'focus') : cx('gallery-item')}
            onClick={() => {
              setIndex(1);
            }}
          />
          <img
            src={imageServices.getImage(product.listImage[3])}
            alt=""
            className={index === 2 ? cx('gallery-item', 'focus') : cx('gallery-item')}
            onClick={() => {
              setIndex(2);
            }}
          />
          <img
            src={imageServices.getImage(product.listImage[4])}
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
          <img src={imageServices.getImage(product.listImage[0])} alt="" />
        </Box>
        <StarsRating star={3.7} />
        <Box className={cx('detail-content')}>
          <Typography variant="subTitle" className={cx('title')}>
            {product.name}
          </Typography>
          <Divider flexItem />
          {product.discount !== 0 && <Typography variant="origin-price">{currencyFormat(product.price)}</Typography>}
          <Typography variant="price">
            {product.price === 0 ? 'Miễn phí' : currencyFormat(product.price * (1 - product.discount / 100))}
          </Typography>
        </Box>
        <Box className={cx('detail-action')}>
          {isLoggedIn ? (
            <>
              {cartData.find((p) => p.id === product.id) === undefined ? (
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
              {wishlistData.find((p) => p.gameID === product.id) === undefined ? (
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
          <Typography variant="company">Nhà phát hành: {product.publisher || '. . .'}</Typography>
          <Typography variant="company">Ngày ra mắt: 28/09/2019</Typography>
        </Box>
      </Grid>
      <Grid xs={12}>
        <Box className={cx('detail-script')}>
          <Divider flexItem variant="middle" />
          <Typography variant="subTitle">{product.description}</Typography>
          <Divider flexItem variant="middle" />
          <Typography variant="subTitle">Thể loại:</Typography>
          <GenreList data={{ genreIDs: product.genreIDs, genreName: product.genreName }} />
          <Divider flexItem variant="middle" />
        </Box>
      </Grid>
      <Grid container xs={12} className={cx('system-requirement-container')}>
        <Grid xs={10} md={6} xsOffset={1} mdOffset={0} className={cx('requirement')}>
          <Typography>
            <strong>Tối thiểu</strong>
          </Typography>

          <Typography>
            Hệ điều hành: <strong>{product.srm.os}</strong>
          </Typography>
          <Typography>
            Nhân: <strong>{product.srm.processor}</strong>
          </Typography>
          <Typography>
            Bộ nhớ: <strong>{product.srm.memory}</strong>
          </Typography>
          <Typography>
            Card đồ họa: <strong>{product.srm.graphics}</strong>
          </Typography>
          <Typography>
            Lưu trữ: <strong>{product.srm.storage}</strong>
          </Typography>
          <Typography>
            Card âm thanh: <strong>{product.srm.soundcard}</strong>
          </Typography>

          <Divider flexItem variant="middle" />
        </Grid>
        <Grid xs={10} md={6} xsOffset={1} mdOffset={0} className={cx('requirement')}>
          <Typography>
            <strong>Khuyến nghị</strong>
          </Typography>

          <Typography>
            Hệ điều hành: <strong>{product.srr.os}</strong>
          </Typography>
          <Typography>
            Nhân: <strong>{product.srr.processor}</strong>
          </Typography>
          <Typography>
            Bộ nhớ: <strong>{product.srr.memory}</strong>
          </Typography>
          <Typography>
            Card đồ họa: <strong>{product.srr.graphics}</strong>
          </Typography>
          <Typography>
            Lưu trữ: <strong>{product.srr.storage}</strong>
          </Typography>
          <Typography>
            Card âm thanh: <strong>{product.srr.soundcard}</strong>
          </Typography>

          <Divider flexItem variant="middle" />
        </Grid>
      </Grid>
      <Grid xs={12} className={cx('conmment-container')}>
        <ProductRating />
      </Grid>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  ) : (
    <>
      <Skeleton variant="rectangular" height={'100%'} />
    </>
  );
}

export default ProductDetail;

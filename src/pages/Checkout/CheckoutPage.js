import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';

import config from '~/config';
import { currencyFormat } from '~/utils';
import { useNotification } from 'src/hooks';

import ToastPortal from 'src/components/ToastPortal';
import LoadingSpinner from '~/components/LoadingSpinner';
import CheckoutItem from './CheckoutItem';

import { getCart, cartSelector } from 'src/store/reducers/cartSlice';
import * as checkoutServices from 'src/services/checkoutServices';

import styles from './Checkout.module.scss';
const cx = classNames.bind(styles);

function CheckoutPage() {
  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setLoading(true);
    const response = await checkoutServices.checkout();

    if (response.isSuccess === true) {
      Notify('Thánh toán thành công');
      const timerId = setTimeout(() => {
        dispatch(getCart());
        navigate(config.routes.profile);
        clearTimeout(timerId);
      }, 2000);
    }

    if (response.isSuccess === false) {
      Notify('Thánh toán thất bại', 'error');
      setLoading(false);
    }
  };

  const handlePurchaseClick = async () => {
    checkout();
  };

  const handleCancelClick = () => {
    if (!loading) navigate(-1);
  };

  const dispatch = useDispatch();
  const cart = useSelector(cartSelector);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  useEffect(() => {
    setCartData(cart.data || []);
  }, [cart]);

  return (
    <>
      <Grid container xs={12} className={cx('wrapper')}>
        <Grid xs={12}>
          <Typography variant="title">Thanh toán</Typography>
        </Grid>
        <Grid xs={12} md={7} className={cx('items-container')}>
          {cartData.length > 0 ? (
            cartData.map((item) => {
              return <CheckoutItem data={item} key={item.id} />;
            })
          ) : (
            <></>
          )}
        </Grid>
        <Grid xs={12} md={5} className={cx('total-container')}>
          <Typography variant="subTitle">
            Tổng cộng: <strong>{currencyFormat(cartData.reduce((total, current) => total + current.price, 0))}</strong>
          </Typography>
          <Typography variant="subTitle">
            Giảm được:{' '}
            <strong>
              {currencyFormat(cartData.reduce((total, current) => total + (current.price * current.discount) / 100, 0))}
            </strong>
          </Typography>
          <Typography variant="subTitle" color="error">
            Thuế: 0%
          </Typography>
          <Divider variant="middle" flexItem />
          <Typography variant="subTitle">
            Tiền phải thanh toán:{' '}
            <strong>
              {currencyFormat(
                cartData.reduce((total, current) => total + current.price * (1 - current.discount / 100), 0),
              )}
            </strong>
          </Typography>
          <Box className={cx('btn-container')}>
            {
              <Button variant="contained" color="error" onClick={handleCancelClick}>
                Hủy
              </Button>
            }

            {cartData.length > 0 ? (
              loading ? (
                <Button variant="contained" color="success" disabled sx={{ height: '36.5px', width: '150px' }}>
                  <LoadingSpinner />
                </Button>
              ) : cartData.reduce((total, current) => total + current.price * (1 - current.discount / 100), 0) === 0 ? (
                <Button
                  variant="contained"
                  color="success"
                  className={cx('checkout-btn')}
                  onClick={handlePurchaseClick}
                >
                  Lấy miễn phí
                </Button>
              ) : (
                <Box className={cx('paypal-btn')}>
                  <PayPalScriptProvider
                    options={{
                      'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
                      components: 'buttons',
                      currency: 'USD',
                    }}
                  >
                    <PayPalButtons
                      style={{
                        layout: 'horizontal',
                        color: 'blue',
                        shape: 'rect',
                        height: 36.5,
                        label: 'paypal',
                      }}
                      createOrder={async (data, actions) => {
                        const total = cartData.reduce(
                          (total, current) => total + current.price * (1 - current.discount / 100),
                          0,
                        );
                        const convertedCurrency = total / 24000;
                        const roundedTotal = Math.round(convertedCurrency * 100) / 100;
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: roundedTotal,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={async (data, actions) => {
                        // Your code here after capture the order
                        const order = await actions.order.capture();
                        console.log(order);
                        handlePurchaseClick();
                      }}
                      onError={(err) => {
                        console.error('error from the onError callback', err);
                      }}
                    />
                  </PayPalScriptProvider>
                </Box>
              )
            ) : (
              <></>
            )}
          </Box>
        </Grid>
      </Grid>
      <ToastPortal ref={toastRef} autoClose={true} />
    </>
  );
}

export default CheckoutPage;

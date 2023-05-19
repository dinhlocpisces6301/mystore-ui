import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, TextField, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Cookies from 'js-cookie';

import * as authServices from '~/services/authServices';
import config from '~/config';
import { useNotification } from '~/hooks';
import ToastPortal from '~/components/ToastPortal/ToastPortal';
import LoadingSpinner from '~/components/LoadingSpinner';

import styles from './LoginForm.module.scss';
const cx = classNames.bind(styles);

function LoginForm() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [otp, setOTP] = useState('');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  const handleLogin = async () => {
    const response = await authServices.OTPCheck({
      userName: usernameInput,
      password: passwordInput,
    });

    if (response) {
      if (show) OTPlogin();
      setShow(true);
    } else {
      setShow(false);
      login();
    }
  };

  const login = async () => {
    setLoading(true);
    // Make Api call
    const response = await authServices.login({
      userName: usernameInput,
      password: passwordInput,
      rememberMe: false,
    });

    if (response.isSuccess === false) {
      setLoading(false);
      Notify(response.message, 'error');
    }

    if (response.isSuccess === true) {
      Cookies.set('jwt', response.resultObj.token, { expires: 30 / 1440, secure: true });
      Cookies.set('user-id', response.resultObj.userId, { expires: 30 / 1440, secure: true });
      Notify('Đăng nhập thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        navigate(config.routes.home, { replace: true });
      }, 2000);
    }
  };

  const OTPlogin = async () => {
    setLoading(true);
    // Make Api call
    const response = await authServices.OTPlogin({
      userName: usernameInput,
      password: passwordInput,
      code: otp,
      rememberMe: false,
    });

    if (response.isSuccess === false) {
      setLoading(false);
      Notify(response.message, 'error');
    }

    if (response.isSuccess === true) {
      Cookies.set('jwt', response.resultObj.token, { expires: 30 / 1440, secure: true });
      Cookies.set('user-id', response.resultObj.userId, { expires: 30 / 1440, secure: true });
      Notify('Đăng nhập thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        navigate(config.routes.home, { replace: true });
      }, 2000);
    }
  };

  const handleClick = () => {
    var msg = '';
    if (usernameInput === '') {
      msg = 'Vui lòng nhập Tên tài khoản';
      if (passwordInput === '') {
        msg = 'Vui lòng nhập đầy đủ thông tin';
      }
      Notify(msg, 'warning');
      return;
    }
    if (passwordInput === '') {
      msg = 'Mật khẩu chưa được nhập';
      Notify(msg, 'warning');
      return;
    }
    if (passwordInput.length < 6) {
      msg = 'Mật khẩu phải ít nhất 6 ký tự';
      Notify(msg, 'warning');
      return;
    }

    handleLogin();
  };

  return (
    <Grid xs={12} md={4} xsOffset={0} mdOffset={4}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Typography variant="title">Đăng nhập</Typography>
        <FormControl>
          <TextField
            id="username"
            label="Tên người dùng"
            value={usernameInput}
            onChange={(e) => {
              setUsernameInput(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="password"
            label="Mật khẩu"
            type="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.currentTarget.value);
            }}
          />
        </FormControl>
        {show && (
          <FormControl>
            <TextField
              id="otp"
              label="Mã OTP"
              value={otp}
              onChange={(e) => {
                setOTP(e.currentTarget.value);
              }}
            />
          </FormControl>
        )}
        {loading ? (
          <>
            <Button variant="contained" color="error" disabled sx={{ height: '36.5px' }}>
              <LoadingSpinner />
            </Button>
          </>
        ) : (
          <Button variant="contained" color="error" onClick={handleClick}>
            Đăng nhập
          </Button>
        )}
        <Link to={config.routes.forgetPassword}>Quên Mật khẩu?</Link>
        <Link to={config.routes.confirm}>Kích hoạt Tài khoản tại đây.</Link>
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default LoginForm;

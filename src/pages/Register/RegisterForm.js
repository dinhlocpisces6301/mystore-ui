import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, TextField, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import * as authServices from '~/services/authServices';
import config from '~/config';
import { useNotification } from '~/hooks';
import ToastPortal from '~/components/ToastPortal/ToastPortal';
import LoadingSpinner from '~/components/LoadingSpinner';

import styles from './RegisterForm.module.scss';
const cx = classNames.bind(styles);

function RegisterForm() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rePasswordInput, setRePasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  const register = async () => {
    setLoading(true);
    // Make Api call
    const response = await authServices.register({
      email: emailInput,
      userName: usernameInput,
      password: passwordInput,
      confirmPassword: rePasswordInput,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify(response.message, 'error');
    }
    if (response.isSuccess === true) {
      Notify('Đăng ký thành công, vui lòng thực hiện bước xác nhận');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        navigate(config.routes.confirm, { replace: true });
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
    if (passwordInput !== rePasswordInput) {
      msg = 'Mật khẩu không khớp';
      Notify(msg, 'warning');
      return;
    }
    if (emailInput === '') {
      msg = 'Vui lòng nhập Email';
      Notify(msg, 'warning');
      return;
    }

    var emailRegex = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    if (emailRegex.test(emailInput) === false) {
      msg = 'Email không đúng, hãy thử lại';
      Notify(msg, 'warning');
      return;
    }
    register();
  };

  return (
    <Grid xs={12} md={6} xsOffset={0} mdOffset={3}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Typography variant="title">Đăng ký</Typography>
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
            id="email"
            label="Email"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.currentTarget.value);
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
        <FormControl>
          <TextField
            id="confirm-password"
            label="Xác nhận Mật khẩu"
            type="password"
            value={rePasswordInput}
            onChange={(e) => {
              setRePasswordInput(e.currentTarget.value);
            }}
          />
        </FormControl>
        {loading ? (
          <Button variant="contained" disabled sx={{ height: '36.5px' }}>
            <LoadingSpinner />
          </Button>
        ) : (
          <Button variant="contained" onClick={handleClick}>
            Đăng ký
          </Button>
        )}
        <Link to={config.routes.login}>Quay về đăng nhập</Link>
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default RegisterForm;

import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, FormControl, TextField, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import * as userServices from '~/services/userServices';
import config from '~/config';
import { useNotification } from '~/hooks';
import ToastPortal from '~/components/ToastPortal/ToastPortal';
import LoadingSpinner from '~/components/LoadingSpinner/';

import styles from './ForgetPasswordForm.module.scss';
const cx = classNames.bind(styles);

function ForgetPasswordForm() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rePasswordInput, setRePasswordInput] = useState('');
  const [confirmCodeInput, setConfirmCodeInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  const getConfirmCode = async () => {
    setLoading2(true);
    const response = await userServices.getConfirmCode({
      userName: usernameInput,
    });
    if (response.isSuccess === false) {
      setLoading2(false);
      Notify(response.message, 'error');
    }
    if (response.isSuccess === true) {
      setLoading2(false);
      Notify('Mã xác nhận đã được gửi đến Email của bạn');
    }
  };
  const handleGetConfirmCode = () => {
    var msg = '';
    if (usernameInput === '') {
      msg = 'Vui lòng nhập Tên tài khoản';
      Notify(msg, 'warning');
      return;
    }
    getConfirmCode();
  };

  const editPassword = async () => {
    setLoading(true);
    const response = await userServices.forgotPassword({
      userName: usernameInput,
      email: emailInput,
      newPassword: passwordInput,
      confirmCode: confirmCodeInput,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify(response.message, 'error');
    }
    if (response.isSuccess === true) {
      Notify('Mật khẩu được đổi thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        navigate(config.routes.login, { replace: true });
      }, 2000);
    }
  };
  const handleClick = () => {
    var msg = '';
    if (usernameInput === '') {
      msg = 'Vui lòng nhập Tên tài khoản';
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
      msg = 'Email không hợp lệ';
      Notify(msg, 'warning');
      return;
    }
    if (confirmCodeInput === '') {
      msg = 'Vui lòng nhập mã xác nhận';
      Notify(msg, 'warning');
      return;
    }
    if (passwordInput === '') {
      msg = 'Vui lòng nhập Mật khẩu mới';
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
    editPassword();
  };

  return (
    <Grid xs={12} md={6} xsOffset={0} mdOffset={3}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Typography variant="title">Quên mật khẩu</Typography>
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
        <Box className={cx('confirm-code')}>
          <FormControl>
            <TextField
              id="confirm-code"
              label="Mã xác nhận"
              value={confirmCodeInput}
              onChange={(e) => {
                setConfirmCodeInput(e.currentTarget.value);
              }}
              className={cx('confirm-code-input')}
            />
          </FormControl>
          {loading2 ? (
            <Button variant="contained" color="secondary" disabled sx={{ height: '36.5px', width: '85.02px' }}>
              <LoadingSpinner />
            </Button>
          ) : (
            <Button variant="contained" color="secondary" onClick={handleGetConfirmCode}>
              Lấy mã
            </Button>
          )}
        </Box>
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
            label="Mật khẩu mới"
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
          <Button variant="contained" disabled sx={{ height: '36.5' }}>
            <LoadingSpinner />
          </Button>
        ) : (
          <Button variant="contained" onClick={handleClick}>
            Xác Nhận
          </Button>
        )}
        <Link to={config.routes.login}>Quay về đăng nhập</Link>
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default ForgetPasswordForm;

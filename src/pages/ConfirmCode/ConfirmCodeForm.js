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

import styles from './ConfirmCodeForm.module.scss';
const cx = classNames.bind(styles);

function ConfirmCodeForm() {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
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

  const confirmAccount = async () => {
    setLoading(true);
    const response = await userServices.confirmCode({
      userName: usernameInput,
      password: passwordInput,
      confirmCode: confirmCodeInput,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify(response.message, 'error');
    }
    if (response.isSuccess === true) {
      Notify('Thành công, bạn có thể đăng nhập');
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
    if (confirmCodeInput === '') {
      msg = 'Vui lòng nhập mã xác nhận';
      Notify(msg, 'warning');
      return;
    }
    confirmAccount();
  };

  return (
    <Grid xs={12} md={6} xsOffset={0} mdOffset={3}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Typography variant="title">Xác minh tài khoản</Typography>
        <Typography variant="subTitle">Thực hiện bước này để hoàn thành việc đăng ký </Typography>
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
            id="password"
            label="Mật khẩu"
            type="password"
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.currentTarget.value);
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

export default ConfirmCodeForm;

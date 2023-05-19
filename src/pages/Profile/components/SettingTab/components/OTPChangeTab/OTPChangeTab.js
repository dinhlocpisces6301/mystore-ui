import classNames from 'classnames/bind';
import { Box, Button, FormControl, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { useNotification } from '~/hooks';
import { userSelector } from '~/store/reducers/userSlice';
import * as authServices from '~/services/authServices';

import LoadingSpinner from '~/components/LoadingSpinner';
import ToastPortal from '~/components/ToastPortal';

import styles from './OTPChangeTab.module.scss';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
const cx = classNames.bind(styles);

function OTPChangeTab() {
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);
  const [QRImage, setQRImage] = useState('');
  const [show, setShow] = useState(false);
  const user = useSelector(userSelector);

  const { data } = user;
  const getQR = async () => {
    const response = await authServices.GetQR({ userName: data.userName, password: password });
    if (response) {
      const imageObjectURL = URL.createObjectURL(response);
      setQRImage(imageObjectURL);
    }
  };
  const OTPTurnOn = async () => {
    setLoading(true);
    const response = await authServices.OTPTurnOn({ email: data.email, password: password });
    if (response) {
      Notify('Bật thành Công');
      setShow(true);
    } else {
      Notify('Có lỗi xảy ra', 'error');
    }
    setLoading(false);
  };
  const OTPTurnOff = async () => {
    setLoading(true);
    const response = await authServices.OTPTurnOff({ email: data.email, password: password });
    if (response) {
      Notify('Tắt thành Công');
      setShow(false);
      setQRImage('');
    } else {
      Notify('Có lỗi xảy ra', 'error');
    }
    setLoading(false);
  };

  const handleClick = () => {
    if (password === '') {
      Notify('Vui lòng nhập mật khẩu', 'warning');
      return;
    }
    if (checked) {
      OTPTurnOn();
    } else {
      OTPTurnOff();
    }
  };

  const handleGetQR = () => {
    getQR();
  };
  const handleLogout = () => {
    authServices.logout();
    const timerId = setTimeout(() => {
      clearTimeout(timerId);
      navigate(config.routes.login, { replace: true });
    }, 2000);
  };
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  useEffect(() => {
    return () => {
      setQRImage('');
    };
  }, []);

  return (
    <Grid xs={12}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Box>
          <FormControlLabel
            value="start"
            control={<Switch color="success" checked={checked} onChange={handleChange} />}
            label="Kích hoạt OTP"
            labelPlacement="end"
          />
        </Box>
        <FormControl>
          <label>Mật khẩu</label>
          <TextField
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </FormControl>
        {loading ? (
          <>
            <Button variant="contained" color="error" disabled sx={{ height: '36.5px' }}>
              <LoadingSpinner />
            </Button>
          </>
        ) : (
          <Button variant="contained" color="error" onClick={handleClick}>
            Xác nhận
          </Button>
        )}
        {show && (
          <Button variant="contained" color="primary" onClick={handleGetQR}>
            Lấy mã
          </Button>
        )}
      </Box>
      {QRImage && show && (
        <>
          <Box>
            <Typography variant="subTitle" align="left" margin={4}>
              Để sử dụng tính năng này hãy sử các app Authenticator để quét mă QR bên dưới:
            </Typography>
            <img src={QRImage} alt="qr-code" className={cx('img')} />
            <Typography variant="subTitle" align="left" margin={4}>
              Hãy chắc chắn đã quét QR thành công trước khi đăng xuất
            </Typography>
          </Box>
          <Box className={cx('container')}>
            <Button variant="contained" color="error" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </Box>
        </>
      )}

      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default OTPChangeTab;

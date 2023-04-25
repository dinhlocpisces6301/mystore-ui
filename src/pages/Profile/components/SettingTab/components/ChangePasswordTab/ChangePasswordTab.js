import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Box, Button, FormControl, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { useNotification } from '~/hooks';
import * as userServices from '~/services/userServices';
import * as authServices from '~/services/authServices';

import LoadingSpinner from '~/components/LoadingSpinner';
import ToastPortal from '~/components/ToastPortal';

import styles from './ChangePasswordTab.module.scss';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userSelector } from '~/store/reducers/userSlice';
import config from '~/config';
const cx = classNames.bind(styles);

function ChangePasswordTab() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const user = useSelector(userSelector);
  const { data } = user;

  const editPassword = async () => {
    setLoading(true);
    const response = await userServices.changePassword({
      userName: data.userName,
      password: password,
      newPassword: newPassword,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify(response.message, 'error');
    }
    if (response.isSuccess === true) {
      Notify('Thay đổi thành công');
      const timerId = setTimeout(() => {
        clearTimeout(timerId);
        setLoading(false);
        authServices.logout();
        navigate(config.routes.login, { replace: true });
      }, 2000);
    }
  };

  const handleClick = () => {
    var msg = '';
    if (password === '') {
      msg = 'Vui lòng điền mật khẩu';
      Notify(msg, 'warning');
      return;
    }
    if (newPassword.length < 6) {
      msg = 'Mật khẩu phải ít nhất 6 ký tự';
      Notify(msg, 'warning');
      return;
    }
    if (newPassword !== reNewPassword) {
      msg = 'Mật khẩu không khớp';
      Notify(msg, 'warning');
      return;
    }
    editPassword();
  };

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  return (
    <Grid xs={12}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <FormControl>
          <label>Mật khẩu cũ</label>
          <TextField
            id="password"
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl>
          <label>Mật khẩu mới</label>
          <TextField
            id="newpassword"
            value={newPassword}
            type="password"
            onChange={(e) => {
              setNewPassword(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl>
          <label>Xác nhận mật khẩu</label>
          <TextField
            id="re-newpassword"
            value={reNewPassword}
            type="password"
            onChange={(e) => {
              setReNewPassword(e.currentTarget.value);
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
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default ChangePasswordTab;

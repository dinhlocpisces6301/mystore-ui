import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, FormControl, TextField, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import config from '~/config';
import { useNotification } from '~/hooks';
import ToastPortal from '~/components/ToastPortal/ToastPortal';
import styles from './ForgetPasswordForm.module.scss';

const cx = classNames.bind(styles);

function ForgetPasswordForm() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rePasswordInput, setRePasswordInput] = useState('');
  const [confirmCodeInput, setConfirmCodeInput] = useState('');
  const toastRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const Notify = useNotification(toastRef);

  return (
    <Grid xs={12} md={6} xsOffset={0} mdOffset={3}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Typography variant="title">Quên mật khẩu</Typography>
        <FormControl>
          <TextField
            id="component-outlined"
            label="Tên người dùng hoặc Email"
            defaultValue=""
            value={usernameInput}
            onChange={(e) => {
              setUsernameInput(e.currentTarget.value);
            }}
          />
        </FormControl>
        <Box className={cx('confirm-code')}>
          <FormControl>
            <TextField
              id="component-outlined"
              label="Mã xác nhận"
              defaultValue=""
              value={confirmCodeInput}
              onChange={(e) => {
                setConfirmCodeInput(e.currentTarget.value);
              }}
              className={cx('confirm-code-input')}
            />
          </FormControl>
          <Button variant="contained" color="error">
            Lấy mã
          </Button>
        </Box>
        <FormControl>
          <TextField
            id="component-outlined"
            label="Mật khẩu"
            type="password"
            defaultValue=""
            value={passwordInput}
            onChange={(e) => {
              setPasswordInput(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="component-outlined"
            label="Xác nhận Mật khẩu"
            type="password"
            defaultValue=""
            value={rePasswordInput}
            onChange={(e) => {
              setRePasswordInput(e.currentTarget.value);
            }}
          />
        </FormControl>
        <Button variant="contained">Xác Nhận</Button>
        <Link to={config.routes.login}>Quay về đăng nhập</Link>
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default ForgetPasswordForm;

import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, FormControl, TextField, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import config from '~/config';
import { useNotification } from '~/hooks';
import ToastPortal from '~/components/ToastPortal/ToastPortal';
import styles from './LoginForm.module.scss';
const cx = classNames.bind(styles);

function LoginForm() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const toastRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const Notify = useNotification(toastRef);

  return (
    <Grid xs={12} md={6} xsOffset={0} mdOffset={3}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Typography variant="title">Đăng nhập</Typography>
        <FormControl>
          <TextField
            id="component-outlined"
            label="Tên người dùng"
            defaultValue=""
            value={usernameInput}
            onChange={(e) => {
              setUsernameInput(e.currentTarget.value);
            }}
          />
        </FormControl>
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
        <Button variant="contained" color="error">
          Đăng nhập
        </Button>
        <Link to={config.routes.forgetPassword}>Bạn quên mật khẩu?</Link>
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default LoginForm;

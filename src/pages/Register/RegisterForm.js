import classNames from 'classnames/bind';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, FormControl, TextField, Typography, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import config from '~/config';
import { useNotification } from '~/hooks';
import ToastPortal from '~/components/ToastPortal/ToastPortal';
import styles from './RegisterForm.module.scss';
const cx = classNames.bind(styles);

function RegisterForm() {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [rePasswordInput, setRePasswordInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const toastRef = useRef();
  // eslint-disable-next-line no-unused-vars
  const Notify = useNotification(toastRef);

  return (
    <Grid xs={12} md={6} xsOffset={0} mdOffset={3}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Typography variant="title">Đăng ký</Typography>
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
            label="Email"
            defaultValue=""
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.currentTarget.value);
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
        <Button variant="contained">Đăng ký</Button>
        <Link to={config.routes.login}>Quay về đăng nhập</Link>
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default RegisterForm;

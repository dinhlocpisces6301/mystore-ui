import classNames from 'classnames/bind';
import { Box, Button, FormControl, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNotification } from '~/hooks';
import { getUserData, userSelector } from '~/store/reducers/userSlice';
import * as userServices from '~/services/userServices';

import LoadingSpinner from '~/components/LoadingSpinner';
import ToastPortal from '~/components/ToastPortal';

import styles from './OTPChangeTab.module.scss';
const cx = classNames.bind(styles);

function OTPChangeTab() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleClick = () => {};
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

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
        {checked && (
          <>
            <FormControl>
              <label>Email</label>
              <TextField
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.currentTarget.value);
                }}
              />
            </FormControl>
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
          </>
        )}
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
      <Box>
        <Typography variant="subTitle">Để sử dụng tính năng này</Typography>
      </Box>

      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default OTPChangeTab;

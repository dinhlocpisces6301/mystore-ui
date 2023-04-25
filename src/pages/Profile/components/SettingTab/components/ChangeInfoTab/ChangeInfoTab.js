import classNames from 'classnames/bind';
import { Box, Button, FormControl, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useNotification } from '~/hooks';
import { getUserData, userSelector } from '~/store/reducers/userSlice';
import * as userServices from '~/services/userServices';

import LoadingSpinner from '~/components/LoadingSpinner';
import ToastPortal from '~/components/ToastPortal';

import styles from './ChangeInfoTab.module.scss';
const cx = classNames.bind(styles);

function ChangeInfoTab() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [dob, setDob] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const user = useSelector(userSelector);

  const { data } = user;
  useEffect(() => {
    if (data !== undefined) {
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDob(data.dob);
      setphoneNumber(data.phoneNumber);
    }
  }, [data]);

  const editProfile = async () => {
    setLoading(true);
    const response = await userServices.editProfile({
      id: data.id,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dob: dob,
      email: data.email,
      phoneNumber: phoneNumber,
    });

    if (response.isSuccess === false) {
      setLoading(false);
      Notify(response.message, 'error');
    }

    if (response.isSuccess === true) {
      const timerId = setTimeout(() => {
        dispatch(getUserData());
        clearTimeout(timerId);
        Notify('Thay đổi thành công');
        setLoading(false);
      }, 1000);
    }
  };

  const handleClick = () => {
    editProfile();
  };

  const toastRef = useRef();
  const Notify = useNotification(toastRef);

  return (
    <Grid xs={12}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <FormControl>
          <label>Họ</label>
          <TextField
            id="lastname"
            value={lastName}
            onChange={(e) => {
              setLastName(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl>
          <label>Tên</label>
          <TextField
            id="firstname"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl>
          <label>Ngày sinh</label>
          <TextField
            id="dob"
            value={new Date(dob).toLocaleDateString('en-CA') || '1990/01/01'}
            onChange={(e) => {
              setDob(e.currentTarget.value);
            }}
            type="date"
          />
        </FormControl>
        <FormControl>
          <label>Số điện thoại</label>
          <TextField
            id="phone"
            value={phoneNumber}
            onChange={(e) => {
              setphoneNumber(e.currentTarget.value);
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

export default ChangeInfoTab;

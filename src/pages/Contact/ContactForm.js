import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Box, Button, FormControl, TextField } from '@mui/material';

import LoadingSpinner from '~/components/LoadingSpinner';
import ToastPortal from '~/components/ToastPortal';
import { useNotification } from '~/hooks';
import * as contactServices from '~/services/contactServices';

import { userSelector } from '~/store/reducers/userSlice';

import classNames from 'classnames/bind';
import styles from './ContactForm.module.scss';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles);

function ContactForm() {
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const userInfo = useSelector(userSelector);
  const [userData, setUserData] = useState({
    email: '',
  });
  useEffect(() => {
    if (userInfo.data !== undefined) {
      setUserData(userInfo.data);
      setEmail(userData.email || '');
    }
  }, [userInfo, userData.email]);

  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const makeContact = async () => {
    setLoading(true);

    const response = await contactServices.contact({
      title: title,
      email: email,
      content: content,
    });
    if (response.isSuccess === false) {
      setLoading(false);
      Notify(response.message, 'error');
    }
    if (response.isSuccess === true) {
      Notify('Gửi phản hồi thành công');
      const timerId = setTimeout(() => {
        setTitle('');
        setContent('');
        setLoading(false);
        inputRef.current.focus();
        clearTimeout(timerId);
      }, 3000);
    }
  };

  const handleClick = () => {
    var msg = '';
    if (email === '') {
      msg = 'Vui lòng nhập Email';
      Notify(msg, 'warning');
      return;
    }
    if (title === '') {
      msg = 'Vui lòng nhập tiêu đề';
      Notify(msg, 'warning');
      return;
    }
    if (content === '') {
      msg = 'Vui lòng nhập nội dung phản hồi';
      Notify(msg, 'warning');
      return;
    }
    var emailRegex = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
    if (emailRegex.test(email) === false) {
      msg = 'Email không hợp lệ';
      Notify(msg, 'warning');
      return;
    }

    makeContact();
  };

  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <Grid xs={12} md={8} xsOffset={0} mdOffset={2}>
      <Box className={cx('container')} component="form" noValidate autoComplete="off">
        <Typography variant="title">Phản hồi</Typography>
        <FormControl>
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.currentTarget.value);
            }}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="title"
            label="Tiêu đề"
            value={title}
            onChange={(e) => {
              setTitle(e.currentTarget.value);
            }}
            ref={inputRef}
          />
        </FormControl>
        <FormControl>
          <TextField
            id="content"
            label="Nội dung"
            multiline
            rows={6}
            value={content}
            onChange={(e) => {
              setContent(e.currentTarget.value);
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
            Gửi
          </Button>
        )}
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Grid>
  );
}

export default ContactForm;

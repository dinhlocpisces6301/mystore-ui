import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

import config from '~/config';
import LoadingSpinner from '~/components/LoadingSpinner';
import styles from './NotFound.module.scss';

const cx = classNames.bind(styles);

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box className={cx('wrapper')}>
      <img src={process.env.PUBLIC_URL + '/images/notfound.jpg'} alt="Not Found" className={cx('img')} />
      <Typography variant="subTitle">KHÔNG TÌM THẤY TRANG</Typography>
      <LoadingSpinner />
      <Button
        variant="contained"
        color="error"
        className={cx('btn')}
        onClick={() => navigate(config.routes.home, { replace: true })}
      >
        Về Trang chủ
      </Button>
    </Box>
  );
}

export default NotFound;

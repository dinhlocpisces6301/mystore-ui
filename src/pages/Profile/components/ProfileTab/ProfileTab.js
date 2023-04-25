import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import CakeIcon from '@mui/icons-material/Cake';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import PersonIcon from '@mui/icons-material/Person';

import { userSelector } from '~/store/reducers/userSlice';
import styles from './ProfileTab.module.scss';
import { Box } from '@mui/material';
const cx = classNames.bind(styles);

function ProfileTab() {
  const user = useSelector(userSelector);
  const { data } = user;

  return (
    <Grid container xs={12} className={cx('wrapper')}>
      <Grid xs={12}>
        <Typography variant="title">Thông tin người dùng</Typography>
      </Grid>
      <Grid xs={12} className={cx('container')}>
        <Box className={cx('line')}>
          <PersonIcon />
          <Typography variant="subTitle" className={cx('label')}>
            Họ và Tên:
          </Typography>
          <Typography variant="subTitle">{`${data.lastName || ''} ${data.firstName || ''}`}</Typography>
        </Box>
        <Box className={cx('line')}>
          <CakeIcon />
          <Typography variant="subTitle" className={cx('label')}>
            Ngày sinh:
          </Typography>
          <Typography variant="subTitle">{new Date(data.dob).toLocaleDateString(undefined)}</Typography>
        </Box>
        <Box className={cx('line')}>
          <MailIcon />
          <Typography variant="subTitle" className={cx('label')}>
            Email:
          </Typography>
          <Typography variant="subTitle">{data.email}</Typography>
        </Box>
        <Box className={cx('line')}>
          <PhoneIcon />
          <Typography variant="subTitle" className={cx('label')}>
            Số điện thoại:
          </Typography>
          <Typography variant="subTitle">{data.phoneNumber}</Typography>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProfileTab;

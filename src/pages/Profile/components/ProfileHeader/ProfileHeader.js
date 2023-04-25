import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, IconButton, Typography } from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useSelector } from 'react-redux';

import { userSelector } from '~/store/reducers/userSlice';
import * as imageServices from '~/services/imageServices';

import styles from './ProfileHeader.module.scss';
const cx = classNames.bind(styles);

function ProfileHeader() {
  const user = useSelector(userSelector);
  const { data, loaded } = user;

  return (
    loaded && (
      <Grid container xs className={cx('wrapper')}>
        <Grid xs={12} container>
          <img alt="thumbnail" src={imageServices.getImage(data.thumbnailPath)} className={cx('thumbnail-img')} />
        </Grid>
        <Box className={cx('user-detail')}>
          <img alt="avatar" src={imageServices.getImage(data.avatarPath)} className={cx('avatar-img')} />
          <Box className={cx('user-name')}>
            <Typography variant="subTitle">{data.userName}</Typography>
            <Typography variant="subTitle">{`(${data.firstName} ${data.lastName})`}</Typography>
          </Box>
          <IconButton className={cx('btn')}>
            <PhotoCameraIcon />
          </IconButton>
          <Button variant="contained" startIcon={<PhotoCameraIcon />} className={cx('thumbnail-btn')}>
            Chỉnh sửa
          </Button>
        </Box>
      </Grid>
    )
  );
}

export default ProfileHeader;

import classNames from 'classnames/bind';
import { Box, Typography } from '@mui/material';

import StarsRating from '../StarsRating/StarsRating';
import * as userServices from '~/services/userServices';
import * as imageServices from '~/services/imageServices';

import styles from './ProductRating.module.scss';
import { useEffect, useState } from 'react';
const cx = classNames.bind(styles);

function Comment({ data }) {
  const userId = data.userId;
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await userServices.getUserData(userId);
      setUserData(result.resultObj);
    };

    fetchApi();
  }, [userId]);

  return (
    <Box className={cx('comment')}>
      {userData !== undefined && (
        <Box className={cx('user-detail')}>
          <img src={imageServices.getImage(data.avatar)} alt="" />
          <Typography variant="subTitle">{userData.userName}</Typography>
        </Box>
      )}
      <StarsRating star={data.rating} />
      <Typography>{data.content}</Typography>
    </Box>
  );
}

export default Comment;

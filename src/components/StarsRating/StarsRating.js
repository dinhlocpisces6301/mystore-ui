import classNames from 'classnames/bind';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import styles from './StarsRating.module.scss';
const cx = classNames.bind(styles);

function StarsRating({ star = 0 }) {
  const starRating = Array.from({ length: 5 }).map((item, index) => {
    const number = index + 0.5;

    return (
      <span key={index} className={cx('icon')}>
        {star >= index + 1 ? <StarIcon /> : star >= number ? <StarHalfIcon /> : <StarOutlineIcon />}
      </span>
    );
  });

  return (
    <Box className={cx('wrapper')}>
      <Box className={cx('container')}>{starRating}</Box>
      <Typography>{`(${star})`}</Typography>
    </Box>
  );
}

export default StarsRating;

import classNames from 'classnames/bind';
import { Box, Button, FormControl, IconButton, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';

import styles from './ProductRating.module.scss';
import { useState } from 'react';
const cx = classNames.bind(styles);

function ProductRating() {
  const [star, setStar] = useState(0);
  const [value, setValue] = useState('');

  const starRating = Array.from({ length: 5 }).map((item, index) => {
    return (
      <IconButton key={index} className={cx('btn')} onClick={() => setStar(index + 1)}>
        {star >= index + 1 ? <StarIcon /> : <StarOutlineIcon />}
      </IconButton>
    );
  });
  return (
    <Box className={cx('wrapper')}>
      <Box className={cx('container')}>
        <Typography variant="subTitle">Đánh giá:</Typography>
        <Box className={cx('btn-container')}>{starRating}</Box>
        <Typography>{`(${star})`}</Typography>
      </Box>
      <FormControl>
        <TextField
          multiline
          rows={4}
          value={value}
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
        />
      </FormControl>
      <Button variant="contained" className={cx('rating-btn')}>
        Đánh giá
      </Button>
    </Box>
  );
}

export default ProductRating;

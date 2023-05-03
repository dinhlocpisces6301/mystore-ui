import { Fragment, useEffect, useRef, useState } from 'react';
import classNames from 'classnames/bind';
import { Box, Button, FormControl, IconButton, TextField, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import Cookies from 'js-cookie';

import { useNotification } from '~/hooks';
import * as productServices from '~/services/productServices';
import ToastPortal from '../ToastPortal';
import Comment from './Comment';

import styles from './ProductRating.module.scss';
const cx = classNames.bind(styles);

function ProductRating({ productId }) {
  const [data, setData] = useState([]);
  const [value, setValue] = useState('');
  const [star, setStar] = useState(5);
  const _productId = productId;

  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getProductComment(_productId);
      setData(result.items);
    };

    fetchApi();
  }, [_productId]);

  const userId = Cookies.get('user-id');
  const myComment = data.find((c) => c.userId === userId);
  useEffect(() => {
    if (myComment) {
      setStar(myComment.rating);
      setValue(myComment.content);
    }
  }, [userId, myComment]);

  const toastRef = useRef();
  const Notify = useNotification(toastRef);
  const rating = async () => {
    const response = await productServices.rating({
      userId: userId,
      gameId: _productId,
      content: value,
      point: star,
    });
    if (response === undefined) Notify('Bạn chưa mua sản phẩm này!', 'error');
  };

  const handleRating = () => {
    rating();
  };

  return (
    <Box className={cx('wrapper')}>
      {userId !== undefined && (
        <>
          <Box className={cx('container')}>
            <Typography variant="subTitle">Đánh giá:</Typography>
            <Box className={cx('btn-container')}>
              {Array.from({ length: 5 }).map((item, index) => {
                return (
                  <IconButton
                    key={index}
                    className={cx('btn')}
                    onClick={() => setStar(index + 1)}
                    disabled={myComment === undefined ? false : true}
                  >
                    {star >= index + 1 ? <StarIcon /> : <StarOutlineIcon />}
                  </IconButton>
                );
              })}
            </Box>
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
          {!myComment && (
            <Button variant="contained" className={cx('rating-btn')} onClick={handleRating}>
              Đánh giá
            </Button>
          )}
        </>
      )}
      <Box className={cx('comment-container')}>
        {data.map((item, index) => {
          if (item.userId === userId) return <Fragment key={index}></Fragment>;
          return <Comment data={item} key={item.id} />;
        })}
      </Box>
      <ToastPortal ref={toastRef} autoClose={true} />
    </Box>
  );
}

export default ProductRating;

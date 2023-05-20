import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Button, FormControl, IconButton, TextField, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CheckIcon from '@mui/icons-material/Check';

import { currencyFormat } from '~/utils';
import * as imageServices from '~/services/imageServices';
import * as productServices from '~/services/productServices';

import styles from './ProductTab.module.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getCheckout } from '~/store/reducers/checkoutSlice';
const cx = classNames.bind(styles);

function Product({ data }) {
  const [activeCode, setActiveCode] = useState('');
  const dispatch = useDispatch();

  const active = async (payload) => {
    const response = await productServices.activeGame(payload);
    if (response) dispatch(getCheckout());
  };

  const handleClick = () => {
    if (activeCode === '') return;
    active({ gameId: data.id, key: activeCode });
  };

  const [imgList, setImgList] = useState([]);
  useEffect(() => {
    const getIMG = async () => {
      const response = await productServices.getGameIMG(data.id);
      if (response) {
        setImgList(response);
      }
    };
    getIMG();
    return () => {};
  }, [data.id]);

  // console.log(data);
  return (
    <Grid container xs={12} className={cx('item')}>
      <Grid xs={12} md={4}>
        <Box className={cx('item-img')}>
          <img src={imageServices.getImage(imgList[1])} alt="Game" />
        </Box>
      </Grid>
      <Grid xs={12} md={5}>
        <Box className={cx('item-detail')}>
          <Link to={`/product/${data.id}`}>
            <Typography variant="subTitle">{data.name}</Typography>
          </Link>
          <Typography variant="subTitle">
            <strong>Ngày mua:</strong> {new Date(data.createdDate).toLocaleDateString('en-GB')}
          </Typography>
          <Typography variant="subTitle">
            <strong>Giá mua:</strong> {currencyFormat(data.price * (1 - data.discount / 100))}
          </Typography>
        </Box>
      </Grid>
      <Grid xs={12} md={3} className={cx('item-action')}>
        {data.isActive ? (
          <a
            href={process.env.PUBLIC_URL + '/files/game.rar'}
            target="_blank"
            rel="noopener noreferrer"
            download={`${data.name}.rar`}
          >
            <IconButton>
              <CloudDownloadIcon />
            </IconButton>
          </a>
        ) : (
          <>
            <FormControl>
              <TextField
                label="Nhập mã kích hoạt"
                id="active-code"
                value={activeCode}
                onChange={(e) => {
                  setActiveCode(e.currentTarget.value);
                }}
              />
            </FormControl>
            <Button variant="outlined" color="error" onClick={handleClick}>
              <CheckIcon />
            </Button>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Product;

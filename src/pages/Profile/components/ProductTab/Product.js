import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, FormControl, IconButton, TextField, Typography } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CheckIcon from '@mui/icons-material/Check';

import { currencyFormat } from '~/utils';
import * as imageServices from '~/services/imageServices';
import * as productServices from '~/services/productServices';

import styles from './ProductTab.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const cx = classNames.bind(styles);

function Product({ data }) {
  const [activeCode, setActiveCode] = useState('');

  const active = async (payload) => {
    const response = await productServices.activeGame(payload);
    if (response) console.log(response.data);
  };

  const handleClick = () => {
    if (activeCode === '') return;
    active({ gameId: data.id, key: activeCode });
  };
  // console.log(data);
  return (
    <Grid container xs={12} className={cx('item')}>
      <Grid xs={12} md={4}>
        <Box className={cx('item-img')}>
          <img src={imageServices.getImage(data.listImage[0])} alt="Game" />
        </Box>
      </Grid>
      <Grid xs={12} md={6}>
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
      <Grid xs={12} md={2} className={cx('item-action')}>
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
                id="active-code"
                value={activeCode}
                onChange={(e) => {
                  setActiveCode(e.currentTarget.value);
                }}
              />
            </FormControl>
            <IconButton variant="contained" color="error" onClick={handleClick}>
              <CheckIcon />
            </IconButton>
          </>
        )}
      </Grid>
    </Grid>
  );
}

export default Product;

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';

import { currencyFormat, randomColor } from '~/utils';
import GenreList from '~/components/GenreList/';
import SliderButton from './SliderButton';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [slideValue, setSlideValue] = useState([1, 2, 3, 4, 5]);
  useEffect(() => {
    const timerId = setInterval(nextSlide, 5000);
    return () => {
      clearInterval(timerId);
    };
  });

  const nextSlide = () => {
    if (slideIndex !== slideValue.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === slideValue.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(slideValue.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  const productList = [
    {
      id: 1,
      name: 'Genshin Impact',
      publisher: 'Mihoyo',
      origin_price: 200000,
      price: 180000,
      img: process.env.PUBLIC_URL + '/images/tmp.jpg',
    },
    {
      id: 2,
      name: 'Grand Thieves V',
      publisher: 'Publisher 1',
      origin_price: 1100000,
      price: 275000,
      img: process.env.PUBLIC_URL + '/images/tmp1.jpg',
    },
    {
      id: 3,
      name: 'Subnautica',
      publisher: 'Publisher 2',
      origin_price: 250000,
      price: 250000,
      img: process.env.PUBLIC_URL + '/images/tmp2.jpg',
    },
    {
      id: 4,
      name: 'Elden Ring',
      publisher: 'Publisher 3',
      origin_price: 100000,
      price: 330000,
      img: process.env.PUBLIC_URL + '/images/tmp.jpg',
    },
    {
      id: 5,
      name: 'Windows 11',
      publisher: 'Microsoft',
      origin_price: 0,
      price: 0,
      img: process.env.PUBLIC_URL + '/images/tmp1.jpg',
    },
  ];
  return (
    <Grid
      container
      className={cx('wrapper')}
      sx={{
        background: randomColor,
        overflow: {
          xs: 'hidden',
          md: 'hidden',
          lg: 'visible',
        },
      }}
    >
      {/* Slide begin */}
      <>
        {productList?.map((product, index) => {
          return (
            <Grid
              container
              xs={12}
              spacingX={2}
              className={slideIndex === index + 1 ? cx('slide', 'aim') : cx('slide')}
              key={product.id}
            >
              <Grid xs={12} md={8} sx={{ height: { xs: '320px', md: '360px', lg: '480px' } }}>
                <Link to={'/product/id'}>
                  <img src={product.img} alt="" className={cx('slider-img')} />
                </Link>
              </Grid>
              <Grid
                md={4}
                className={cx('detail-container')}
                sx={{
                  display: {
                    xs: 'none',
                    md: 'flex',
                    lg: 'flex',
                  },
                }}
              >
                <Typography variant="title">
                  <Link to={'/product/id'}>{product.name}</Link>
                </Typography>
                <Typography variant="company" sx={{ mx: 4 }}>
                  {`Nhà phát hành: ${product.publisher}`}
                </Typography>
                {product.origin_price !== product.price && (
                  <Typography variant="orign-price" sx={{ mx: 4 }}>
                    {currencyFormat(product.origin_price)}
                  </Typography>
                )}
                <Typography variant="price" sx={{ mx: 4 }}>
                  {product.price > 0 ? currencyFormat(product.price) : 'Free'}
                </Typography>
                <GenreList />
              </Grid>
            </Grid>
          );
        })}
      </>
      {/* slide end */}

      <SliderButton moveSlide={() => prevSlide()} />
      <SliderButton moveSlide={() => nextSlide()} direction={'right'} />
      <Grid xs={12} md={8} lg={8} className={cx('dot-container')}>
        {Array.from({ length: 5 }).map((item, index) => (
          <Box
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? cx('dot', 'actived') : cx('dot')}
          ></Box>
        ))}
      </Grid>
    </Grid>
  );
}

export default Slider;

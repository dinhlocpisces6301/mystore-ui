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
        <Grid container xs={12} spacingX={2}>
          <Grid xs={12} md={8} sx={{ height: { xs: '320px', md: '360px', lg: '480px' } }}>
            <Link to={'/'}>
              <img src={process.env.PUBLIC_URL + '/images/tmp2.jpg'} alt="" className={cx('slider-img')} />
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
              <Link to={'/'}>Genshin Impact</Link>
            </Typography>
            <Typography variant="company" sx={{ mx: 4 }}>
              Mihoyo
            </Typography>
            <Typography variant="orign-price" sx={{ mx: 4 }}>
              {currencyFormat(200000)}
            </Typography>
            <Typography variant="price" sx={{ mx: 4 }}>
              {currencyFormat(200000)}
            </Typography>
            <GenreList />
          </Grid>
        </Grid>
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

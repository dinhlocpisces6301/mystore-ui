import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { getPublisher, publisherSelector } from '~/store/reducers/publisherSlice';
import { currencyFormat, randomColor } from '~/utils';
import GenreList from '~/components/GenreList/';
import SliderButton from './SliderButton';
import * as productServices from '~/services/productServices';
import * as imageServices from '~/services/imageServices';
import styles from './Slider.module.scss';
const cx = classNames.bind(styles);

function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);
  const [slideValue, setSlideValue] = useState([]);
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

  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getLatestProduct(1, 10);
      if (result) setSlideValue(result.items);
    };
    fetchApi();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPublisher());
  }, [dispatch]);
  const publisher = useSelector(publisherSelector);
  const { data } = publisher;

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
        {slideValue?.map((product, index) => {
          return (
            <Grid
              container
              xs={12}
              className={slideIndex === index + 1 ? cx('slide', 'aim') : cx('slide')}
              key={product.id}
            >
              <Grid xs={12} md={8} sx={{ height: { xs: '320px', md: '360px', lg: '400px' } }}>
                <Link to={`/product/${product.id}`}>
                  <img src={imageServices.getImage(product.listImage[1])} alt="" className={cx('slider-img')} />
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
                  <Link to={`/product/${product.id}`}>{product.name}</Link>
                </Typography>
                <Typography variant="company">{`Nhà phát hành: ${
                  data?.find((p) => p.id === product.publisherId).name || 'STEM'
                }`}</Typography>
                {product.discount !== 0 && (
                  <Typography variant="origin-price">{currencyFormat(product.price)}</Typography>
                )}
                <Typography variant="price">
                  {product.price === 0 ? 'Miễn phí' : currencyFormat(product.price * (1 - product.discount / 100))}
                </Typography>
                <GenreList data={{ genreIDs: product.genreIDs, genreName: product.genreName }} />
              </Grid>
            </Grid>
          );
        })}
      </>
      {/* slide end */}

      <SliderButton moveSlide={() => prevSlide()} />
      <SliderButton moveSlide={() => nextSlide()} direction={'right'} />
      <Grid xs={12} md={8} lg={8} className={cx('dot-container')}>
        {Array.from({ length: slideValue?.length }).map((item, index) => (
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

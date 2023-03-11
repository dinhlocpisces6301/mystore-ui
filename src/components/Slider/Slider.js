import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Grid from '@mui/material/Unstable_Grid2';
import SliderButton from './SliderButton';
import { currencyFormat, randomColor } from '~/utils';
import { Link } from 'react-router-dom';
import GenreList from '~/components/GenreList/';

function Slider() {
  const classes = useStyles();
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
      className={classes['wrapper']}
      sx={{
        background: randomColor,
        overflow: {
          xs: 'hidden',
          md: 'hidden',
          lg: 'visible',
        },
      }}
    >
      <Grid container xs={12} className={classes['content']}>
        <Grid container xs={12} md={8} sx={{ height: '400px' }}>
          <Link to={'/'} className={classes.img}>
            <img src={process.env.PUBLIC_URL + '/images/tmp.jpg'} alt="" className={classes.img} />
          </Link>
        </Grid>
        <Grid
          md={4}
          className={classes['detail-container']}
          sx={{
            display: {
              xs: 'none',
              md: 'flex',
              lg: 'flex',
            },
          }}
        >
          <Typography variant="title" sx={{ m: 4 }}>
            <Link to={'/'}>Genshin Impact</Link>
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
      <SliderButton moveSlide={() => prevSlide()} />
      <SliderButton moveSlide={() => nextSlide()} direction={'right'} />
      <Grid xs={12} md={8} lg={8} className={classes['dot-container']}>
        {Array.from({ length: 5 }).map((item, index) => (
          <Box
            key={index}
            onClick={() => moveDot(index + 1)}
            className={classes['dot']}
            sx={{
              background: slideIndex === index + 1 ? '#FFFBF5' : '#323b44',
            }}
          ></Box>
        ))}
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: '16px 0 32px 0 !important',
    position: 'relative',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    borderRadius: '19px',
  },
  content: {},
  'dot-container': {
    height: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '0',
    left: '0',
  },
  dot: {
    width: '16px',
    height: '16px',
    border: '4px solid #323b44',
    borderRadius: '50%',
    margin: '0 5px',
    '&:hover': {
      background: '#FFFBF5',
    },
  },
  img: {
    width: '100%',
    height: '480px',
    objectFit: 'cover',
    borderRadius: '19px 0 0 19px',
  },
  'detail-container': {
    height: '480px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
}));

export default Slider;

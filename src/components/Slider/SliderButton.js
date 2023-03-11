import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { makeStyles } from '@mui/styles';
function SliderButton({ direction = 'left', moveSlide }) {
  const classes = useStyles();

  return (
    <>
      <Button
        onClick={() => moveSlide()}
        className={direction === 'right' ? classes['next-btn'] : classes['prev-btn']}
        sx={{
          minWidth: '0',
          width: '45px',
          height: '96px',
          position: 'absolute',
          top: '50%',
          left:
            direction === 'right'
              ? 'none'
              : {
                  xs: '0px',
                  md: '0px',
                  lg: '-48px',
                },
          right:
            direction === 'right'
              ? {
                  xs: '0px',
                  md: '0px',
                  lg: '-48px',
                }
              : 'none',
          transform: 'translateY(-60%)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          svg: {
            color: '#000',
            fontSize: '48px',
          },
        }}
      >
        {direction === 'right' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Button>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  'prev-btn': {
    background: 'linear-gradient(to right, rgba(0, 0, 0, 0.3) 5%, rgba(0, 0, 0, 0) 95%)',
    '&:hover': {
      background: 'linear-gradient(to right, rgba(171, 218, 244, 1) 5%, rgba(171, 218, 244, 0) 95%)',
    },
  },
  'next-btn': {
    background: 'linear-gradient(to right, rgba(0, 0, 0, 0) 5%, rgba(0, 0, 0, 0.3) 95%)',
    '&:hover': {
      background: 'linear-gradient(to right, rgba(171, 218, 244, 0) 5%, rgba(171, 218, 244, 1) 95%)',
    },
  },
}));

SliderButton.propTypes = {
  moveSlide: PropTypes.func,
  direction: PropTypes.string,
};
export default SliderButton;

import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from './Slider.module.scss';
const cx = classNames.bind(styles);

function SliderButton({ direction = 'left', moveSlide }) {
  return (
    <>
      <Button
        onClick={() => moveSlide()}
        className={direction === 'right' ? cx('slider-btn', 'next-btn') : cx('slider-btn', 'prev-btn')}
        sx={{
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
        }}
      >
        {direction === 'right' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
      </Button>
    </>
  );
}

SliderButton.propTypes = {
  moveSlide: PropTypes.func,
  direction: PropTypes.string,
};
export default SliderButton;

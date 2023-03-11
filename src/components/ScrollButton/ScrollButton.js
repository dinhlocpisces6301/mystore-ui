import { useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardArrowUpTwoToneIcon from '@mui/icons-material/KeyboardArrowUpTwoTone';
import { scrollToPosition } from '~/utils';

function ScrollButton() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };
  window.addEventListener('scroll', toggleVisible);

  const handleClick = () => {
    scrollToPosition();
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          padding: '0',
          minWidth: '0px',
          height: '40px',
          width: '40px',
          borderRadius: '50%',
          display: visible ? 'flex' : 'none',
          position: 'fixed',
          right: '24px',
          bottom: '66px',
          'z-index': '1',
          cursor: 'pointer',
          backgroundColor: 'rgba(60, 62, 67, 0.95)',
        }}
        onClick={handleClick}
      >
        <KeyboardArrowUpTwoToneIcon />
      </Button>
    </>
  );
}

export default ScrollButton;

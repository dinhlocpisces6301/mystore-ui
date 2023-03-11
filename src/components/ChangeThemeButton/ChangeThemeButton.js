import { useState } from 'react';
import Button from '@mui/material/Button';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
function ChangeThemeButton() {
  const theme = localStorage.getItem('theme');
  console.log(theme);
  const [isDarkMode, setDarkMode] = useState(() => {
    if (theme === 'dark') {
      return true;
    } else {
      return false; /// if theme === 'light' or theme === null
    }
  });
  const handleClick = () => {
    if (isDarkMode) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!isDarkMode);
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{
          padding: '0',
          minWidth: '0px',
          height: '39px',
          width: '39px',
          borderRadius: '50%',
          border: '1px solid #ccc',
          display: { xs: 'none', md: 'none', lg: 'flex' },
          position: 'fixed',
          right: '24px',
          bottom: '24px',
          'z-index': '1',
          cursor: 'pointer',
          backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.75)' : 'rgba(236, 242, 255, 0.75)',
        }}
        onClick={() => handleClick()}
      >
        {isDarkMode ? (
          <DarkModeIcon sx={{ color: 'rgba(255, 237, 0, 0.95)' }} />
        ) : (
          <LightModeIcon sx={{ color: 'rgba(223, 46, 56, 0.95)' }} />
        )}
      </Button>
    </>
  );
}

export default ChangeThemeButton;

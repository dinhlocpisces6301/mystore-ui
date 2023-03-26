import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GenreItem({ label = 'Genre', size = 'small', clickable = false }) {
  const navigate = useNavigate();
  return (
    <Chip
      label={label}
      variant="contained"
      size={size}
      sx={{ m: 0.5, background: '#3d454c', color: '#fff' }}
      clickable={false}
      onClick={() => {
        if (clickable) {
          navigate('/');
        }
      }}
    />
  );
}

export default GenreItem;

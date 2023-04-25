import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function GenreItem({ id = '', label = 'Genre' }) {
  const navigate = useNavigate();
  return (
    <Chip
      label={label}
      variant="contained"
      sx={{ m: 0.5, background: '#3d454c', color: '#fff', borderRadius: 0 }}
      clickable={false}
      size="small"
      onClick={() => {
        navigate(`/category/${id}`);
      }}
    />
  );
}

export default GenreItem;

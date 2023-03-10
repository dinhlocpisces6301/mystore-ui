import { Stack } from '@mui/material';
import GenreItem from './GenreItem';

function GenreList({ size = 'medium', clickable = false }) {
  return (
    <Stack
      direction="row"
      sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', m: '16px 32px' }}
    >
      <GenreItem label={'Verry Verry Long Genre'} size={size} clickable={clickable} />
      <GenreItem label={'G'} size={size} clickable={clickable} />
      <GenreItem label={'Genre'} size={size} clickable={clickable} />
      <GenreItem label={'Verry Long Genre'} size={size} clickable={clickable} />
    </Stack>
  );
}

export default GenreList;

import { Stack } from '@mui/material';
import GenreItem from './GenreItem';

function GenreList({
  data = { genreIDs: ['0', '1', '2'], genreName: ['Genre 1', 'Genre 2', 'Genre 3'] },
  size = 'small',
  clickable = false,
}) {
  return (
    <Stack
      direction="row"
      sx={{ flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-start', m: '16px 24px' }}
    >
      {data.genreName.map((genre, index) => {
        return (
          <GenreItem
            label={genre}
            size={size}
            clickable={clickable}
            id={data.genreIDs[index]}
            key={data.genreIDs[index]}
          />
        );
      })}
    </Stack>
  );
}

export default GenreList;

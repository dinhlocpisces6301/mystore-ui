import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';

import ResultItem from './ResultItem';
import styles from './SearchBar.module.scss';
const cx = classNames.bind(styles);
function SearchResults({ data }) {
  return (
    <Grid container xs={12} className={cx('search-results')}>
      {data.map((item, index) => (
        <ResultItem key={item.id} data={item} />
      ))}
    </Grid>
  );
}

export default SearchResults;

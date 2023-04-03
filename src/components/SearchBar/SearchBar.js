import classNames from 'classnames/bind';
import { useEffect, useRef, useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

import SearchResults from './SearchResults';
import { useClickOutside, useDebounce } from '~/hooks';
import * as productServices from '~/services/productServices';
import styles from './SearchBar.module.scss';
const cx = classNames.bind(styles);
function SearchBar() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [totalRecords, setTotalRecords] = useState(0);
  const searchRef = useRef();
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  const handleShow = () => {
    setShowResult(true);
  };
  const handleHideResult = () => {
    setShowResult(false);
  };
  useClickOutside(searchRef, handleHideResult);
  const handleClick = () => {
    if (showResult) {
      setShowResult(false);
    }
  };
  const debouncedValue = useDebounce(searchValue, 500);
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSearchResult([]);
      return;
    }
    const fetchApi = async () => {
      if (debouncedValue !== '') {
        const result = await productServices.search(debouncedValue);
        setSearchResult(result.items);
        setTotalRecords(result.totalRecords);
        setShowResult(true);
      }
    };

    fetchApi();
  }, [debouncedValue]);
  return (
    <Grid container xs={12} className={cx('wrapper')}>
      <Grid container xs={12} md={6} xsOffset={0} mdOffset={5} className={cx('search-wrapper')} ref={searchRef}>
        <input
          placeholder="Tìm kiếm . . ."
          type="text"
          value={searchValue}
          onChange={handleSearch}
          onFocus={handleShow}
          className={cx('search-input')}
        />
        <Link
          to={searchValue === '' ? '#' : `/search/${searchValue}`}
          className={cx('search-button')}
          onClick={handleClick}
        >
          <SearchIcon />
        </Link>
        {showResult && searchResult.length > 0 && <SearchResults data={searchResult} />}
      </Grid>
    </Grid>
  );
}

export default SearchBar;

import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import * as categoryServices from '~/services/categoryServices';

import { useEffect, useState } from 'react';
import styles from './CategoryList.module.scss';
const cx = classNames.bind(styles);

const Item = ({ data }) => {
  return (
    <Grid xs={6} md={3} className={cx('item')}>
      <Link to={`/category/${data.id}`}>{data.name}</Link>
    </Grid>
  );
};

function CategoryList() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await categoryServices.getCategories();
      setData(result);
    };
    fetchApi();
  }, []);

  return (
    <Grid container xs={12}>
      <Grid xs={12} className={cx('header')}>
        <Typography variant="h5">Danh sách thể loại</Typography>
      </Grid>
      <Grid container xs={12} spacing={2} className={cx('container')}>
        {data?.map((item) => (
          <Item key={item.id} data={item} />
        ))}
      </Grid>
    </Grid>
  );
}

export default CategoryList;

import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';
import { currencyFormat } from '~/utils';
import styles from './SearchBar.module.scss';
import * as imageServices from '~/services/imageServices';

const cx = classNames.bind(styles);
function ResultItem({ data }) {
  return (
    <Grid container xs={12} className={cx('search-result')}>
      <Grid xs={5}>
        <Link to={`/product/${data.id}`}>
          <img src={imageServices.getImage(data.listImage[1])} alt="" className={cx('result-img')} />
        </Link>
      </Grid>
      <Grid xs={7} className={cx('result-detail')}>
        <Link to={`/product/${data.id}`}>
          <Typography variant="subTitle">{data.name}</Typography>
          {data.status ? (
            <Typography variant="price">
              {data.price === 0 ? 'Miễn phí' : currencyFormat(data.price * (1 - data.discount / 100))}
            </Typography>
          ) : (
            <Typography variant="price">Sắp ra mắt</Typography>
          )}
        </Link>
      </Grid>
    </Grid>
  );
}

export default ResultItem;

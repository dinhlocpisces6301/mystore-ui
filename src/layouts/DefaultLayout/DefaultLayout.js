import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';

import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Grid container className={cx('wrapper')}>
        <Grid xs={12} md={12} lg={8} lgOffset={2} className={cx('content')}>
          {children}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;

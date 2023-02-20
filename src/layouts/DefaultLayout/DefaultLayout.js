import PropTypes from 'prop-types';
import classNames from 'classnames/bind';

import Header from '../components/Header/Header';

import styles from './DefaultLayout.module.scss';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <div className={cx('content')}>{children}</div>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;

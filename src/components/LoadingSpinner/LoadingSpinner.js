import classNames from 'classnames/bind';

import styles from './LoadingSpinner.module.scss';

const cx = classNames.bind(styles);
function LoadingSpinner() {
  return <span className={cx('loading')}></span>;
}

export default LoadingSpinner;

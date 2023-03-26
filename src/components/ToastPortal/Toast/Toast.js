import classNames from 'classnames/bind';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import styles from './Toast.module.scss';

const cx = classNames.bind(styles);

function Toast({ mode, onClose, message }) {
  switch (mode) {
    case 'success':
      return (
        <>
          <div onClick={onClose} className={cx('toast', 'success')}>
            <CheckCircleIcon />
            <div className={cx('message')}>{message}</div>
            <span className={cx('countdown')}></span>
          </div>
        </>
      );
    case 'error':
      return (
        <>
          <div onClick={onClose} className={cx('toast', 'error')}>
            <ErrorIcon />
            <div className={cx('message')}>{message}</div>
            <span className={cx('countdown')}></span>
          </div>
        </>
      );
    case 'warning':
      return (
        <>
          <div onClick={onClose} className={cx('toast', 'warning')}>
            <WarningIcon />
            <div className={cx('message')}>{message}</div>
            <span className={cx('countdown')}></span>
          </div>
        </>
      );
    default:
      return (
        <>
          <div onClick={onClose} className={cx('toast', 'success')}>
            <CheckCircleIcon />
            <div className={cx('message')}>{message}</div>
            <span className={cx('countdown')}></span>
          </div>
        </>
      );
  }
}

export default Toast;

import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';

import { Items } from './Tabs';
import MultiTab from '~/components/MultiTab/';

import styles from './SettingTab.module.scss';
const cx = classNames.bind(styles);

function SettingTab() {
  return (
    <Grid container xs={12} className={cx('wrapper')}>
      <Grid xs={12}>
        <Typography variant="title">Cài đặt người dùng</Typography>
      </Grid>
      <Grid xs={12} className={cx('container')}>
        <MultiTab data={Items} />
      </Grid>
    </Grid>
  );
}

export default SettingTab;

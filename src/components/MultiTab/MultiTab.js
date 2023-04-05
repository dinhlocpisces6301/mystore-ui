import classNames from 'classnames/bind';
import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';

import styles from './MultiTab.module.scss';
const cx = classNames.bind(styles);

function MultiTab({ data }) {
  const [tabIndex, setTabIndex] = useState(0);
  return (
    <Grid container xs={12}>
      <Grid container xs={12}>
        {data.map((item, index) => {
          return (
            <Box
              key={index}
              className={tabIndex === index ? cx('header', 'active') : cx('header')}
              onClick={() => {
                setTabIndex(index);
              }}
            >
              <Typography variant="subTitle">{item.title}</Typography>
            </Box>
          );
        })}
      </Grid>
      <Grid container xs={12}>
        {data.map((item, index) => {
          return tabIndex === index && <Box key={item.id}>{item.component}</Box>;
        })}
      </Grid>
    </Grid>
  );
}

export default MultiTab;

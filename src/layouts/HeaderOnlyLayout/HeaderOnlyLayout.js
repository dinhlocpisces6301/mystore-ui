import PropTypes from 'prop-types';
import Grid from '@mui/material/Unstable_Grid2';

import Header from '../components/Header/Header';

function DefaultLayout({ children }) {
  return (
    <>
      <Header />
      <Grid
        container
        sx={{
          backgroundColor: '#fff',
        }}
      >
        <Grid
          xs={12}
          md={12}
          lg={8}
          lgOffset={2}
          sx={{
            minHeight: 'auto',
          }}
        >
          {children}
        </Grid>
      </Grid>
    </>
  );
}

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default DefaultLayout;

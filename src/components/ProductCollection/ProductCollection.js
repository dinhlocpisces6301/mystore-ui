import { Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Product from './Product';

function ProductCollection({ title = 'Product Collection' }) {
  return (
    <Grid container xs={12} disableEqualOverflow>
      <Grid container xs>
        <Grid xs={12}>
          <Typography variant="h5" align="left" sx={{ ml: 2 }}>
            {`Top Sellers`}
          </Typography>
        </Grid>
        {Array.from({ length: 5 }).map((item, index) => (
          <Product key={index} />
        ))}
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid container xs>
        <Grid xs={12}>
          <Typography variant="h5" align="left" sx={{ ml: 2 }}>
            {`New Release`}
          </Typography>
        </Grid>
        {Array.from({ length: 5 }).map((item, index) => (
          <Product key={index} />
        ))}
      </Grid>

      <Divider orientation="vertical" flexItem />

      <Grid container xs>
        <Grid xs={12}>
          <Typography variant="h5" align="left" sx={{ ml: 2 }}>
            {`Most Liked`}
          </Typography>
        </Grid>
        {Array.from({ length: 5 }).map((item, index) => (
          <Product key={index} />
        ))}
      </Grid>
    </Grid>
  );
}

export default ProductCollection;

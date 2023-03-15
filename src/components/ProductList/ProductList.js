import Grid from '@mui/material/Unstable_Grid2';

import Product from './Product';
import { Pagination, Typography } from '@mui/material';

function ProductList({ title = 'Product List' }) {
  return (
    <>
      <Grid container xs={12} disableEqualOverflow>
        <Grid xs={12} xsOffset={1} mdOffset={0} lgOffset={0}>
          <Typography variant="h5" align="left">
            {title}
          </Typography>
        </Grid>

        <Grid container xs={12} spacing={2} rowSpacing={4}>
          {Array.from({ length: 8 }).map((item, index) => {
            return <Product key={index} />;
          })}
        </Grid>

        <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}>
          <Pagination
            count={10}
            defaultPage={1}
            siblingCount={1}
            boundaryCount={1}
            variant="outlined"
            shape="rounded"
          />
        </Grid>
      </Grid>
    </>
  );
}

export default ProductList;

import Grid from '@mui/material/Unstable_Grid2';
import { Pagination, PaginationItem, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';

import Product from './Product';

function ProductList({ title = 'Product List', data }) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get('page') || '1', 10);
  return (
    <>
      <Grid container xs={12} disableEqualOverflow>
        <Grid xs={12} xsOffset={1} mdOffset={0} lgOffset={0}>
          <Typography variant="h5" align="left" sx={{ ml: 2, mt: 2 }}>
            {title}
          </Typography>
        </Grid>

        <Grid container xs={12} spacing={2.5} rowSpacing={4}>
          {data.items?.map((item) => {
            return <Product key={item.id} data={item} />;
          })}
        </Grid>

        {location.pathname !== '/' && data.pageCount > 1 && (
          <Grid xs={12} sx={{ display: 'flex', justifyContent: 'center', marginY: 2 }}>
            <Pagination
              variant="outlined"
              shape="rounded"
              color="error"
              count={data.pageCount}
              page={page}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`${location.pathname}${item.page === 1 ? '' : `?page=${item.page}`}`}
                  {...item}
                />
              )}
            />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default ProductList;

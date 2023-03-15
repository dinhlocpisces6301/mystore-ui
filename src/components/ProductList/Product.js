import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from '@mui/styles';

import { currencyFormat } from '~/utils';

function Product() {
  const classes = useStyles();
  return (
    <Grid xs={10} md={4} lg={3} xsOffset={1} mdOffset={0} lgOffset={0}>
      <Box className={classes['content']}>
        <Box sx={{ height: { xs: '160px', md: '200px', lg: '240px' } }}>
          <img src={process.env.PUBLIC_URL + '/images/tmp1.jpg'} alt="" className={classes['img']} />
        </Box>

        <Box className={classes['detail']}>
          <Typography variant="subTitle">Genshin Impact</Typography>

          <Typography variant="orign-price" align="right" sx={{ mx: 2 }}>
            {currencyFormat(200000)}
          </Typography>

          <Typography variant="price" align="right" sx={{ mx: 2 }}>
            {currencyFormat(200000)}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}
const useStyles = makeStyles((theme) => ({
  content: {
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
  },
  detail: {
    height: '84px',
    width: '100%',
  },
}));
export default Product;

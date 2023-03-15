import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { makeStyles } from '@mui/styles';
import { currencyFormat } from '~/utils';

function Product() {
  const classes = useStyles();
  return (
    <Grid container xs={12}>
      <Box className={classes['content']}>
        <img src={process.env.PUBLIC_URL + '/images/tmp.jpg'} alt="" className={classes['img']} />

        <Box className={classes['detail']}>
          <Typography variant="subTitle" sx={{ fontSize: '16px' }}>
            Red Dead Redemption 2
          </Typography>

          <Typography variant="orign-price" align="right" sx={{ mx: 1 }}>
            {currencyFormat(200000)}
          </Typography>

          <Typography variant="price" align="right" sx={{ mx: 1 }}>
            {currencyFormat(200000)}
          </Typography>
        </Box>
      </Box>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    margin: '8px',
    height: '160px',
    width: '100%',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 3px 3px',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&:hover > div': {
      height: '100px',
    },
  },
  img: {
    height: '100%',
    width: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  detail: {
    height: '24px',
    width: '100%',
    position: 'absolute',
    bottom: '0',
    left: '0',
    background: 'rgba(255, 255, 255, 0.35)',
    transition: 'ease 0.5s',
  },
}));
export default Product;

import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Divider, Link, Stack, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';

import config from '~/config';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
function Footer() {
  const [copyRight, setCopyRight] = useState();
  useEffect(() => {
    const year = new Date().getFullYear();
    year === 2022 ? setCopyRight('Copyright © ' + year) : setCopyRight('Copyright © 2022 - ' + year);
  }, [copyRight]);

  return (
    <>
      <Grid container className={cx('wrapper')}>
        <Grid container xs={12} lg={8} lgOffset={2} columnSpacing={2} className={cx('container')}>
          <Grid xs={2} alignSelf="center">
            <Stack className={cx('link-container')}>
              <NavLink to={config.routes.home}>
                <Typography variant="h6">Trang chủ</Typography>
              </NavLink>
              <NavLink to={config.routes.community}>
                <Typography variant="h6">Cộng đồng</Typography>
              </NavLink>
              <NavLink to={config.routes.about}>
                <Typography variant="h6">Về chúng tôi</Typography>
              </NavLink>
              <NavLink to={config.routes.contact}>
                <Typography variant="h6">Phản hồi</Typography>
              </NavLink>
            </Stack>
          </Grid>
          <Grid xs={7} alignSelf="center">
            <Typography variant="h6" align="center">
              Chúng tôi luôn cung cấp những dịch vụ tốt nhất cho khách hàng
            </Typography>
            <Typography variant="h6" align="center">
              STEM không chỉ là cửa hàng trực tuyến mà còn là mạng xã hội
            </Typography>
          </Grid>
          <Grid xs={3}>
            <Box>
              <Typography variant="h6" align="left">
                Mạng xã hội
              </Typography>
              <Box className={cx('social-container')}>
                <Link href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon />
                </Link>
                <Link href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon />
                </Link>
                <Link href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon />
                </Link>
                <Link href="https://www.reddit.com/" target="_blank" rel="noopener noreferrer">
                  <RedditIcon />
                </Link>
                <Link href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
                  <YouTubeIcon />
                </Link>
              </Box>
            </Box>
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" align="left">
                Thông tin liên hệ:
              </Typography>
              <Typography variant="subtitle1" align="left">
                - SĐT/Fax: 096 9819 201
              </Typography>
              <Typography variant="subtitle1" align="left">
                - Email: stem.store@gmail.com
              </Typography>
              <Typography variant="subtitle1" align="left">
                - Địa chỉ: Đại học GTVT TPHCM cở sở 3
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid xs={12} lg={8} lgOffset={2}>
          <Divider />
          <Typography variant="subtitle2" textAlign={'center'}>
            {copyRight} Game Store. All Rights Reserved
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}

export default Footer;

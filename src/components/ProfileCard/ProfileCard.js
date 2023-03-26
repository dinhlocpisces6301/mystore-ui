import classNames from 'classnames/bind';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

import styles from './ProfileCard.module.scss';
const cx = classNames.bind(styles);

function ProfileCard({ data }) {
  return (
    <Grid container xs={12} className={cx('wrapper')}>
      <Grid xs={12} md={6} lg={6} className={cx('avatar')}>
        <img src={data.avatar} alt="img" />
      </Grid>
      <Grid container xs={12} md={6} lg={6} className={cx('content')}>
        <Typography variant="h5">{data.role}</Typography>
        <Box className={cx('line')}>
          <Typography variant="subTitle">Họ và tên:</Typography>
          <Typography variant="subTitle">{data.fullname}</Typography>
        </Box>
        <Box className={cx('line')}>
          <Typography variant="subTitle">Ngày sinh:</Typography>
          <Typography variant="subTitle">{data.dateOfBirth}</Typography>
        </Box>

        <Box className={cx('line')}>
          <Typography variant="subTitle">Địa chỉ:</Typography>
          <Typography variant="subTitle">{data.address}</Typography>
        </Box>

        <Box className={cx('line')}>
          <Typography variant="subTitle">Email:</Typography>
          <Typography variant="subTitle">{data.mail}</Typography>
        </Box>

        <Box className={cx('social-container')}>
          <Link target={data.githubLink !== '#' ? '_blank' : '_self'} rel="noopener noreferrer" href={data.githubLink}>
            <GitHubIcon />
          </Link>
          <Link
            target={data.facebookLink !== '#' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            href={data.facebookLink}
          >
            <FacebookIcon />
          </Link>
          <Link
            target={data.instagramLink !== '#' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            href={data.instagramLink}
          >
            <InstagramIcon />
          </Link>
          <Link
            target={data.twitterLink !== '#' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            href={data.twitterLink}
          >
            <TwitterIcon />
          </Link>
          <Link
            target={data.youtubeLink !== '#' ? '_blank' : '_self'}
            rel="noopener noreferrer"
            href={data.youtubeLink}
          >
            <YouTubeIcon />
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ProfileCard;

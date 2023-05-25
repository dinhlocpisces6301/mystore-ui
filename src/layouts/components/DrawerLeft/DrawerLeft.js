import { Box, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

function DrawerLeft({ onClose }) {
  const navigate = useNavigate();

  return (
    <Box onClick={onClose} sx={{ height: '100%' }}>
      <Box sx={{ height: '80px', width: '250px', background: '#cfe9f3' }}></Box>
      <Box>
        <Stack my={2}>
          <Box
            py={1}
            sx={{
              background: '#cfe9f3',
              '&:hover': {
                background: '#aad4ff',
              },
              cursor: 'pointer',
            }}
            onClick={() => navigate(config.routes.home)}
          >
            <Typography variant="subTitle">Trang chủ</Typography>
          </Box>

          <Box
            py={1}
            sx={{
              background: '#cfe9f3',
              '&:hover': {
                background: '#aad4ff',
              },
            }}
            onClick={() => navigate('/category')}
          >
            <Typography variant="subTitle">Thể loại</Typography>
          </Box>

          <Box
            py={1}
            sx={{
              background: '#cfe9f3',
              '&:hover': {
                background: '#aad4ff',
              },
              cursor: 'pointer',
            }}
            onClick={() => navigate(config.routes.contact)}
          >
            <Typography variant="subTitle">Phản hồi</Typography>
          </Box>

          <Box
            py={1}
            sx={{
              background: '#cfe9f3',
              '&:hover': {
                background: '#aad4ff',
              },
              cursor: 'pointer',
            }}
            onClick={() => navigate(config.routes.about)}
          >
            <Typography variant="subTitle">Về chúng tôi</Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default DrawerLeft;

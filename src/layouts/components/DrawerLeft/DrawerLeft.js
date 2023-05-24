import { Box, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

function DrawerLeft({ onClose }) {
  const navigate = useNavigate();

  return (
    <Box onClick={onClose} sx={{ height: '100%' }}>
      <Box sx={{ height: '80px', width: '250px', background: '#cfe9f3' }}></Box>
      <Box>
        <Stack my={1}>
          <Box
            py={1}
            sx={{
              textAlign: 'center',
              background: '#cfe9f3',
              '&:hover': {
                background: '#aad4ff',
              },
              cursor: 'pointer',
            }}
            onClick={() => navigate(config.routes.home)}
          >
            Trang chủ
          </Box>

          {/* <Box
            py={1}
            sx={{
              textAlign: 'center',
              background: '#cfe9f3',
              '&:hover': {
                background: '#aad4ff',
              },
              onClick={() => navigate(config.routes.home)}
            }}
          >
            Cộng đồng
          </Box> */}

          <Box
            py={1}
            sx={{
              textAlign: 'center',
              background: '#cfe9f3',
              '&:hover': {
                background: '#aad4ff',
              },
              cursor: 'pointer',
            }}
            onClick={() => navigate(config.routes.contact)}
          >
            Phản hồi
          </Box>

          <Box
            py={1}
            sx={{
              textAlign: 'center',
              background: '#cfe9f3',
              '&:hover': {
                background: '#aad4ff',
              },
              cursor: 'pointer',
            }}
            onClick={() => navigate(config.routes.about)}
          >
            Về chúng tôi
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

export default DrawerLeft;

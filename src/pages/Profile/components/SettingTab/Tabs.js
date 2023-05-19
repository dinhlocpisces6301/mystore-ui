import ChangeInfoTab from './components/ChangeInfoTab';
import ChangePasswordTab from './components/ChangePasswordTab';
import OTPChangeTab from './components/OTPChangeTab';

export const Items = [
  {
    id: 1,
    title: 'Thay đổi thông tin',
    component: <ChangeInfoTab />,
  },
  {
    id: 2,
    title: 'Thay đổi mật khẩu',
    component: <ChangePasswordTab />,
  },

  {
    id: 3,
    title: 'Đăng nhập bảo mật',
    component: <OTPChangeTab />,
  },
];

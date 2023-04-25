import ChangeInfoTab from './components/ChangeInfoTab';
import ChangePasswordTab from './components/ChangePasswordTab';

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
];

import ProfileTab from './components/ProfileTab';
import ProductTab from './components/ProductTab';
import SettingTab from './components/SettingTab';

export const Items = [
  {
    id: 1,
    title: 'sản phẩm đã mua',
    component: <ProductTab />,
  },
  {
    id: 2,
    title: 'giới thiệu',
    component: <ProfileTab />,
  },
  {
    id: 3,
    title: 'cài đặt',
    component: <SettingTab />,
  },
];

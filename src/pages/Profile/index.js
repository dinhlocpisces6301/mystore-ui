import ProfileHeader from './components/ProfileHeader';
import MultiTab from '~/components/MultiTab';
import { Items } from './Tabs';

function Profile() {
  return (
    <>
      <ProfileHeader />
      <MultiTab data={Items} />
    </>
  );
}

export default Profile;

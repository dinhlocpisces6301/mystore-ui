import MultiTab from '~/components/MultiTab';
import { Items } from './Tabs';

function Profile() {
  return (
    <>
      <MultiTab data={Items} />
    </>
  );
}

export default Profile;

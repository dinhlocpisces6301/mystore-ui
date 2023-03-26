import ProfileCard from '~/components/ProfileCard';
import { data } from './data';

function About() {
  return (
    <>
      {data.map((item, index) => {
        return <ProfileCard data={item} key={index} />;
      })}
    </>
  );
}

export default About;

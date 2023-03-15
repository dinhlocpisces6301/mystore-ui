import ProductCollection from '~/components/ProductCollection';
import ProductList from '~/components/ProductList';
import Slider from '~/components/Slider';

function Home() {
  return (
    <>
      <Slider />
      <ProductCollection />
      <ProductList />
    </>
  );
}

export default Home;

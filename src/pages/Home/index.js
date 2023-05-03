import { useEffect, useState } from 'react';

import ProductCollection from '~/components/ProductCollection';
import ProductList from '~/components/ProductList';
import SearchBar from '~/components/SearchBar/';
import Slider from '~/components/Slider';
import * as productServices from '~/services/productServices';

function Home() {
  // Gọi Api lấy tất cả sản phẩm
  const [data, setData] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getAllProduct(1);
      setData(result);
    };
    fetchApi();
  }, []);

  return (
    <>
      <SearchBar />
      <Slider />
      <ProductCollection />
      {data !== undefined ? <ProductList title="Danh sách sản phẩm" data={data} /> : <></>}
    </>
  );
}

export default Home;

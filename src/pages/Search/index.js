import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import * as productServices from '~/services/productServices';
import ProductList from '~/components/ProductList';
import SearchBar from '~/components/SearchBar';
function Search() {
  const { keyword } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getProductsByKeyword(keyword, page || 1, 12);
      setData(result);
    };

    fetchApi();
  }, [keyword, page]);
  console.log(data);

  return (
    <>
      <SearchBar />
      {data !== undefined ? (
        <ProductList title={`Từ khóa: ${keyword} - Trang ${page || 1}`} data={data} />
      ) : (
        <h1>Loading . . .</h1>
      )}
    </>
  );
}

export default Search;

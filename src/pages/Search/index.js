import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import * as productServices from '~/services/productServices';
import ProductList from '~/components/ProductList';
import SearchBar from '~/components/SearchBar';
import { Skeleton } from '@mui/material';
function Search() {
  const { keyword } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [data, setData] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getProductsByKeyword(keyword, page || 1);
      if (result) {
        if (result.items.length > 0) setData(result);
      }
    };

    fetchApi();
  }, [keyword, page]);

  return (
    <>
      <SearchBar />
      {data !== undefined ? (
        <ProductList title={`Từ khóa: ${keyword} - Trang ${page || 1}`} data={data} />
      ) : (
        <Skeleton variant="rectangular" height={'100%'} />
      )}
    </>
  );
}

export default Search;

import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import * as categoryServices from '~/services/categoryServices';
import * as productServices from '~/services/productServices';
import ProductList from '~/components/ProductList';
import SearchBar from '~/components/SearchBar';
import CategoryList from './CategoryList';

function Category() {
  const { genreId } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [data, setData] = useState();
  const [genreName, setGenreName] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      if (genreId) {
        const result = await productServices.getProductsByGenreId(genreId, page || 1);
        setData(result);
      }
    };
    fetchApi();
  }, [genreId, page]);

  useEffect(() => {
    const fetchApi = async () => {
      if (genreId) {
        const result = await categoryServices.getCategoryById(genreId);
        setGenreName(result.name);
      }
    };
    fetchApi();
  }, [genreId]);

  return (
    <>
      <SearchBar />

      {genreId !== undefined ? (
        data !== undefined ? (
          <ProductList title={`Thể loại: ${genreName} - Trang ${page || 1}`} data={data} />
        ) : (
          <h1>Loading . . .</h1>
        )
      ) : (
        <CategoryList />
      )}
    </>
  );
}

export default Category;

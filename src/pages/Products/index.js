import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import ProductList from '~/components/ProductList';
import SearchBar from '~/components/SearchBar';
import * as productServices from '~/services/productServices';

function Products() {
  // Gọi Api lấy sản phẩm
  //// Sau đó gắn vào Component
  const { keyword } = useParams();
  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const [data, setData] = useState();
  const [title, setTitle] = useState('Sản phẩm');
  useEffect(() => {
    const fetchApi = async () => {
      var result;
      switch (keyword) {
        case 'latest': {
          result = await productServices.getLatestProduct(page || 1);
          setTitle('Sản phẩm mới');
          break;
        }
        case 'best-seller': {
          result = await productServices.getBestSellerProduct(page || 1);
          setTitle('Bán chạy');
          break;
        }
        case 'specials': {
          result = await productServices.getSalesProduct(page || 1);
          setTitle('Khuyến mãi');
          break;
        }
        default: {
          result = await productServices.getAllProduct(page || 1);
          setTitle('Tất cả sản phẩm');
          break;
        }
      }
      setData(result);
    };

    fetchApi();
  }, [keyword, page]);

  return (
    <>
      <SearchBar />
      {data !== undefined ? (
        <ProductList title={`${title} - Trang ${page || 1}`} data={data} />
      ) : (
        <h1>Loading . . .</h1>
      )}
    </>
  );
}

export default Products;

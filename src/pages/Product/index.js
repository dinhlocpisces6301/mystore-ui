import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';
import { useEffect, useState } from 'react';

import * as productServices from '~/services/productServices';

function Product() {
  const { productId } = useParams();
  const [value, setValue] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await productServices.getProductById(productId);
      setValue(result);
    };

    fetchApi();
  }, [productId]);
  return <ProductDetail data={value} />;
}

export default Product;

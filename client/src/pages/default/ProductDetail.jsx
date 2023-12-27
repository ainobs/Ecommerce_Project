import ImageSection from '../../component/product/ImageSection';
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { useEffect, useState } from 'react';
import Loading from '../../component/loading';

const ProductDetail = () => {
  const { id } = useParams();
  console.log('id', id);
  const { fetchProductById } = useProduct();
  const [product, setProduct] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  useEffect(() => {
    async function fetchData() {
      if (id) {
        setLoadingPage(true);
        const currentProduct = await fetchProductById(id);

        if (currentProduct) {
          setProduct(currentProduct);
        }
        setLoadingPage(false);
      } else {
        setLoadingPage(false);
      }
    }
    fetchData();
  }, [id]);

  if (loadingPage) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto p-4 ">
      {!product ? (
        <div className="text-primary text-center p-6"> Product not found</div>
      ) : (
        <ImageSection product={product} />
      )}
      {/* <RelatedProducts /> */}
    </div>
  );
};

export default ProductDetail;

import { Link } from 'react-router-dom';
import { BsCurrencyPound } from 'react-icons/bs';

const Product = (product) => {
  return (
    <Link to={`/product/${product._id}`} className="flex-shrink-0 w-56">
      <img
        src={product.images[0]}
        alt={product.name}
        className="w-56 h-80 rounded-lg"
      />
      <div className="flex items-center justify-between mt-2">
        <p className="text-lg font-semibold w-1/2 overflow-hidden whitespace-nowrap text-ellipsis">
          {product.name}
        </p>
        <div className="flex gap-4 items-center">
          {product.costPrice !== null && (
            <p className="text-gray-500 line-through text-sm flex gap- items-center ">
              <BsCurrencyPound />
              {product.costPrice}
            </p>
          )}
          {product.sellingPrice !== null && (
            <p className="text-orange-600 font-medium flex gap- items-center">
              <BsCurrencyPound />
              {product.sellingPrice}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Product;

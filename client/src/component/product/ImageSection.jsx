import React, { useState } from 'react';
import ProductImageCarousel from './ProductImageCarousel';
import SizeSelect from './SizeSelect';
import ColorSelect from './ColorSelect';
import QuantitySelect from './QuantitySelectProps';
import ProductOverview from './ProductOverview';
import useCart from '../../hooks/useCart';
import useNotification from '../../hooks/useNotification';
import { BsCurrencyPound } from 'react-icons/bs';

const ImageSection = ({ product }) => {
  const { addToCart } = useCart();
  const { addNotification } = useNotification();
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (quantity < 1) {
      addNotification('Select a valid quantity');
      return;
    }
    if (product.sizes.length && !selectedSize) {
      addNotification('Select prefered size');
      return;
    }
    if (product.colors.length && !selectedColor) {
      addNotification('Select prefered color');
      return;
    }
    addToCart({ ...product, quantity, selectedSize, selectedColor });
    addNotification('Item added to cart');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* First Column (Product Images) */}
        <div className="md:col-span-1 mx-4 ">
          <div className="md:hidden ">
            {/* Display custom image carousel for mobile */}
            <ProductImageCarousel>
              {product.images.map((image) => (
                <div
                  key={image}
                  className="h-[500px] "
                  style={{ width: 'calc(100vw - 60px)' }}
                >
                  <img src={image} className="w-full h-full object-contain " />
                </div>
              ))}
            </ProductImageCarousel>
          </div>
          <div className="flex-col gap-8 hidden md:flex">
            {product.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(image)}
                className="cursor-pointer"
              >
                <img
                  src={image}
                  alt={`Product Image ${index + 1}`}
                  className={`w-full h-auto rounded-md border border-gray-300 ${
                    selectedImage === image ? 'border-primary' : ''
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Column (Selected Image) */}
        <div className="hidden md:block md:col-span-3">
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected Product Image"
              className="w-full h-auto rounded-md border object-contain border-gray-300"
            />
          )}
        </div>
      </div>
      {/* Third Column (Product Details) */}
      <div className="md:col-span-1 md:ml-8">
        {/* Product details go here */}
        <h2 className="text-3xl md:text-4xl font-medium mb-4">
          {product.name}
        </h2>
        <div className="flex items-center gap-8">
          <p className="text-xl font-semibold text-primary mb-4 flex items-center ">
            <BsCurrencyPound />
            {product.sellingPrice}
          </p>
          <p className="font-medium line-through text-gray-400 mb-4 flex items-center ">
            <BsCurrencyPound />
            {product.costPrice}
          </p>
        </div>
        <p className="mb-4">{product.description}</p>

        <SizeSelect
          availableSizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={handleSizeSelect}
        />
        <ColorSelect
          availableColors={product.colors}
          selectedColor={selectedColor}
          onSelectColor={handleColorSelect}
        />
        <QuantitySelect
          quantity={quantity}
          onDecrement={decrementQuantity}
          onIncrement={incrementQuantity}
        />

        {/* Add more product details as needed */}
        <button
          onClick={handleAddToCart}
          className={`bg-orange-500 h-14 w-full rounded-full text-white  uppercase text-xl font-medium`}
        >
          Add to Cart
        </button>
        <div className="border w-full my-10" />
        <ProductOverview
          category={product.category}
          tags={product.tags}
          brand={product.brand}
        />
      </div>
    </div>
  );
};

export default ImageSection;

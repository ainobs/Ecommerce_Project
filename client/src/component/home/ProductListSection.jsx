// src/components/ProductListSection.tsx

import { useEffect, useRef, useState } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import Product from '../Product';
import { Link } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';

const ProductListSection = () => {
  const { products } = useProduct();
  const scrollRef = useRef(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const cardWidth = 224;
  const margin = 24;

  useEffect(() => {
    const container = scrollRef.current;

    function handleScroll() {
      setScrollLeft(container?.scrollLeft || 0);
    }

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleScrollLeft = () => {
    const container = scrollRef.current;

    if (container) {
      const newScrollLeft = scrollLeft - cardWidth - margin;

      container.scrollTo({
        left: Math.max(newScrollLeft, 0),
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    const container = scrollRef.current;

    if (container) {
      const newScrollLeft = scrollLeft + cardWidth + margin;

      container.scrollTo({
        left: Math.min(
          newScrollLeft,
          container.scrollWidth - container.clientWidth
        ),
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="py-8 px-4">
      <div className="container mx-auto relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">New Product</h2>
        <button
          onClick={handleScrollLeft}
          className="hidden md:block absolute top-1/2 left-4 transform rounded-full p-2  -translate-y-1/2 text-2xl text-gray-500 bg-orange-300 hover:bg-orange-500"
        >
          <BsChevronLeft className="text-3xl  text-white" />
        </button>
        <button
          onClick={handleScrollRight}
          className="hidden md:block absolute top-1/2 right-4 transform rounded-full p-2 -translate-y-1/2 text-2xl bg-orange-300 hover:bg-orange-500"
        >
          <BsChevronRight className="text-3xl  text-white" />
        </button>
        <div
          className="overflow-x-auto flex space-x-6 no-scrollbar"
          ref={scrollRef}
        >
          {products.map((product) => (
            <Product key={product._id} {...product} />
          ))}
          <Link
            to="/search"
            className="w-56 h-80 bg-orange-500 bg-opacity-10 rounded-lg flex justify-center items-center font-bold text-lg whitespace-nowrap p-4 "
          >
            See More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductListSection;

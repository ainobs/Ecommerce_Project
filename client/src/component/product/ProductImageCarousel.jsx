import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ProductImageCarousel = ({ children }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = children.length;
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50 && currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }

    if (touchStart - touchEnd < -50 && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToPreviousImage = () => {
    const newIndex =
      currentSlide === 0 ? children.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const goToNextImage = () => {
    const newIndex =
      currentSlide === children.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };

  return (
    <div className="relative w-full overflow-hidden">
      <div
        className={`flex transition-transform transform duration-300 ease-in-out `}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: `${totalSlides * 100}%`,
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {React.Children.map(children, (child, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 flex items-center justify-start"
            style={{ flex: `0 0 100%` }}
          >
            {child}
          </div>
        ))}
      </div>

      <div
        onClick={goToPreviousImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 h-10 w-10 justify-center items-center flex text-xl opacity-60 hover:opacity-100 focus:outline-none"
      >
        <FaChevronLeft />
      </div>
      <div
        onClick={goToNextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 h-10 w-10 justify-center items-center flex text-xl opacity-60 hover:opacity-100 focus:outline-none"
      >
        <FaChevronRight />
      </div>
    </div>
  );
};

export default ProductImageCarousel;

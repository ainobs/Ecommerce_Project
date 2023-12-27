// src/components/HeroCarousel.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();
  const slides = [
    {
      image: '/images/hero1.jpg',
      text: 'Discover',
      text1: 'Trendy Styles',
    },
    {
      image: '/images/hero2.jpg',
      text: 'New Season',
      text1: ' New Looks',
    },
    {
      image: '/images/hero3.jpg',
      text: 'Elevate',
      text1: 'Your Wardrobe',
    },
    {
      image: '/images/hero4.jpg',
      text: 'Shop',
      text1: 'Designer Collections',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((activeSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSlide, slides.length]);

  return (
    <div className="relative w-full h-[300px] md:h-[600px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity ${
            activeSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col gap-4 items-center uppercase">
              <h2 className="text-2xl md:text-4xl font-bold text-orange-500">
                {slide.text}
              </h2>
              <h2 className="text-4xl md:text-6xl font-bold  whitespace-nowrap">
                {slide.text1}
              </h2>
              <button
                onClick={() => navigate('/search')}
                className=" bg-orange-500 text-white rounded-full py-2 px-6"
              >
                Shop
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-4 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-4 w-4 rounded-full ${
              activeSlide === index ? 'bg-white' : 'bg-gray-400'
            }`}
            onClick={() => setActiveSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

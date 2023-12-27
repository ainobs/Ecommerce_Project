import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Radio from './Radio';
import { categories } from '../constant/categories';
import { BsCurrencyPound } from 'react-icons/bs';

const ColorCircle = ({ color, active, onClick }) => {
  const circleStyle = {
    width: '24px',
    height: '24px',
    background: color,
    borderRadius: '50%',
    cursor: 'pointer',
    margin: '2px',
    boxShadow: active ? '0 0 0 3px rgba(0, 0, 0, 0.2)' : 'none',
  };

  return <div style={circleStyle} onClick={() => onClick(color)} />;
};

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const Filter = ({ onApplyFilters }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: [],
    price: [0, 100000], // Default price range
    size: '',
    color: '',
  });
  console.log(selectedFilters);
  useEffect(() => {
    if (Object.values(selectedFilters).every((val) => val === '')) {
      onApplyFilters({
        category: [],
        price: [0, 100000],
        size: '',
        color: '',
      });
    } else {
      onApplyFilters(selectedFilters);
    }
  }, [selectedFilters]);

  const handleCategoryFilter = (category) => {
    setSelectedFilters({
      ...selectedFilters,
      category: [category],
    });
  };

  const handlePriceFilter = (priceRange) => {
    if (Array.isArray(priceRange)) {
      setSelectedFilters({
        ...selectedFilters,
        price: [priceRange[0], priceRange[1]],
      });
    } else {
      setSelectedFilters({
        ...selectedFilters,
        price: [0, priceRange],
      });
    }
  };

  const handleSizeFilter = (size) => {
    setSelectedFilters({
      ...selectedFilters,
      size,
    });
  };

  const handleColorFilter = (color) => {
    setSelectedFilters({
      ...selectedFilters,
      color,
    });
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: [],
      price: [0, 100000],
      size: [],
      color: [],
    });
  };

  const applyFilters = () => {
    onApplyFilters(selectedFilters);
  };

  return (
    <div className="p-4 h-full rounded md:bg-orange-50">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-4">Category</h3>
        <Radio
          checked={selectedFilters.category.includes('all')}
          label={'All'}
          onChange={() => handleCategoryFilter('all')}
        />
        {categories.map((category) => (
          <Radio
            checked={selectedFilters.category.includes(category.name)}
            label={category.name}
            onChange={() => handleCategoryFilter(category.name)}
          />
        ))}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-4">Price</h3>
        <div
          className="mb-1 cursor-pointer"
          onClick={() => handlePriceFilter([0, 100000])}
        >
          All
        </div>
        <Slider
          range
          min={0}
          max={100000} // You can adjust the max price as needed
          value={selectedFilters.price}
          onChange={handlePriceFilter}
          handleStyle={{
            borderColor: '#FFA500', // Orange border color for handles
          }}
          trackStyle={[
            {
              backgroundColor: '#FFA500', // Orange color for the track
            },
          ]}
          railStyle={{
            backgroundColor: '#E5E7EB', // Gray color for the rail
          }}
        />
        <div className="flex justify-between">
          <span className="flex items-center  ">
            <BsCurrencyPound />
            {selectedFilters.price[0]}
          </span>
          <span className="flex items-center  ">
            <BsCurrencyPound />
            {selectedFilters.price[1]}
          </span>
        </div>
      </div>

      {/* Size Filter */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-4">Size</h3>
        <div
          className="mb-1 cursor-pointer"
          onClick={() => handleSizeFilter('all')}
        >
          All
        </div>
        <div className="flex items-center gap-4">
          {sizes.map((size) => (
            <div
              key={size}
              className={`p-2 border h-6 flex items-center text-xs font-medium justify-center w-6 rounded cursor-pointer ${
                selectedFilters.size === size ? 'bg-orange-500 text-white' : ''
              }`}
              onClick={() => handleSizeFilter(size)}
            >
              {size}
            </div>
          ))}
        </div>
        {/* Add more sizes as needed */}
      </div>

      {/* Color Filter */}
      <div className="mb-6">
        <h3 className="text-md font-semibold mb-4">Color</h3>
        <div
          className="mb-1 cursor-pointer"
          onClick={() => handleColorFilter('all')}
        >
          All
        </div>
        <div className="flex gap-2">
          <ColorCircle
            color="red"
            active={selectedFilters.color === 'red'}
            onClick={handleColorFilter}
          />
          <ColorCircle
            color="blue"
            active={selectedFilters.color === 'blue'}
            onClick={handleColorFilter}
          />
          <ColorCircle
            color="green"
            active={selectedFilters.color === 'green'}
            onClick={handleColorFilter}
          />
          {/* Add more color circles as needed */}
        </div>
      </div>

      <div className="justify-between hidden">
        <button onClick={clearFilters} className="text-sm text-gray-500">
          Clear
        </button>
        <button
          onClick={applyFilters}
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;

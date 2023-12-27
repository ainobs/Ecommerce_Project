// SizeSelect.tsx
import React from 'react';

const SizeSelect = ({ availableSizes, selectedSize, onSelectSize }) => {
  return (
    <div className="mb-4">
      <label className="block  font-semibold mb-2">
        Select Size
        {selectedSize &&
          availableSizes.map((size) => {
            if (selectedSize === size.size) {
              return `: ${size.quantity} Left `;
            }
          })}
      </label>
      <div className="flex space-x-5">
        {availableSizes.map((size, index) => (
          <div
            key={index}
            onClick={() => onSelectSize(size.size)}
            className={`cursor-pointer border flex uppercase justify-center items-center rounded-sm w-10 h-10 bg-orange-500 bg-opacity-20 p-2 ${
              selectedSize === size.size ? 'bg-opacity-100 text-white' : ''
            }`}
          >
            {size.size}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelect;

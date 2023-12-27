import React from 'react';

const ColorSelect = ({ availableColors, selectedColor, onSelectColor }) => {
  return (
    <div className="mb-4">
      <label className="block  font-semibold mb-2">Select Color</label>
      <div className="flex space-x-5">
        {availableColors.map((color, index) => (
          <div
            key={index}
            onClick={() => onSelectColor(color)}
            className={`cursor-pointer w-10 h-10 rounded-full ${
              selectedColor === color ? `border-2 border-primary` : ''
            }`}
            style={{ backgroundColor: color.toLowerCase() }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorSelect;

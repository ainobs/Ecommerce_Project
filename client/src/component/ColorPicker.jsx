import React, { useState } from 'react';
import { CompactPicker } from 'react-color';
import { AiOutlineClose } from 'react-icons/ai';

const ColorPicker = ({ availableColors, setAvailableColors }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#FF5733'); // Default color

  // Function to add a color to the available colors
  const addColor = (value) => {
    setSelectedColor(value);
    setShowColorPicker(false);
    setAvailableColors([...availableColors, value]);
  };

  // Function to remove a color from the available colors
  const removeColor = (color) => {
    const updatedColors = availableColors.filter((c) => c !== color);
    setAvailableColors(updatedColors);
  };

  return (
    <div className="relative flex gap-4 ">
      <div
        className=" flex w-1/3 py-2 text-white rounded items-center justify-center cursor-pointer bg-orange-500"
        onClick={() => setShowColorPicker(!showColorPicker)}
      >
        Add Color
      </div>

      {showColorPicker && (
        <div className="absolute z-10 top-0 mt-16">
          <CompactPicker
            color={selectedColor}
            onChange={(color) => addColor(color.hex)}
          />
        </div>
      )}

      <div className="flex space-x-2">
        {availableColors.map((color, index) => (
          <div
            key={index}
            className="flex w-10 h-10 rounded-full justify-center items-center"
            style={{ backgroundColor: color }}
            onClick={() => removeColor(color)}
          >
            <AiOutlineClose />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;

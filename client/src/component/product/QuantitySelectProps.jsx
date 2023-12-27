// QuantitySelect.tsx
import React from 'react';

const QuantitySelect = ({ quantity, onDecrement, onIncrement }) => {
  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">Quantity</label>
      <div className="flex items-center justify-center max-w-[100px] border rounded py-2 px-4">
        <button className="text-2xl" onClick={onDecrement}>
          -
        </button>
        <span className="mx-4">{quantity}</span>
        <button className="text-lg" onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelect;

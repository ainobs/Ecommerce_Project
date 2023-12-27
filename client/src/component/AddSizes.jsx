import React, { useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Switch from './Switch';

const AddSizes = ({
  sizes,
  setSizes,
  totalCountInStock,
  setTotalCountInStock,
}) => {
  const [requireSize, setRequireSize] = useState(sizes.length > 0);
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(0);

  const toggleSizeRequirement = () => {
    setRequireSize(!requireSize);
    if (!requireSize) {
      // Reset sizes and total count in stock when switching to size requirement
      setSizes([]);
      setTotalCountInStock(0);
    }
  };

  const addSize = () => {
    if (size.trim() !== '' && quantity > 0) {
      setSizes([...sizes, { size, quantity }]);
      setSize('');
      setQuantity(0);
    }
  };

  const removeSize = (size) => {
    const updatedSizes = sizes.filter((s) => s.size !== size);
    setSizes(updatedSizes);
  };

  const calculateTotalCountInStock = () => {
    let total = 0;
    sizes.forEach((sizeData) => {
      total += sizeData.quantity;
    });
    setTotalCountInStock(total);
  };

  useEffect(() => {
    if (requireSize) calculateTotalCountInStock();
  }, [sizes]);

  return (
    <div className="">
      <label className="font-semibold">Add Size</label>
      {/* Switch to Toggle Size Requirement */}
      <div className="mb-2 flex items-center gap-4">
        <label className="text-sm text-gray-600 ">Item Require Size:</label>
        <Switch onToggle={toggleSizeRequirement} value={requireSize} />
      </div>

      {/* Size Input Section (Conditionally Rendered) */}
      {requireSize && (
        <div className="">
          <div className="flex items-center ">
            <input
              type="text"
              value={size}
              placeholder="Add Size"
              className={
                'p-2 focus:outline-none border focus:border-orange-500'
              }
              onChange={(e) => setSize(e.target.value)}
            />
            <input
              type="number"
              value={quantity}
              placeholder="Quantity available"
              className={
                'p-2 focus:outline-none border focus:border-orange-500'
              }
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
            <button
              className={`bg-orange-500 text-white font-medium px-4 py-2 rounded ml-2`}
              onClick={addSize}
            >
              Add
            </button>
          </div>
          <div className="flex items-center gap-4 flex-wrap mt-2">
            {sizes.map((sizeData, index) => (
              <div
                key={index}
                className="flex items-center bg-orange-500 rounded bg-opacity-10 gap-2 py-1 px-2 "
              >
                <div className="uppercase">{sizeData.size}</div> -{' '}
                <div>{sizeData.quantity}</div>{' '}
                <AiOutlineClose
                  className="text-orange-500 text-sm"
                  onClick={() => removeSize(sizeData.size)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Total Count in Stock Input */}
      {!requireSize && (
        <div className=" flex">
          <label className="font-semibold mr-4">Total Count in Stock:</label>
          <input
            type="number"
            value={totalCountInStock}
            onChange={(e) => setTotalCountInStock(parseInt(e.target.value))}
            placeholder="Total Count"
            className={'p-2 focus:outline-none border focus:border-orange-500'}
          />
        </div>
      )}
    </div>
  );
};

export default AddSizes;

import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const ProductTagsInput = ({ tags, setTags }) => {
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (index) => {
    const updatedTags = [...tags];
    updatedTags.splice(index, 1);
    setTags(updatedTags);
  };

  return (
    <div>
      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Enter tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          className="px-2 py-3 border rounded-l focus:outline-orange-500 w-full"
        />
        <button
          onClick={handleAddTag}
          className="bg-orange-500 text-white px-4 py-2 rounded-r hover:bg-opacity-80"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-orange-500 text-white px-4 py-1 rounded-full flex items-center"
          >
            <span className="mr-2">{tag}</span>
            <button
              onClick={() => handleRemoveTag(index)}
              className="text-xs font-bold hover:underline focus:outline-none"
            >
              <AiOutlineClose className="text-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTagsInput;

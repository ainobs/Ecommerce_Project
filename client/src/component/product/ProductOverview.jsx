import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductOverview = ({ category, brand, tags }) => {
  const navigate = useNavigate();
  return (
    <div className="mb-4 flex items-center gap-8">
      <div className="mb-2 flex flex-col gap-4">
        <div className="">Category</div>
        <div className="">brand</div>
        <div className="">Tags</div>
      </div>
      <div className="mb-2 flex flex-col flex-1 gap-4">
        <div>: {category}</div>
        <div>: {brand}</div>
        <div className="flex items-center ">
          :{' '}
          <div className="flex items-center flex-wrap gap-2 ml-2">
            {tags.map((tag) => (
              <div
                onClick={() => navigate(`/search?tag=${tag}`)}
                className="px-2 py-1 text-sm cursor-pointer rounded-full border border-primary "
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;

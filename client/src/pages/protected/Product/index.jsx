import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useProduct } from '../../../hooks/useProduct';
import moment from 'moment';
import { BsCurrencyPound } from 'react-icons/bs';

const Product = () => {
  const navigate = useNavigate();
  const { products, deleteProduct } = useProduct();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10); // Number of products per page

  // Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Helper function to format the count in stock
  const getCountInStockClassName = (count) => {
    return count > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-primary font-semibold mb-4">Product List</h2>

      <div className="flex flex-col md:flex-row items-center mb-8 gap-4">
        {/* Search functionality */}
        <input
          type="text"
          placeholder="Search..."
          className={`$md:w-2/3  flex-1 focus:outline-none border p-2 rounded focus:border-orange-500`}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => navigate('/dashboard/products/new')}
          className={`bg-orange-500 py-2 px-4 rounded-full text-white font-medium md:w-1/3`}
        >
          Add Product
        </button>
      </div>

      {/* Product table */}
      <table className="w-full border-collapse table-auto">
        <thead>
          <tr>
            <th className="text-left bg-primary bg-opacity-10 p-4">Image</th>
            <th className="text-left bg-primary bg-opacity-10 p-4">Name</th>
            <th className="text-left bg-primary bg-opacity-10 p-4">
              Count in Stock
            </th>
            <th className="text-left bg-primary bg-opacity-10 p-4">
              Created Date
            </th>
            <th className="text-left bg-primary bg-opacity-10 p-4">Price</th>
            <th className="text-left bg-primary bg-opacity-10 p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.length < 1 ? (
            <div className="py-4">No product available</div>
          ) : (
            currentProducts
              .filter((product) =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <tr key={product._id}>
                  <td className=" px-4 py-2">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover"
                      onClick={() => navigate(`/product/${product._id}`)}
                    />
                  </td>
                  <td
                    className=" px-4 py-2"
                    onClick={() => navigate(`/product/${product._id}`)}
                  >
                    {product.name}
                  </td>
                  <td
                    className={` px-4 py-2 ${getCountInStockClassName(
                      product.countInStock
                    )}`}
                  >
                    {product.countInStock}
                  </td>
                  <td className=" px-4 py-2">
                    {moment(product.createdAt).calendar()}
                  </td>
                  <td className=" px-4 py-2 flex items-center">
                    <BsCurrencyPound />
                    {product.sellingPrice.toFixed(2)}
                  </td>
                  <td className=" px-4 py-2">
                    <button
                      onClick={() => navigate(`edit/${product._id}`)}
                      className="mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="text-red-500"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4">
        {Array.from({
          length: Math.ceil(products.length / productsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 border ${
              currentPage === index + 1 ? 'bg-gray-300' : ''
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Product;

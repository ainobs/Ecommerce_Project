import { useEffect, useState } from 'react';
import { BsFilterRight } from 'react-icons/bs';
import Filter from '../../component/Filter';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useProduct } from '../../hooks/useProduct';
import { BsCurrencyPound } from 'react-icons/bs';

const Search = () => {
  const navigate = useNavigate();
  const { searchProducts } = useProduct();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const category = searchParams.get('category') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const size = searchParams.get('size') || '';
  const color = searchParams.get('color') || '';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const itemsPerPage = 8; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await searchProducts({
        query,
        category,
        minPrice,
        maxPrice,
        size,
        color,
      });
      console.log('result', result);
      setProducts(result);
    };
    fetchProduct();
  }, [query, category, minPrice, maxPrice, size, color]);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = products.slice(firstItemIndex, lastItemIndex);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleApplyFilter = (value) => {
    console.log(value);
    const { category, price, size, color } = value;
    const queryString = `query=${query}&category=${category}&minPrice=${price[0]}&maxPrice=${price[1]}&size=${size}&color=${color}`;
    navigate(`/search?${queryString}`);
  };

  return (
    <div className="">
      <div className="relative">
        {/* Sidebar */}
        <div
          className={`absolute inset-y-0 left-0 bg-white w-full md:w-64  transition-transform transform ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full md:translate-x-0'
          }`}
        >
          <BsFilterRight
            onClick={toggleSidebar}
            className="text-orange-500 absolute right-4 top-4 text-3xl md:hidden"
          />
          <Filter onApplyFilters={handleApplyFilter} />
        </div>

        {/* Content area */}
        <div className={`flex-1 p-4 ${'ml-0 md:ml-64 overflow-x-hidden'}`}>
          {/* Mobile menu button */}
          <div className=" flex items-center justify-between">
            <button
              onClick={toggleSidebar}
              className="flex md:hidden items-center gap-2 bg-orange-500 text-white px-4 py-1 rounded"
            >
              <BsFilterRight className="text-primary text-3xl" />
              Filter
            </button>
            <div className="hidden md:block">
              <p className="text-gray-500">
                Showing results for "
                <span className="text-black font-medium">{query}</span>" (
                {products.length} items)
              </p>
            </div>
            <div className="">
              {/* Sorting Dropdown */}
              <select className="bg-white border rounded-md py-2 px-4">
                <option value="relevance">Sort by Relevance</option>
                <option value="price">Sort by Price</option>
                {/* Add more sorting options as needed */}
              </select>
            </div>
          </div>
          <p className="md:hidden text-gray-500 text-center py-4">
            Showing results for "{}" ({products.length} items)
          </p>

          {/* Content */}
          <main className="h-screen flex flex-col justify-between">
            <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentItems.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className=" rounded-md"
                >
                  <img
                    src={product.images[0]}
                    className="w-full h-80 object-cover rounded-md"
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-lg font-semibold w-1/2 overflow-hidden whitespace-nowrap text-ellipsis ">
                      {product.name}
                    </p>
                    <div className="flex gap-4 items-center">
                      {product.costPrice !== null && (
                        <p className="text-gray-500 flex items-center line-through text-sm">
                          <BsCurrencyPound />
                          {product.costPrice}
                        </p>
                      )}
                      {product.sellingPrice !== null && (
                        <p className="text-orange-600 flex items-center font-medium">
                          <BsCurrencyPound />
                          {product.sellingPrice}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handlePrevPage}
                className={`mx-2 px-3 py-1 text-orange-500 font-medium ${
                  currentPage === 1 ? ' text-orange-200 cursor-not-allowed' : ''
                }`}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-2 px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-orange-500 text-white'
                      : 'bg-white text-gray-600'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={handleNextPage}
                className={`mx-2 px-3 py-1 rounded-md text-orange-500 font-medium${
                  currentPage === totalPages
                    ? 'bg-white text-orange-200 cursor-not-allowed'
                    : ''
                }`}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Search;

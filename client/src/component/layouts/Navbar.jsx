import { CiSearch, CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import { blackIcon } from '../../styles/icon';
import Search from '../Search';
import { categories } from '../../constant/categories';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { useEffect, useRef, useState } from 'react';
import img from '../../../public/images/logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    // Close the dropdown when clicking outside of it
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <nav className="shadow mb-4 z-10">
      {/* <div className="bg-black text-center text-white">Welcome to ...</div> */}
      {/* First Row: Logo, Search, Sign Up/Login */}
      <div className="flex items-center justify-between p-4  md:px-8">
        <Link to="/" className="text-xl font-bold text-orange-500">
        <img src={img} />
        </Link>
        <Search />
        <div className="flex gap-4 items-center">
          <CiSearch className={`${blackIcon} md:hidden`} />

          <Link to="/cart" className="relative ">
            <CiShoppingCart className={blackIcon} />
            {cart.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-orange-500 rounded-full text-white text-xs flex justify-center items-center w-4 h-4">
                {cart.length}
              </div>
            )}
          </Link>
          {user ? (
            <div className="" ref={dropdownRef}>
              <div
                onClick={toggleDropdown}
                className="cursor-pointer flex items-center gap-2"
              >
                <img
                  src={user.image}
                  alt={user.firstName}
                  className="w-8 h-8 object-cover rounded-full"
                />
                <span className="mx-2 capitalize text-lg font-medium">
                  {user.firstName}
                </span>
              </div>

              {isDropdownOpen && (
                <div className="absolute right-0 z-50 top-16 mt-2 w-48 flex flex-col gap-2 bg-white p-4 border rounded shadow-md">
                  <Link
                    to="/dashboard/stat"
                    className="flex items-center gap-2 hover:bg-orange-500 hover:bg-opacity-10 py-2 px-2 rounded "
                  >
                    Dashboard
                  </Link>
                  <div
                    onClick={logout}
                    className="flex items-center gap-2 text-red-500 hover:text-orange-500 cursor-pointer py-2 px-2 rounded "
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to={'/auth/login'}>
              <button className="px-4 py-2 bg-orange-600 font-medium text-white rounded-full">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Second Row: Categories */}
      <ul className="hidden md:flex pb-4 px-4 lg:flex lg:space-x-8 items-center justify-center">
        {categories.map((category) => (
          <li key={category.name} className="relative group inline-block">
            <Link
              to={`/search?category=${category.name}`}
              className="uppercase font-medium hover:text-orange-500"
            >
              {category.name}
            </Link>
            {category.subcategories && (
              <div className="hidden z-10 rounded-md group-hover:block absolute bg-white p-2 space-y-2">
                {category.subcategories.map((subcategory) => (
                  <div key={subcategory.name}>
                    <Link
                      key={subcategory.name}
                      to={`/search?category=${subcategory.name}`}
                      className="font-medium hover:text-orange-500 whitespace-nowrap"
                    >
                      {subcategory.name}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

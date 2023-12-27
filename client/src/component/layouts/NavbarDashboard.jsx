import { CiSearch, CiShoppingCart } from 'react-icons/ci';
import { Link } from 'react-router-dom';

import { blackIcon } from '../../styles/icon';
import Search from '../Search';
import { categories } from '../../constant/categories';

const NavbarDashboard = () => {
  return (
    <nav className="shadow mb-4 z-10">
      <div className="bg-black text-center text-white">Welcome to ...</div>
      {/* First Row: Logo, Search, Sign Up/Login */}
      <div className="flex items-center justify-between p-4  md:px-8">
        <Link to="/" className="text-xl font-bold text-orange-500">
          Your Logo
        </Link>
        <Search />
        <div className="flex gap-4 items-center">
          <CiSearch className={`${blackIcon} md:hidden`} />
          <Link to="/cart">
            <CiShoppingCart className={blackIcon} />
          </Link>
          <Link to={'/auth/login'}>
            <button className="px-4 py-2 bg-orange-600 font-medium text-white rounded-full">
              Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Second Row: Categories */}
      <ul className="hidden md:flex pb-4 px-4 lg:flex lg:space-x-8 items-center justify-center">
        {categories.map((category) => (
          <li key={category.name} className="relative group inline-block">
            <Link
              to={`/search?query=${category.name}`}
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
                      to={`/search?query=${subcategory.name}`}
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

export default NavbarDashboard;

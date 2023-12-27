import { NavLink } from 'react-router-dom';
import {
  FiBarChart,
  FiHome,
  FiShoppingBag,
  FiShoppingCart,
  FiUser,
} from 'react-icons/fi';
import useAuth from '../../hooks/useAuth';

const links = [
  { to: '/dashboard/stat', text: 'Dashboard', icon: <FiHome /> },
  { to: '/dashboard/orders', text: 'Orders', icon: <FiShoppingCart /> },
  { to: '/dashboard/profile', text: 'Profile', icon: <FiUser /> },
  // Add more links as needed
];

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <div className="py-6 px-4 md:border-r border-orange-500 h-full">
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `${
                  isActive ? 'bg-orange-200' : ''
                } text-orange-500  hover:bg-orange-100 rounded-md p-2 flex items-center`
              }
            >
              {link.icon && <span className="mr-2">{link.icon}</span>}
              {link.text}
            </NavLink>
          </li>
        ))}
        {user && user.role === 'Admin' && (
          <>
            <li>
              <NavLink
                to={'/dashboard/products'}
                className={({ isActive }) =>
                  `${
                    isActive ? 'bg-orange-200' : ''
                  } text-orange-500  hover:bg-orange-100 rounded-md p-2 flex items-center`
                }
              >
                <FiShoppingBag className="mr-2" />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/dashboard/admin'}
                className={({ isActive }) =>
                  `${
                    isActive ? 'bg-orange-200' : ''
                  } text-orange-500  hover:bg-orange-100 rounded-md p-2 flex items-center`
                }
              >
                <FiBarChart className="mr-2" />
                Analitics
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;

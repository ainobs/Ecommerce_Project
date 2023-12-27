import { FiHome, FiBarChart2, FiUsers } from 'react-icons/fi';
import { useOrder } from '../../hooks/useOrder';
import useAuth from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import { useProduct } from '../../hooks/useProduct';

const AdminStats = () => {
  const { orders } = useOrder();
  const { products } = useProduct();
  const { getAllUser } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getAllUser();
      if (result) {
        setUsers(result);
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="flex h-full">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b shadow">
          <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold">Admin Stats</h1>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto h-full bg-orange-200">
          <div className="container mx-auto my-4 p-4">
            {/* Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Widget 1 */}
              <div className="bg-white p-4 rounded-md shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Users</p>
                    <p className="text-lg font-semibold">{users.length}</p>
                  </div>
                  <FiUsers className="text-3xl text-blue-500" />
                </div>
              </div>

              {/* Widget 2 */}
              <div className="bg-white p-4 rounded-md shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Orders</p>
                    <p className="text-lg font-semibold">{orders.length}</p>
                  </div>
                  <FiBarChart2 className="text-3xl text-green-500" />
                </div>
              </div>

              {/* Widget 3 */}
              <div className="bg-white p-4 rounded-md shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Poducts</p>
                    <p className="text-lg font-semibold">{products.length}</p>
                  </div>
                  <FiHome className="text-3xl text-orange-500" />
                </div>
              </div>
            </div>

            {/* Additional Content Goes Here */}
            {/* Add charts, tables, or other components */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminStats;

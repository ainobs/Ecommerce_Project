import { useEffect, useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { useOrder } from '../../hooks/useOrder';

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const { getUserOrders } = useOrder();
  useEffect(() => {
    const fetchOrders = async () => {
      const result = await getUserOrders();
      console.log('result', result);
      setOrders(result);
    };
    fetchOrders();
  }, []);

  // const recentActivities = [
  //   { id: 1, description: 'Logged in' },
  //   { id: 2, description: 'Updated profile' },
  //   // Add more activities
  // ];

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8 text-orange-500">Welcome</h1>

      {/* Order Statistics */}
      <div className="mb-8">
        <div className="flex flex-col justify-center items-center bg-orange-200 rounded-lg p-6 shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Total Orders</h2>
          <div className="flex items-center mb-4">
            <FiShoppingCart className="text-2xl text-orange-600 mr-2" />
            <p className="text-2xl text-gray-700">{orders.length}</p>
          </div>
        </div>
        <div className="p-4 shadow-md rounded-lg ">
          <h3 className="text-xl font-bold mb-2 text-gray-800">
            Order History
          </h3>
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="text-left">Order ID</th>
                <th className="text-left">Product Name</th>
                <th className="text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {orders.length < 1 ? (
                <div className="my-4">No Orders</div>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="text-gray-700">{order._id}</td>
                    <td className="text-gray-700">{order.products[0].name}</td>
                    <td className="text-gray-700">{order.totalPrice}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Activities */}
      {/* <div className="p-4 shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">
          Recent Activities
        </h2>
        <div className="flex items-center mb-4">
          <FiActivity className="text-2xl text-orange-600 mr-2" />
          <ul className="list-disc pl-6">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="text-gray-700">
                {activity.description}
              </li>
            ))}
          </ul>
        </div>
      </div> */}
    </div>
  );
};

export default DashboardPage;

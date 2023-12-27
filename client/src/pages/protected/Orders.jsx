import React, { useEffect, useState } from 'react';
import { useOrder } from '../../hooks/useOrder';
import Loading from '../../component/loading';
import moment from 'moment';
import { BsCurrencyPound } from 'react-icons/bs';

const Orders = () => {
  const { getUserOrders } = useOrder();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError('');
        const result = await getUserOrders();
        console.log('result', result);
        setOrders(result);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(error);
      }
    };
    fetchOrders();
  }, []);
  console.log('user order', orders);
  const filteredOrders = orders.filter((order) =>
    order._id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  return (
    <div className="">
      <h2 className="text-2xl font-semibold mb-4">Orders </h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by id..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        // className={`${inputStyleborder} mb-4 `}
      />

      {/* Orders Table - Desktop UI */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary bg-opacity-10">
              <th className="py-4 px-4 text-left">Id</th>
              <th className="py-4 px-4 text-left">Date</th>
              <th className="py-4 px-4 text-left">Payment</th>
              <th className="py-4 px-4 text-left">Amount</th>
              <th className="py-4 px-4 text-left">Status</th>
              <th className="py-4 px-4 text-left"></th>
            </tr>
          </thead>
          {loading ? (
            <Loading />
          ) : error ? (
            <div className="text-primary">{error}</div>
          ) : orders.length <= 0 ? (
            <div className="p-4">No Orders</div>
          ) : (
            <tbody>
              {filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="bg-white dark:bg-background-dark"
                >
                  <td className="py-3 px-4">{order._id}</td>
                  <td className="py-3 px-4">
                    {moment(order.createdAt).format('MMM Do YY')}
                  </td>
                  <td className="py-3 px-4">{order.paymentMethod}</td>
                  <td className="py-3 px-4 flex items-center">
                    <BsCurrencyPound />
                    {order.totalPrice}
                  </td>
                  <td className="py-3 px-4">{order.status}</td>
                  <td className="py-3 px-4">
                    <button className="bg-primary text-white px-3 py-1 rounded-lg transition duration-200">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Orders List - Mobile UI */}
      <div className="md:hidden divide-y border-t-4 border-primary border-opacity-20 bg-white dark:bg-background-dark">
        {/* {loading ? (
          <Loading />
        ) : error ? (
          <div className="text-primary">{error}</div>
        ) :*/}
        {orders.length <= 0 ? (
          <div className="">No Orders</div>
        ) : (
          filteredOrders.map((order) => (
            <div key={order.paymentMethod} className="mb-4 p-4">
              <div className="text-lg font-semibold mb-2">{order._id}</div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {/* Date: {moment(order.createdAt).format('MMM Do YY')} */}
                </div>
                <div className="text-sm text-gray-600">
                  Status: {order.status}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 mt-2">
                  Reference: {order._id}
                </div>
                <button className="bg-primary text-white px-3 py-1 rounded-lg mt-4 transition duration-200">
                  View
                </button>
              </div>
              <div className="text-sm text-gray-600 mt-2">
                Amount:
                <BsCurrencyPound />
                {order.totalPrice}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Orders;

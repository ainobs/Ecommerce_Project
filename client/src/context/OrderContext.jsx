// OrderContext.tsx
import React, { createContext, ReactNode, useState, useEffect } from 'react';
import api from '../services/api';

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getUserOrders = async () => {
    try {
      const response = await api.get(`/orders/user`);
      console.log('All orders', response);
      return response;
    } catch (error) {
      throw 'Error fetching user orders';
    }
  };

  const createOrder = async (orderData) => {
    try {
      setLoading(true);
      const response = await api.post('/orders/create', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const createdOrder = response.data;
      setOrders((prevOrders) => [...prevOrders, createdOrder]);
      return true;
    } catch (error) {
      setError('Error creating order');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get('/orders');
        setOrders(response);
      } catch (error) {
        setError('Error fetching all orders');
      } finally {
        setLoading(false);
      }
    };

    fetchAllOrders();
  }, []);

  return (
    <OrderContext.Provider
      value={{ orders, loading, error, getUserOrders, createOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

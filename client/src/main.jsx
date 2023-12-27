import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routing';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './context/NotificationContext';
import { OrderProvider } from './context/OrderContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <OrderProvider>
          <ProductProvider>
            <CartProvider>
              <RouterProvider router={router} />
            </CartProvider>
          </ProductProvider>
        </OrderProvider>
      </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>
);

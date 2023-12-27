import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/default/Home';
import ErrorPage from './pages/ErrorPage';
import App from './App';
import Default from './pages/default';
import Search from './pages/default/Search';
import Auth from './pages/Auth';
import Login from './pages/Auth/login';
import Signup from './pages/Auth/signup';
import VerifyEmail from './pages/Auth/signup/VerifyEmail';
import ProductDetail from './pages/default/ProductDetail';
import ForgotPassword from './pages/Auth/login/ForgetPassword';
import Cart from './pages/default/Cart';
import Checkout from './pages/default/Checkout';
import Dashboard from './pages/protected';
import Profile from './pages/protected/Profile';
import Orders from './pages/protected/Orders';
import DashboardPage from './pages/protected/Dashboard';
import AdminStats from './pages/protected/AdminStats';
import Product from './pages/protected/Product';
import NewProduct from './pages/protected/Product/NewProduct';
import OrderSuccess from './pages/default/OrderSuccess';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Default />,
        children: [
          { path: '/', element: <Home /> },
          { path: 'search', element: <Search /> },
          { path: 'product/:id', element: <ProductDetail /> },
          { path: 'cart', element: <Cart /> },
          { path: 'checkout', element: <Checkout /> },
          { path: 'order-success', element: <OrderSuccess /> },
          {
            path: '/dashboard',
            element: <Dashboard />,
            children: [
              { path: 'stat', element: <DashboardPage /> },
              { path: 'profile', element: <Profile /> },
              { path: 'orders', element: <Orders /> },
              { path: 'admin', element: <AdminStats /> },
              {
                path: 'products',
                children: [
                  { path: '/dashboard/products', element: <Product /> },
                  { path: 'new', element: <NewProduct /> },
                  { path: 'edit/:id', element: <NewProduct /> },
                ],
              },
            ],
          },
        ],
      },
      {
        path: '/auth',
        element: <Auth />,
        children: [
          { path: 'login', element: <Login /> },
          { path: 'signup', element: <Signup /> },
          { path: 'forgot-password', element: <ForgotPassword /> },
          { path: 'verify-email', element: <VerifyEmail /> },
        ],
      },
    ],
  },
]);

export default router;

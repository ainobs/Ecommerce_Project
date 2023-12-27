import { FaTrash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { BsCurrencyPound } from 'react-icons/bs';

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce(
      (total, product) => total + product.sellingPrice * product.quantity,
      0
    );
  };

  const handleSubmit = () => {
    if (cart.length > 0) {
      navigate('/checkout');
    }
  };

  return (
    <div className="flex flex-col md:flex-row container mx-auto p-4">
      {/* Left Column - Product Information */}
      <div className="md:w-2/3 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Shopping Cart
        </h2>
        {cart.length === 0 ? (
          <p>
            Your cart is empty.{' '}
            <Link to="/search" className="text-orange-500 font-medium">
              Go shopping
            </Link>
          </p>
        ) : (
          cart.map((product) => (
            <div
              key={product._id}
              className="flex items-center justify-between mb-4 border-b-2 border-gray-300 pb-4"
            >
              <div className="flex items-center gap-4">
                <Link to={`/product/${product.name}`}>
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded mr-4"
                  />
                </Link>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 flex items-center">
                    Price:
                    <BsCurrencyPound />
                    {product.sellingPrice}
                  </p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(product._id)}
                className="text-red-500 hover:underline mt-2 flex items-center"
              >
                <FaTrash className="mr-1" />
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Right Column - Summary and Checkout */}
      <div className="md:w-1/3 p-8 bg-orange-500 bg-opacity-10 rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Order Summary
        </h2>
        <div className="mb-4">
          <p className="text-gray-600">Total Items: {cart.length}</p>
          <p className="text-gray-600 flex items-center ">
            Total Price:
            <BsCurrencyPound />
            {calculateTotal()}
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 w-full"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

// Checkout.tsx

import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import useCart from '../../hooks/useCart';
import Stripe from '../../component/payments/Stripe';
import { BsCurrencyPound } from 'react-icons/bs';

const Checkout = () => {
  const { cart, shippingInfo, setShippingInfo } = useCart();

  const [shippingInfoErrors, setShippingInfoErrors] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
    email: '',
  });

  const [couponCode, setCouponCode] = useState('');
  const [payment, setPayment] = useState(false);

  const getTotalPrice = () => {
    return cart.reduce(
      (total, item) => total + item.sellingPrice * item.quantity,
      0
    );
  };

  const handleContinueToPayment = () => {
    // Validation for shipping information
    const shippingErrors = {};
    for (const key in shippingInfo) {
      if (!shippingInfo[key]) {
        shippingErrors[key] = 'This field is required';
      }
    }
    if (Object.keys(shippingErrors).length > 0) {
      setShippingInfoErrors(shippingErrors);
      return;
    } else {
      setShippingInfoErrors({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        zipCode: '',
        country: '',
        email: '',
      });
    }

    // Proceed to payment logic goes here
    setPayment(true);
  };

  return (
    <div className="container mx-auto my-8 px-4 flex flex-col md:flex-row gap-8 ">
      <div className="md:w-2/3">
        <h2 className="text-3xl font-semibold mb-4">
          Shipping & Billing Information
        </h2>
        {/* Your shipping and billing form goes here */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(shippingInfo).map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-gray-600 text-sm mb-2 capitalize">
                {field}
              </label>
              <input
                type="text"
                className={`border-2 border-gray-300 rounded-md  focus:outline-none focus:border-orange-500 p-2 w-full ${
                  shippingInfoErrors[field] ? 'border-red-500' : ''
                }`}
                placeholder={`Enter ${field}`}
                value={shippingInfo[field]}
                onChange={(e) =>
                  setShippingInfo((prev) => ({
                    ...prev,
                    [field]: e.target.value,
                  }))
                }
              />
              {shippingInfoErrors[field] && (
                <p className="text-red-500 text-xs mt-1">
                  {shippingInfoErrors[field]}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="md:w-1/3 bg-orange-500 bg-opacity-10 p-4">
        <h2 className="text-3xl font-semibold mb-4">Order Summary</h2>
        {/* Your order summary goes here */}
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border-b border-gray-300 py-2"
          >
            <div className="flex items-center">
              <span className="mr-2">{item.name}</span>
              <span className="text-gray-500 flex items-center">
                (
                <BsCurrencyPound />
                {item.sellingPrice.toFixed(2)})
              </span>
            </div>
            <div className="flex items-center">
              <span className="mx-2">x {item.quantity}</span>
            </div>
            <div className="flex items-center">
              <BsCurrencyPound />
              {(item.sellingPrice * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            Subtotal:
            <BsCurrencyPound />
            {getTotalPrice().toFixed(2)}
          </h3>
          {/* Your tax and coupon entry fields go here */}
          <div className="mb-4 flex items-center justify-between">
            <label className="block text-gray-600 text-sm mb-2">Tax</label>
            <div className="flex items-center">
              <BsCurrencyPound />
              0.00
            </div>
          </div>
          <div className="flex mb-2  bg-white border-2 rounded-lg px-2 items-center flex-1">
            <input
              type="text"
              className=" focus:outline-none bg-transparent rounded-md p-2 w-full"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button className="p-2 bg-orange-500 rounded-lg text-white">
              <FaCheck />
            </button>
          </div>
        </div>
        <div className="mt-6">
          {payment ? (
            <Stripe amount={getTotalPrice()} />
          ) : (
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 w-full"
              onClick={handleContinueToPayment}
            >
              Continue to Payment
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

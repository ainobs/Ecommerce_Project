import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  PaymentElement,
} from '@stripe/react-stripe-js';
import { useOrder } from '../../hooks/useOrder';
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import useNotification from '../../hooks/useNotification';

export default function Checkout() {
  const { createOrder } = useOrder();
  const { cart, shippingInfo, clearCart } = useCart();
  const { addNotification } = useNotification();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    try {
      // We don't want to let default form submission happen here,
      // which would refresh the page.
      event.preventDefault();

      if (!stripe || !elements) {
        // Stripe.js hasn't yet loaded.
        // Make sure to disable form submission until Stripe.js has loaded.
        return;
      }

      setLoading(true);

      // Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        handleError(submitError);
        return;
      }

      // Confirm the PaymentIntent using the details collected by the Payment Element
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: 'https://example.com/order/123/complete',
        },
        redirect: 'if_required',
      });

      if (error) {
        // This point is only reached if there's an immediate error when
        // confirming the payment. Show the error to your customer (for example, payment details incomplete)
        handleError(error);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log(paymentIntent);
        const result = await createOrder({
          products: cart,
          paymentMethod: 'Credit Card',
          shippingAddress: shippingInfo,
        });

        if (result) {
          clearCart();
          addNotification('Order created successfully');
          navigate('/order-success');
        } else {
          throw 'error';
        }

        // Your customer is redirected to your `return_url`. For some payment
        // methods like iDEAL, your customer is redirected to an intermediate
        // site first to authorize the payment, then redirected to the `return_url`.
      }
      setLoading(false);
    } catch (error) {
      addNotification('Encounter an error making order');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-orange-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-orange-600 focus:outline-none focus:bg-orange-600 w-full"
      >
        Pay Now
      </button>
      {errorMessage && <div>{errorMessage}</div>}
    </form>
  );
}

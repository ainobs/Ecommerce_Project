import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Checkout from './Checkout';
import { useState, useEffect } from 'react';
import api from '../../services/api';

const stripePromise = loadStripe('pk_test_CT0ybjoG9ebwjjsNrzxJO5W800eMiLG6ml');

const Stripe = ({ amount }) => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const createIntent = async () => {
      // Create the PaymentIntent and obtain clientSecret
      const res = await api.post('/payments/stripe-intent', {
        amount: amount * 100,
      });
      setClientSecret(res.clientSecret);
    };
    createIntent();
  }, [amount]);

  return !clientSecret ? (
    <div>Loading...</div>
  ) : (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Checkout />
    </Elements>
  );
};

export default Stripe;

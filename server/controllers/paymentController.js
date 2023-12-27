import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');

export const createIntent = async (req, res) => {
  const { amount } = req.body;

  try {
    if (!amount) {
      return res
        .status(400)
        .json({ status: false, message: 'Invalid input data' });
    }
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'gbp',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ status: false, message: 'Internal Server Error' });
  }
};

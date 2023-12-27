import { Schema, model } from 'mongoose';

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [{ type: Object }],
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
      default: 'Pending',
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    shippingAddress: { type: Object },
    paymentMethod: {
      type: String,
      enum: ['Credit Card', 'PayPal', 'Cash on Delivery'],
      required: true,
    },
  },
  { timestamps: true }
);

const Order = model('Order', orderSchema);

export default Order;

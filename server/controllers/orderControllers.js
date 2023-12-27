// orderController.js
import Order from '../models/order.js';

// Controller function to create a new order
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { products, shippingAddress, paymentMethod } = req.body;

    // Calculate total price based on the products and quantities
    const totalPrice = products.reduce(
      (total, product) => total + product.quantity * product.sellingPrice,
      0
    );

    const newOrder = new Order({
      user: userId,
      products,
      status: 'Pending',
      totalPrice,
      shippingAddress,
      paymentMethod,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    console.log('fail creating order', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get a list of all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user', 'firstName lastName');
    res.status(200).json(orders);
  } catch (error) {
    console.log('failed getting all orders', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get details of a specific order
export const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId).populate(
      'user',
      'firstName lastName'
    );

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.log('fail getting order by id', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Controller function to get orders for a specific user
export const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    // Retrieve orders for the specified user
    const userOrders = await Order.find({ user: userId }).populate(
      'user',
      'firstName lastName'
    );

    res.status(200).json(userOrders);
  } catch (error) {
    console.log('failed getting user orders', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

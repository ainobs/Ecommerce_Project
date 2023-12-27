// orderRoutes.js
import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getUserOrders,
} from '../controllers/orderControllers.js';
import { authorize } from '../middleware/authorizationMiddle.js';

const router = express.Router();

// Create a new order
router.post('/create', authorize(), createOrder);

// Get a list of all orders
router.get('/', authorize('Admin'), getAllOrders);

// Get orders for a specific user
router.get('/user', authorize(), getUserOrders);

// Get details of a specific order
router.get('/:id', getOrderById);

export default router;

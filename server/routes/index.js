// routes/index.ts

import express from 'express';
import userRoutes from './userRoutes.js';
import productRoutes from './productRoutes.js';
import orderRoutes from './orderRoutes.js';
import imageRoutes from './imageRoutes.js';
import paymentRoutes from './paymentRoutes.js';

const router = express.Router();

// Use the imported route files
router.use('/users', userRoutes);

router.use('/products', productRoutes);

router.use('/orders', orderRoutes);

router.use('/images', imageRoutes);

router.use('/payments', paymentRoutes);

export default router;

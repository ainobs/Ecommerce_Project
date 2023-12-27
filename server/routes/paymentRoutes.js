import express from 'express';
import { createIntent } from '../controllers/paymentController.js';

const router = express.Router();

router.post('/stripe-intent', createIntent);

export default router;

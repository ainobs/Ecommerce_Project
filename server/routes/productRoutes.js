import express from 'express';
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  searchProducts,
  updateProduct,
} from '../controllers/productControllers.js';
import { authorize } from '../middleware/authorizationMiddle.js';

const router = express.Router();

router.get('/', getAllProducts);

router.get('/search', searchProducts);

router.get('/:productId', getProductById);

router.post('/', authorize(), createProduct);

router.put('/:productId', updateProduct);

router.delete('/:productId', deleteProductById);

export default router;

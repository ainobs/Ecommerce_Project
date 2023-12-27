// orderRoutes.js
import express from 'express';
import { authorize } from '../middleware/authorizationMiddle.js';
import upload from '../middleware/multerMiddleware.js';
import { handleImageUpload } from '../controllers/imageController.js';

const router = express.Router();

router.post('/upload', authorize(), upload.single('image'), handleImageUpload);

router.get('/upload/:id', express.static('uploads'));

export default router;

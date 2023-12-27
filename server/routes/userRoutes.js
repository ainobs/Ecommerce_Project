// routes/userRoutes.ts

import express from 'express';
import {
  getAllUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  updateUserProfile,
} from '../controllers/userControllers.js';
import { authorize } from '../middleware/authorizationMiddle.js';

const router = express.Router();

// User registration route
router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/logout', authorize(), logoutUser);

router.get('/profile', authorize(), getUserDetails);

router.get('/', authorize('Admin'), getAllUser);

router.put('/update-profile', authorize(), updateUserProfile);

export default router;

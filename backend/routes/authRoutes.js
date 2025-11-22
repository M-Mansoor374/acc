import express from 'express';
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
  getMe,
  updateProfile,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/signup', signup);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Protected routes (require authentication)
router.get('/me', authMiddleware, getMe);
router.put('/update-profile', authMiddleware, updateProfile);

export default router;


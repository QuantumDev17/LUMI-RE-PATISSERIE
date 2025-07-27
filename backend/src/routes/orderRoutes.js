import express from 'express';
import {
  createOrder,
  getAllOrders,
  getUserOrders
} from '../controllers/orderController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

// Routes
router.post('/', protect, createOrder); // Authenticated users can place orders
router.get('/', protect, adminOnly, getAllOrders); // Only admin can view all orders
router.get('/user/:userId', protect, getUserOrders); // Authenticated users can view their own orders

export default router;

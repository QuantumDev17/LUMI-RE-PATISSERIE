import express from 'express';
import {
  createOrder,
  getAllOrders,
  getUserOrders
} from '../controllers/orderController.js';

import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createOrder); 
router.get('/', protect, adminOnly, getAllOrders);
router.get('/:userId', protect, getUserOrders);

export default router;

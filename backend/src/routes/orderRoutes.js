import express from 'express';
import {
  createOrder,
  getAllOrders,
  getUserOrders
} from '../controllers/orderController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', adminOnly, getAllOrders);
router.get('/:userId', getUserOrders);

export default router;

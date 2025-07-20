import express from 'express';
import { createOrder, getAllOrders, updateOrder, deleteOrder, getOrderById } from '../controllers/orderController.js';

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', createOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);
router.get('/:id', getOrderById);

export default router;
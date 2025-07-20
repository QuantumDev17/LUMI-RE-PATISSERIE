import express from 'express';
import { createProduct, getAllProducts, updateProduct,deleteProduct } from '../controllers/productController';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);



export default router;
// This file sets up the product routes for the application.


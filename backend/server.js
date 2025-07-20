import express from 'express';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use("/api/products", productRoutes);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
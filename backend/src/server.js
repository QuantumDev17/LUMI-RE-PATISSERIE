import express from 'express';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// ✅ Root Route - this fixes the "Cannot GET /" message
app.get('/', (req, res) => {
  res.send('🍰 Lumière Patisserie API is running');
});

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);

// Connect to the database and start the server
connectDB().then(() => {
  app.listen(PORT, () => {
  console.log('Server is running on PORT:', PORT);
  });
});

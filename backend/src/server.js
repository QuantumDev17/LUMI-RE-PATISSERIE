import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ======== CORS FIXED FOR LOCAL & VERCEL ========
const allowedOrigins = [
  'http://localhost:5173',
  'https://lumi-re-patisserie-2rgh41n7q-quantumdev17s-projects.vercel.app', // your live site
  // Add preview/branch URLs below if needed:
  // 'https://lumi-re-patisserie-<branch>.<your-team>.vercel.app',
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

app.use(express.json());

// ======== ROUTES ========
app.get('/', (req, res) => {
  res.send('🍰 Lumière Patisserie API is running');
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// ======== ERROR HANDLING ========
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ======== CONNECT DB AND START SERVER ========
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('Server is running on PORT:', PORT);
  });
});

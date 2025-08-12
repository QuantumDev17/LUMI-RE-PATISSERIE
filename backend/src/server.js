// backend/src/server.js
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import imageRoutes from './routes/imageRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// --- resolve __dirname for ES modules ---
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// ======== CORS (catch-all, handles preflight) ========
const allowedOrigins = [
  'http://localhost:5173',
  'https://lumie-re-patisserie.vercel.app',
];

const isAllowedOrigin = (origin = '') =>
  allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);

// Must be BEFORE static and routes
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (origin && isAllowedOrigin(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Vary', 'Origin');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  }

  // Respond to preflight immediately
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

// ======== BODY PARSER ========
app.use(express.json());

// ======== STATIC FILES (serve images from backend/public) ========
// server.js is in backend/src → go up one level to ../public
const publicDir = path.resolve(__dirname, '../public');
// e.g. https://<backend-domain>/bread/japanese-milk-bread.jpg
app.use(express.static(publicDir, { maxAge: '30d', index: false }));

// ======== ROUTES ========
app.get('/', (req, res) => {
  res.send('🍰 Lumière Patisserie API is running');
});

// Debug endpoint to confirm public path used
app.get('/__where_are_images', (req, res) => {
  res.json({ publicDir });
});

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/images', imageRoutes); // returns list of image paths from /public

// ======== ERROR HANDLING ========
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// ======== CONNECT DB AND START SERVER ========
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📁 Serving static files from: ${publicDir}`);
  });
});

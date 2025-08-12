import express from 'express';
import cors from 'cors';
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

// ======== CORS CONFIG ========
const allowedOrigins = [
  'http://localhost:5173',
  'https://lumie-re-patisserie.vercel.app',
];

app.use(cors({
  origin(origin, cb) {
    if (!origin) return cb(null, true); // allow server-to-server, curl, Postman
    const ok = allowedOrigins.includes(origin) || /^https:\/\/.*\.vercel\.app$/.test(origin);
    cb(ok ? null : new Error('Not allowed by CORS'), ok);
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
}));

// ======== MIDDLEWARE ========
app.use(express.json());

// ======== STATIC FILES (serve images from backend/public) ========
// IMPORTANT: server.js is in backend/src, so go up one level to ../public
const publicDir = path.resolve(__dirname, '../public');
// e.g. https://<backend-domain>/bread/japanese-milk-bread.png
app.use(express.static(publicDir, { maxAge: '30d', index: false }));

// ======== ROUTES ========
app.get('/', (req, res) => {
  res.send('🍰 Lumière Patisserie API is running');
});

// Optional: quick debug to confirm public path in logs
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

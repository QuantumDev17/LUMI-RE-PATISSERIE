import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Recursively collect image paths (subfolders too)
function getImagesRecursive(dir, basePath = '') {
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of list) {
    const filePath = path.join(dir, entry.name);
    const relativePath = path.join(basePath, entry.name);

    if (entry.isDirectory()) {
      results = results.concat(getImagesRecursive(filePath, relativePath));
    } else if (/\.(png|jpe?g|gif|webp|svg)$/i.test(entry.name)) {
      results.push(relativePath.replace(/\\/g, '/')); // normalize for Windows
    }
  }
  return results;
}

router.get('/', (req, res) => {
  try {
    // Try both common locations
    const candidates = [
      path.resolve(__dirname, '../../../public'),
      path.resolve(__dirname, '../../../frontend/public'),
    ];

    const existing = candidates.filter((p) => fs.existsSync(p) && fs.statSync(p).isDirectory());

    if (existing.length === 0) {
      console.error('[images] No public directory found. Tried:', candidates);
      return res.status(500).json({ message: 'Images folder not found' });
    }

    // Prefer the first that exists
    const publicDir = existing[0];
    console.log('[images] Reading from:', publicDir);

    const images = getImagesRecursive(publicDir);
    return res.json(images);
  } catch (err) {
    console.error('Error reading images folder:', err);
    return res.status(500).json({ message: 'Error reading images folder' });
  }
});

export default router;

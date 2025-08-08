// src/controllers/productController.js
import Product from "../models/Product.js";

// helpers
function slugify(str = "") {
  return String(str)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
function buildImagePath(category, name) {
  return `/${slugify(category)}/${slugify(name)}.png`;
}

/**
 * GET all products
 * Supports: ?category=cake&q=choco&page=1&limit=20
 */
export async function getAllProducts(req, res) {
  try {
    const { category, q } = req.query;
    const page  = Math.max(1, parseInt(req.query.page ?? 1, 10));
    const limit = Math.max(1, parseInt(req.query.limit ?? 20, 10));
    const skip  = (page - 1) * limit;

    const filter = {};
    if (category) filter.category = category;
    if (q) filter.name = { $regex: q, $options: "i" };

    const [items, total] = await Promise.all([
      Product.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Product.countDocuments(filter)
    ]);

    // Always return 200 with array (even if empty)
    res.status(200).json({ items, total, page, limit });
  } catch (error) {
    console.error("Error in getAllProducts Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * GET product by ID
 */
export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error in getProductById Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * CREATE new product
 * If no image is provided, auto-generate: /<category>/<name>.png
 */
export async function createProduct(req, res) {
  try {
    let { name, description, image, price, category, stock } = req.body;

    if (!image && name && category) {
      image = buildImagePath(category, name);
    }

    const savedProduct = await Product.create({
      name,
      description,
      image,
      price,
      category,
      stock
    });

    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error in createProduct Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * UPDATE product
 * If image isn't provided but name/category changed, rebuild the path.
 */
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    if (!payload.image && (payload.name || payload.category)) {
      const existing = await Product.findById(id);
      if (!existing) return res.status(404).json({ message: "Product not found" });
      const newName = payload.name ?? existing.name;
      const newCat  = payload.category ?? existing.category;
      payload.image = buildImagePath(newCat, newName);
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true
    });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error in updateProduct Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/**
 * DELETE product
 */
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error in deleteProduct Controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

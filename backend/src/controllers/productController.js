import Product from "../models/Product.js";

// GET all products
export async function getAllProducts(req, res) {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // Sort by creation date, newest first
    if (!products || products.length === 0) return res.status(404).json({ message: "No products found" }); // Check if products exist
    res.status(200).json(products);
  } catch (error) {
    console.error('Error in getAllProducts Controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// GET product by ID
export async function getProductById(req, res) {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error('Error in getProductById Controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// CREATE new product
export async function createProduct(req, res) {
  try {
    const { name, description, image, price, category, stock, isAvailable } = req.body;
    const product = new Product({
      name,
      description,
      image,
      price,
      category,
      stock,
      isAvailable: isAvailable ?? true
    });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error in createProduct Controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// UPDATE product
export async function updateProduct(req, res) {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error in updateProduct Controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

// DELETE product
export async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error('Error in deleteProduct Controller:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
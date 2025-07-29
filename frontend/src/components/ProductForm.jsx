import { useState, useEffect } from 'react';

const ProductForm = ({ onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    image: '',
    stock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        image: product.image,
        stock: product.stock,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <h2>{product ? 'Edit Product' : 'Create Product'}</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required /><br />
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" /><br />
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Price" required /><br />
        <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" /><br />
        <input name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" /><br />
        <input name="stock" type="number" value={formData.stock} onChange={handleChange} placeholder="Stock" required /><br />
        <button type="submit">{product ? 'Update' : 'Create'}</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>Cancel</button>
      </form>
    </div>
  );
};

export default ProductForm;

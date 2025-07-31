import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm'; 

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = localStorage.getItem('token'); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;

    try {
      await fetch(`http://localhost:3000/api/Products/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter(p => p._id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
    }
  };

  const handleFormSubmit = async (formData) => {
    const method = selectedProduct ? 'PUT' : 'POST';
    const url = selectedProduct
      ? `http://localhost:3000/api/Products/${selectedProduct._id}`
      : 'http://localhost:3000/api/Products';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save product');

      await fetchProducts();
      setShowForm(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
    }
  };

  const groupByCategory = (products) => {
    return products.reduce((groups, product) => {
      const category = product.category?.trim() || 'Uncategorized';
      if (!groups[category]) groups[category] = [];
      groups[category].push(product);
      return groups;
    }, {});
  };

  const grouped = groupByCategory(products);

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Admin Dashboard</h1>
      <p>Manage your products below.</p>

      <button onClick={handleCreateClick}>Create Product</button>

      {showForm && (
        <ProductForm
          onClose={() => {
            setShowForm(false);
            setSelectedProduct(null);
          }}
          onSubmit={handleFormSubmit}
          product={selectedProduct}
        />
      )}

      {loading ? (
        <p>Loading...</p>
      ) : Object.keys(grouped).length === 0 ? (
        <p>No products found.</p>
      ) : (
        Object.keys(grouped).map(category => (
          <div key={category} style={{ marginTop: '2rem' }}>
            <h2>{category}</h2>
            <table border="1" cellPadding="8" cellSpacing="0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price ($)</th>
                  <th>Stock</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {grouped[category].map(prod => (
                  <tr key={prod._id}>
                    <td>{prod.name}</td>
                    <td>{prod.price}</td>
                    <td>{prod.stock}</td>
                    <td>{prod.category || 'Uncategorized'}</td>
                    <td>
                      {prod.image ? (
                        <img
                          src={prod.image}
                          alt={prod.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '4px'
                          }}
                        />
                      ) : (
                        <span>No image</span>
                      )}
                    </td>
                    <td>{new Date(prod.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button onClick={() => handleEdit(prod)}>Edit</button>{' '}
                      <button onClick={() => handleDelete(prod._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminPage;
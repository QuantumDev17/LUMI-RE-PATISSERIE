// src/pages/AdminPage.jsx
import { useEffect, useState } from 'react';
import ProductForm from '../components/ProductForm';
import { API_BASE } from '../config';                 // ✅ single source of truth

// Build full image URL from backend/public or external URLs
function resolveImage(path = '') {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;        // already a full URL
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;                           // e.g. https://backend/bread/foo.jpg
}

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  const fetchProducts = async (category = '') => {
    try {
      setLoading(true);
      setError('');

      const url = category
        ? `${API_BASE}/api/products?category=${encodeURIComponent(category)}`
        : `${API_BASE}/api/products?page=1&limit=1000`;

      const res = await fetch(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        // credentials: 'include', // ❌ only if you use cookie auth
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : (data.items || []);
      setProducts(list);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message || 'Failed to fetch products');
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
    if (!window.confirm('Delete this product?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        // credentials: 'include',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setProducts((p) => p.filter((x) => x._id !== id));
    } catch (err) {
      console.error('Failed to delete product:', err);
      alert('Delete failed');
    }
  };

  const handleFormSubmit = async (formData) => {
    const method = selectedProduct ? 'PUT' : 'POST';
    const url = selectedProduct
      ? `${API_BASE}/api/products/${selectedProduct._id}`
      : `${API_BASE}/api/products`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        // credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await fetchProducts();
      setShowForm(false);
      setSelectedProduct(null);
    } catch (err) {
      console.error(err);
      alert('Save failed');
    }
  };

  const groupByCategory = (list) => {
    if (!Array.isArray(list)) return {};
    return list.reduce((groups, product) => {
      const category = product.category?.trim() || 'Uncategorized';
      (groups[category] ||= []).push(product);
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

      {loading && <p>Loading…</p>}
      {!loading && error && <p style={{ color: 'crimson' }}>{error}</p>}

      {!loading && !error && Object.keys(grouped).length === 0 && <p>No products found.</p>}

      {!loading && !error &&
        Object.keys(grouped).map((category) => (
          <div key={category} style={{ marginTop: '2rem' }}>
            <h2 style={{ textTransform: 'capitalize' }}>{category}</h2>
            <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%' }}>
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
                {(grouped[category] || []).map((prod) => (
                  <tr key={prod._id}>
                    <td>{prod.name}</td>
                    <td>{Number(prod.price).toFixed(2)}</td>
                    <td>{prod.stock ?? 0}</td>
                    <td>{prod.category || 'Uncategorized'}</td>
                    <td>
                      {prod.image ? (
                        <img
                          src={resolveImage(prod.image)}
                          alt={prod.name}
                          style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                        />
                      ) : (
                        <span>No image</span>
                      )}
                    </td>
                    <td>{prod.createdAt ? new Date(prod.createdAt).toLocaleDateString() : '-'}</td>
                    <td>
                      <button onClick={() => handleEdit(prod)}>Edit</button>{' '}
                      <button onClick={() => handleDelete(prod._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </div>
  );
};

export default AdminPage;

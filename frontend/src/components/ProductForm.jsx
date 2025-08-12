import { useState, useEffect, useMemo } from 'react';
import { API_BASE } from '../config';                 // ✅ use shared config

const FOLDERS = [
  { key: 'cake',             label: 'Cake' },
  { key: 'bread',            label: 'Bread' },
  { key: 'pastry',           label: 'Pastry' },
  { key: 'one-bite',         label: 'One-bite' },
  { key: 'personal-dessert', label: 'Personal Dessert' },
];

// ✅ helper to resolve relative image paths to full backend URL
const toImg = (p = '') =>
  /^https?:\/\//i.test(p) ? p : `${API_BASE}${p.startsWith('/') ? p : `/${p}`}`;

export default function ProductForm({ onClose, onSubmit, product }) {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', category: '', image: '', stock: '',
  });
  const [images, setImages] = useState([]);
  const [activeFolder, setActiveFolder] = useState(FOLDERS[0].key);
  const [page, setPage] = useState(1);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');
  const PER_PAGE = 12;

  useEffect(() => {
    // Pre-fill when editing
    if (product) {
      setFormData({
        name: product.name ?? '',
        description: product.description ?? '',
        price: product.price ?? '',
        category: product.category ?? '',
        image: product.image ?? '',
        stock: product.stock ?? '',
      });
      if (product.category && FOLDERS.some(f => f.key === product.category.toLowerCase())) {
        setActiveFolder(product.category.toLowerCase());
      }
    }

    async function loadImages() {
      // 1) Try backend /api/images
      try {
        const r = await fetch(`${API_BASE}/api/images`, { headers: { Accept: 'application/json' } });
        const ct = r.headers.get('content-type') || '';
        if (r.ok && ct.includes('application/json')) {
          const data = await r.json();
          if (Array.isArray(data) && data.length) {
            setImages(data);
            return;
          }
        }
      } catch {
        // fall through
      }

      // 2) Fallback to frontend manifest (optional)
      try {
        const r = await fetch('/image-manifest.json', { cache: 'no-store' });
        if (r.ok) {
          const data = await r.json();
          if (Array.isArray(data)) setImages(data);
        }
      } catch (e) {
        console.error('Could not load image manifest', e);
      }
    }

    loadImages();
  }, [product]);

  useEffect(() => {
    const c = (formData.category || '').toLowerCase().trim();
    if (FOLDERS.some(f => f.key === c)) {
      setActiveFolder(c);
      setPage(1);
    }
  }, [formData.category]);

  const folderImages = useMemo(() => {
    return images.filter(p => p.includes('/') && p.split('/')[0].toLowerCase() === activeFolder);
  }, [images, activeFolder]);

  const totalPages = Math.max(1, Math.ceil(folderImages.length / PER_PAGE));
  const current = folderImages.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = relPath => {
    const withSlash = relPath.startsWith('/') ? relPath : `/${relPath}`;
    setFormData(prev => ({ ...prev, image: withSlash }));  // ✅ store relative path in DB
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim()) return setError('Name is required.');
    if (!formData.price || Number(formData.price) <= 0) return setError('Enter a valid price.');
    if (!formData.stock || Number(formData.stock) < 0) return setError('Enter a valid stock (0+).');
    if (!formData.category.trim()) return setError('Category is required.');
    if (!formData.image) return setError('Please select an image.');

    const payload = {
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: formData.image.startsWith('/') ? formData.image : `/${formData.image}`,
    };

    try {
      setPending(true);
      await onSubmit(payload);
    } catch (e2) {
      console.error(e2);
      setError('Failed to save product.');
    } finally {
      setPending(false);
    }
  };

  const selectedImageNoSlash = formData.image.replace(/^\//, '');

  return (
    <div style={styles.card}>
      <h2 style={styles.title}>{product ? 'Edit Product' : 'Create Product'}</h2>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Inputs */}
        <div style={styles.grid}>
          <div style={styles.field}>
            <label style={styles.label}>Name</label>
            <input
              style={styles.input}
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Price</label>
            <input
              style={styles.input}
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="10.99"
              required
            />
          </div>

          <div style={{ gridColumn: '1 / -1', ...styles.field }}>
            <label style={styles.label}>Description</label>
            <textarea
              style={{ ...styles.input, minHeight: 90, resize: 'vertical' }}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="description"
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Category</label>
            <input
              style={styles.input}
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="cake, bread, pastry, one-bite, personal-dessert"
              required
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Stock</label>
            <input
              style={styles.input}
              name="stock"
              type="number"
              min="0"
              value={formData.stock}
              onChange={handleChange}
              placeholder="10"
              required
            />
          </div>
        </div>

        {/* Tabs */}
        <div style={styles.tabs}>
          {FOLDERS.map(f => (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                setActiveFolder(f.key);
                setPage(1);
                setFormData(prev => ({ ...prev, category: f.key }));
              }}
              style={{
                ...styles.tab,
                ...(activeFolder === f.key ? styles.tabActive : {})
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Image picker + preview */}
        <p style={styles.subTitle}>Select Image</p>
        <div style={styles.pickerWrap}>
          <div style={styles.pickerGrid}>
            {current.map(rel => {
              const selected = selectedImageNoSlash === rel;
              return (
                <button
                  key={rel}
                  type="button"
                  onClick={() => handleImageSelect(rel)}
                  title={rel}
                  style={{
                    ...styles.thumbBtn,
                    border: selected ? '3px solid #22c55e' : '1px solid #d1d5db',
                    boxShadow: selected ? '0 0 0 2px #bbf7d0 inset' : 'none'
                  }}
                >
                  {/* ✅ use backend URL for the thumbnail */}
                  <img
                    src={toImg(rel)}
                    alt={rel}
                    style={styles.thumbImg}
                    onError={(e) => (e.currentTarget.style.opacity = 0.3)}
                  />
                </button>
              );
            })}
            {current.length === 0 && (
              <div style={{ color: '#6b7280' }}>No images in this folder.</div>
            )}
          </div>

          <div style={styles.preview}>
            <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 6 }}>Preview</div>
            <div style={styles.previewBox}>
              {formData.image ? (
                // ✅ also resolve preview against backend
                <img src={toImg(formData.image)} alt="Selected" style={styles.previewImg} />
              ) : (
                <span style={{ color: '#9ca3af' }}>No image selected</span>
              )}
            </div>
            {formData.image && (
              <div style={{ marginTop: 6, fontSize: 12, color: '#6b7280' }}>
                {formData.image}
              </div>
            )}
          </div>
        </div>

        {/* Pagination */}
        <div style={styles.pagination}>
          <button
            type="button"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page <= 1}
            style={styles.pageBtn}
          >
            Prev
          </button>
          <span style={styles.pageInfo}>Page {page} / {totalPages}</span>
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            style={styles.pageBtn}
          >
            Next
          </button>
        </div>

        {/* Actions */}
        <div style={styles.actions}>
          <button
            type="submit"
            disabled={pending}
            style={{ ...styles.primaryBtn, opacity: pending ? 0.7 : 1 }}
          >
            {pending ? 'Saving…' : (product ? 'Update' : 'Create')}
          </button>
          <button type="button" onClick={onClose} style={styles.secondaryBtn}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

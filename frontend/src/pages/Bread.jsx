// src/pages/Bread.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Bread.css';
import { API_BASE } from '../config';                 // ✅ use shared config

// ✅ Convert stored relative path to full backend URL
function resolveImage(path = '') {
  if (!path) return '/placeholder.png';
  if (/^https?:\/\//i.test(path)) return path;        // already full URL
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;                           // e.g. https://backend/bread/foo.jpg
}

export default function Bread() {
  const [items, setItems]  = useState([]);
  const [loading, setLoad] = useState(true);
  const [error, setError]  = useState('');

  useEffect(() => {
    (async () => {
      try {
        setError('');
        setLoad(true);

        const res = await fetch(`${API_BASE}/api/products?category=bread`, {
          headers: { Accept: 'application/json' },
        });

        const ct = res.headers.get('content-type') || '';
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        if (!ct.includes('application/json')) throw new Error('Invalid server response');

        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.items || []);
        setItems(list);
      } catch (e) {
        console.error(e);
        setError('Could not load breads. Please try again later.');
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  return (
    <div className="bread-page">
      {/* Banner (front-end public asset is fine) */}
      <div
        className="bread-banner"
        style={{
          position: 'relative',
          width: '100vw',
          left: '50%', right: '50%',
          marginLeft: '-50vw', marginRight: '-50vw',
          background: "url('/bread.jpg') center/cover no-repeat",
          minHeight: 500,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
          paddingLeft: 80, overflow: 'hidden'
        }}
      >
        <div style={{ color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          <p style={{
            fontSize: 16, fontWeight: 500, letterSpacing: '2px',
            textTransform: 'uppercase', marginBottom: '0.5rem', fontFamily: "'Filson Pro', sans-serif"
          }}>
            Breads & Buns
          </p>
          <h1 style={{ fontSize: 52, fontWeight: 500, fontFamily: "'Filson Pro', sans-serif", margin: 0 }}>
            Boulangerie
          </h1>
        </div>
      </div>

      {/* Sort (placeholder) */}
      <div className="sort-box">
        <label>Sort by:</label>
        <select>
          <option>Best selling</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="bread-collection">
        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : items.length === 0 ? (
          <p>No breads found.</p>
        ) : (
          items.map((p) => (
            <Link
              to={`/product/${p._id}`}
              key={p._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="bread-card">
                <img
                  src={resolveImage(p.image)}
                  alt={p.name}
                  onError={(e) => (e.currentTarget.src = '/placeholder.png')}
                />
                <h3>{p.name}</h3>
                <p>${Number(p.price).toFixed(2)}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

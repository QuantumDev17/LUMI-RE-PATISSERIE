// src/pages/OneBite.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cakes.css';
import { API_BASE } from '../config';                    // ✅ use shared config

// ✅ Build full image URL from backend/public or accept full URLs
function resolveImage(path = '') {
  if (!path) return '/placeholder.png';
  if (/^https?:\/\//i.test(path)) return path;          // already absolute
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;                             // e.g. https://backend/one-bite/12.png
}

export default function OneBite() {
  const [items, setItems]  = useState([]);
  const [loading, setLoad] = useState(true);
  const [error, setError]  = useState('');

  useEffect(() => {
    (async () => {
      try {
        setError('');
        setLoad(true);

        const res = await fetch(`${API_BASE}/api/products?category=one-bite`, {
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
        setError('Could not load One-Bite items. Please try again later.');
      } finally {
        setLoad(false);
      }
    })();
  }, []);

  return (
    <div className="cake-page">
      {/* Full-width banner (frontend public asset) */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw',
          background: "url('/Bites.jpg') center/cover no-repeat",
          minHeight: 500,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start',
          paddingLeft: 80, color: '#fff', textAlign: 'left'
        }}
      >
        <p style={{
          fontSize: 22, fontWeight: 500, letterSpacing: '2px', textTransform: 'uppercase',
          marginBottom: '-3rem', textShadow: '1px 1px 5px rgba(0,0,0,.5)', fontFamily: "'Filson Pro', sans-serif"
        }}>
          ONE-BITE CREATIONS
        </p>
        <h1 style={{
          fontSize: 72, fontWeight: 150, textShadow: '2px 2px 6px rgba(0,0,0,.5)', fontFamily: "'Magnat', serif"
        }}>
          Petits Four
        </h1>
      </div>

      {/* Sort placeholder */}
      <div className="sort-box">
        <label>Sort by:</label>
        <select>
          <option>Best selling</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="cake-collection">
        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : items.length === 0 ? (
          <p>No one-bite creations found.</p>
        ) : (
          items.map(item => (
            <Link
              to={`/product/${item._id}`}
              key={item._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="cake-card">
                <img
                  src={resolveImage(item.image)}
                  alt={item.name}
                  onError={e => (e.currentTarget.src = '/placeholder.png')}
                />
                <h3>{item.name}</h3>
                <p>${Number(item.price).toFixed(2)}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

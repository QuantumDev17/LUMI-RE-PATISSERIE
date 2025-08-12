// src/pages/PersonalDesserts.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PersonalDesserts.css';
import { API_BASE } from '../config';                     // ✅ shared config

const CATEGORY = 'personal-dessert';

// ✅ Resolve images from backend/public (relative paths) or accept full URLs
function resolveImage(path = '') {
  if (!path) return '/placeholder.png';
  if (/^https?:\/\//i.test(path)) return path;           // already absolute
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE}${p}`;                               // e.g. https://backend/personal-dessert/foo.jpg
}

export default function PersonalDesserts() {
  const [items, setItems]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState('');
  const [sortBy, setSortBy]   = useState('best');

  useEffect(() => {
    let cancelled = false;

    async function fetchPersonalDesserts() {
      try {
        setError('');
        setLoading(true);

        const res = await fetch(
          `${API_BASE}/api/products?category=${encodeURIComponent(CATEGORY)}`,
          { headers: { Accept: 'application/json' } }
        );

        const ct = res.headers.get('content-type') || '';
        if (!res.ok || !ct.includes('application/json')) {
          throw new Error(`Bad response ${res.status}`);
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.items || []);

        const filtered = list.filter(
          (p) => (p.category || '').trim().toLowerCase() === CATEGORY
        );

        if (!cancelled) setItems(filtered);
      } catch (err) {
        console.error('Failed to fetch personal desserts:', err);
        if (!cancelled) setError('Could not load items. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchPersonalDesserts();
    return () => { cancelled = true; };
  }, []);

  const sorted = useMemo(() => {
    const arr = [...items];
    if (sortBy === 'price-asc') arr.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sortBy === 'price-desc') arr.sort((a, b) => Number(b.price) - Number(a.price));
    return arr;
  }, [items, sortBy]);

  return (
    <div className="desserts-page">
      {/* Banner (frontend public asset) */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          background: "url('/Sweet.png') center/cover no-repeat",
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '80px',
          overflow: 'hidden',
          color: 'white',
          textShadow: '0 2px 8px rgba(0,0,0,0.6)'
        }}
      >
        <p style={{
          fontSize: 16, fontWeight: 500, letterSpacing: '2px',
          textTransform: 'uppercase', marginBottom: '0.5rem'
        }}>
          PERSONAL DESSERTS
        </p>
        <h1 style={{ fontSize: 52, fontWeight: 700, margin: 0 }}>
          Petit Gâteaux
        </h1>
      </div>

      {/* Sort */}
      <div className="sort-box" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
          <option value="best">Best selling</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="dessert-collection">
        {loading ? (
          <p>Loading…</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : sorted.length === 0 ? (
          <p>No personal desserts found.</p>
        ) : (
          sorted.map((d) => (
            <Link
              key={d._id}
              to={`/product/${d._id}`}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="dessert-card">
                <img
                  src={resolveImage(d.image)}
                  alt={d.name}
                  onError={(e) => (e.currentTarget.src = '/placeholder.png')}
                />
                <h3>{d.name}</h3>
                <p>${Number(d.price).toFixed(2)}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

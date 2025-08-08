// src/pages/PersonalDesserts.jsx
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/PersonalDesserts.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const CATEGORY = 'personal-dessert';

// Resolve images from:
// - absolute URLs (http/https)
// - backend uploads (/uploads/...)
// - public files (/personal-dessert/..., /cake/..., etc.)
function resolveImage(path = '') {
  if (!path) return '/placeholder.png';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/uploads')) return `${API_BASE}${path}`;
  const base = import.meta.env.BASE_URL || '/';
  return path.startsWith('/') ? `${base}${path.slice(1)}` : `${base}${path}`;
}

export default function PersonalDesserts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('best');

  useEffect(() => {
    let cancelled = false;

    async function fetchPersonalDesserts() {
      try {
        setError('');
        setLoading(true);

        // Ask the API for this category; backend should be case-insensitive
        const res = await fetch(
          `${API_BASE}/api/products?category=${encodeURIComponent(CATEGORY)}`,
          { headers: { Accept: 'application/json' } }
        );

        const ct = res.headers.get('content-type') || '';
        if (!res.ok || !ct.includes('application/json')) {
          throw new Error(`Bad response ${res.status}`);
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : data.items || [];

        // Defensive: filter client-side in case backend returns more
        const filtered = list.filter(
          p => (p.category || '').trim().toLowerCase() === CATEGORY
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
      {/* Banner */}
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

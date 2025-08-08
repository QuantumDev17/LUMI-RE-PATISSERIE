import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cakes.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
const CATEGORY = 'cake';

function resolveImage(path = '') {
  if (!path) return '/placeholder.png';
  if (path.startsWith('http')) return path;                   // absolute URL
  if (path.startsWith('/uploads')) return `${API_BASE}${path}`; // served by backend
  const base = import.meta.env.BASE_URL || '/';               // Vite public base
  return path.startsWith('/') ? `${base}${path.slice(1)}` : `${base}${path}`;
}

export default function Cake() {
  const [allItems, setAllItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('best');

  useEffect(() => {
    let cancelled = false;

    async function fetchCakes() {
      try {
        setError('');
        setLoading(true);

        // Try server-side category first (lowercase)
        const res = await fetch(`${API_BASE}/api/products?category=${encodeURIComponent(CATEGORY)}`, {
          headers: { Accept: 'application/json' },
        });

        const ct = res.headers.get('content-type') || '';
        if (!res.ok || !ct.includes('application/json')) {
          throw new Error(`Bad response: ${res.status}`);
        }

        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.items || []);

        // Fallback: if server ignored the filter, filter on client
        const normalized = list.filter(
          (p) => (p.category || '').trim().toLowerCase() === CATEGORY
        );

        if (!cancelled) setAllItems(normalized);
      } catch (err) {
        console.error('Failed to fetch cakes:', err);
        setError('Could not load cakes. Please try again later.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchCakes();
    return () => { cancelled = true; };
  }, []);

  const cakes = useMemo(() => {
    const items = [...allItems];
    switch (sortBy) {
      case 'price-asc':
        items.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case 'price-desc':
        items.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      // “best” = default order (newest first if backend already sorted)
      default:
        break;
    }
    return items;
  }, [allItems, sortBy]);

  return (
    <div className="cake-page">
      {/* Banner */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          background: "url('/personal-dessert/Strawberry.png') center/cover no-repeat",
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '80px',
          color: '#fff',
          textAlign: 'left',
        }}
      >
        <p style={{
          fontSize: '22px',
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '-3rem',
          textShadow: '1px 1px 5px rgba(0,0,0,.5)',
          fontFamily: "'Filson Pro', sans-serif",
        }}>
          CAKES
        </p>
        <h1 style={{
          fontSize: '72px',
          fontWeight: 150,
          textShadow: '2px 2px 6px rgba(0,0,0,.5)',
          fontFamily: "'Magnat', serif",
        }}>
          Gâteaux
        </h1>
      </div>

      {/* Sort */}
      <div className="sort-box">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="best">Best selling</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Grid */}
      <div className="cake-collection">
        {loading ? (
          <p>Loading cakes...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : cakes.length === 0 ? (
          <p>No cakes found.</p>
        ) : (
          cakes.map((cake) => (
            <Link
              to={`/product/${cake._id}`}
              key={cake._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="cake-card">
                <img
                  src={resolveImage(cake.image)}
                  alt={cake.name}
                  onError={(e) => { e.currentTarget.src = '/placeholder.png'; }}
                />
                <h3>{cake.name}</h3>
                <p>${Number(cake.price).toFixed(2)}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

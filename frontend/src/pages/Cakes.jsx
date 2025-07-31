import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cakes.css';

function Cake() {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCakes = async () => {
      try {
       const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/login`); 
        const data = await res.json();

        const filtered = data.filter(
          (product) => product.category.toLowerCase() === 'cake' 
        );

        setCakes(filtered);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch cakes:', err);
        setLoading(false);
      }
    };

    fetchCakes();
  }, []);

  return (
    <div className="cake-page">
      {/* Full-Width Banner */}
      <div
        style={{
          position: "relative",
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          background: "url('/Strawberry.png') center/cover no-repeat",
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '80px',
          color: '#fff',
          textAlign: 'left'
        }}
      >
        <p style={{
          fontSize: '22px',
          fontWeight: 500,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '-3rem',
          textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
          fontFamily: "'Filson Pro', sans-serif"
        }}>
          CAKES
        </p>
        <h1 style={{
          fontSize: '72px',
          fontWeight: 150,
          textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
          fontFamily: "'Magnat', serif"
        }}>
          Gâteaux
        </h1>
      </div>

      {/* Sort Dropdown */}
      <div className="sort-box">
        <label>Sort by:</label>
        <select>
          <option>Best selling</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="cake-collection">
        {loading ? (
          <p>Loading cakes...</p>
        ) : cakes.length === 0 ? (
          <p>No cakes found.</p>
        ) : (
          cakes.map((cake) => (
            <Link
              to={`/product/${cake.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')}`}
              key={cake._id}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div className="cake-card">
                <img
                  src={cake.image.startsWith('http') ? cake.image : `/${cake.image}`}
                  alt={cake.name}
                />
                <h3>{cake.name}</h3>
                <p>${cake.price}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default Cake;

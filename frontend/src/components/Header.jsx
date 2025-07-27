import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: '80px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        marginBottom: 0
      }}
    >
      <Link to="/">
        <img
          src="/lumiere.png"
          alt="Lumière Patisserie Logo"
          style={{ height: '80px' }}
        />
      </Link>

      <nav>
        <ul style={{
          display: 'flex',
          gap: '32px',
          listStyle: 'none',
          margin: 0,
          padding: 0
        }}>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/e-boutique" style={{ textDecoration: 'none', color: '#333' }}>
              E-Boutique
            </Link>
          </li>
          <li>
            <Link to="/our-story" style={{ textDecoration: 'none', color: '#333' }}>
              Our Story
            </Link>
          </li>
          <li>
            <Link to="/contact" style={{ textDecoration: 'none', color: '#333' }}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/gift-card" style={{ textDecoration: 'none', color: '#333' }}>
              Lumière Gift Card
            </Link>
          </li>
          {user && (
            <li>
              <button onClick={handleLogout} style={{ textDecoration: 'none', color: '#333', background: 'none', border: 'none', cursor: 'pointer' }}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      <div>
        {user ? (
          <span style={{ color: '#333', fontWeight: 'bold' }}>
            Welcome, {user.name}
          </span>
        ) : (
          <Link to="/account" style={{ textDecoration: 'none', color: '#333' }}>
            Account
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;

import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header
      style={{
        width: '100%',
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        height: '80px',
        position: 'relative',
        zIndex: 10
      }}
    >
      {/* Logo on left */}
      <Link to="/">
        <img src="/lumiere.png" alt="Lumière Patisserie" style={{ height: '80px' }} />
      </Link>

      {/* Centered Nav Menu */}
      <nav style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
        <ul style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'nowrap',
          gap: '40px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          fontSize: '16px',
          whiteSpace: 'nowrap'
        }}>
          {/* Admin sees only Admin Dashboard */}
          {user && user.role === 'admin' && (
            <li>
              <Link to="/admin-dashboard" style={linkStyle}>Admin Dashboard</Link>
            </li>
          )}
          {/* All users see common links */}
          <li><Link to="/" style={linkStyle}>Home</Link></li>
          <li><Link to="/e-boutique" style={linkStyle}>E-Boutique</Link></li>
          <li><Link to="/our-story" style={linkStyle}>Our Story</Link></li>
          <li><Link to="/contact" style={linkStyle}>Contact</Link></li>
          <li><Link to="/gift-card" style={linkStyle}>Lumière Gift Card</Link></li>

          {/* User sees "My Profile", but not if admin */}
          {user && user.role !== 'admin' && (
            <li>
              <Link to="/user" style={linkStyle}>My Profile</Link>
            </li>
          )}
          {/* Show Logout for any logged-in user */}
          {user && (
            <li>
              <button onClick={handleLogout} style={buttonLinkStyle}>
                Logout
              </button>
            </li>
          )}
          {/* Guest only: show Account */}
          {!user && (
            <li>
              <Link to="/account" style={linkStyle}>Account</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

const linkStyle = {
  textDecoration: 'none',
  color: '#333',
  fontSize: '16px'
};

const buttonLinkStyle = {
  background: 'none',
  border: 'none',
  color: '#333',
  fontSize: '16px',
  cursor: 'pointer',
  padding: 0,
  textDecoration: 'none'
};

export default Header;

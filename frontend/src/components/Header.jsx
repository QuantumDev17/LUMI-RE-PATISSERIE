import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    setUser(storedUser ? JSON.parse(storedUser) : null);
    setMenuOpen(false); 
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <header className="header-bar">
      <Link to="/">
        <img src="/lumiere.png" alt="Lumière Patisserie" style={{ height: '60px' }} />
      </Link>
      {/* Hamburger */}
      <button
        className="hamburger"
        aria-label="Menu"
        onClick={() => setMenuOpen(m => !m)}
      >
        &#9776;
      </button>
      {/* Nav Menu */}
      <nav>
        <ul className={`nav-menu${menuOpen ? ' open' : ''}`}>
          {user && user.role === 'admin' && (
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
          )}
          <li><Link to="/">Home</Link></li>
          <li><Link to="/e-boutique">E-Boutique</Link></li>
          <li><Link to="/our-story">Our Story</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/gift-card">Lumière Gift Card</Link></li>
          {user && user.role !== 'admin' && (
            <li><Link to="/user">My Profile</Link></li>
          )}
          {user ? (
            <li>
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#333', fontSize: '16px', cursor: 'pointer' }}>Logout</button>
            </li>
          ) : (
            <li><Link to="/account">Account</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Account = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    // Guest view
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '40px' }}>Welcome to Your Account</h1>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px' }}>
          <Link to="/signin">
            <button style={buttonStyleDark}>Sign In</button>
          </Link>
          <Link to="/signup">
            <button style={buttonStyleLight}>Create Account</button>
          </Link>
        </div>
      </div>
    );
  }

  // Logged-in user view
  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '4rem 1rem', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>My Account</h2>
      <hr style={{ width: '60px', border: '2px solid #e3c6f3', margin: '1rem auto' }} />

      <h3 style={{ fontWeight: '400' }}>{user.name}</h3>
      <p style={{ color: '#555' }}>{user.email}</p>
      <p style={{ color: '#555' }}>, Canada</p>
      <Link to="#" style={{ color: '#444', textDecoration: 'underline' }}>View Addresses (1)</Link>

      <div style={{ marginTop: '3rem', color: '#777' }}>
        {/* Placeholder: Will update when order feature is implemented */}
        You haven’t placed any orders yet.
      </div>
    </div>
  );
};

const buttonStyleDark = {
  padding: '12px 24px',
  fontSize: '1rem',
  backgroundColor: '#333',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

const buttonStyleLight = {
  padding: '12px 24px',
  fontSize: '1rem',
  backgroundColor: '#666',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer'
};

export default Account;

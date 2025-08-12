// src/pages/Signin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config'; // ✅ single source of truth

function Signin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include', // ❌ only if you're using cookie auth
        body: JSON.stringify(formData),
      });

      // Robust parsing: try JSON, otherwise fall back to text
      let data;
      try {
        data = await res.json();
      } catch {
        const text = await res.text();
        data = { message: text };
      }

      if (res.ok) {
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user)  localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/user'); // or wherever your profile/dashboard lives
      } else {
        alert(data.message || `Login failed (HTTP ${res.status})`);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Network error during login. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '3rem 1rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
          autoComplete="email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
          autoComplete="current-password"
        />
        <button type="submit" style={buttonStyle} disabled={pending}>
          {pending ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  backgroundColor: '#000',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Signin;

// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE } from '../config'; // ✅ single source of truth

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [pending, setPending] = useState(false);

  const handleChange = (e) => {
    setFormData((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pending) return;
    setPending(true);

    try {
      const res = await fetch(`${API_BASE}/api/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const raw = await res.text();
      console.log('Signup status:', res.status);
      console.log('Signup raw body:', raw);

      let data;
      try { data = JSON.parse(raw); } catch { data = { message: raw }; }

      if (res.ok) {
        if (data.token) localStorage.setItem('token', data.token);
        if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
        return navigate('/user');
      }

      alert(data.message || `Signup failed (HTTP ${res.status})`);
    } catch (err) {
      console.error('Signup error:', err);
      alert('Network error during signup. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '3rem 1rem' }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
          autoComplete="name"
        />
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
          autoComplete="new-password"
        />
        <button type="submit" style={buttonStyle} disabled={pending}>
          {pending ? 'Creating…' : 'Create Account'}
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

export default Signup;

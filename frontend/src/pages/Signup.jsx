import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('🎉 Account created successfully!');
        navigate('/signin');
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('An error occurred during signup. Please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: '4rem 1rem' }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        fontWeight: '300',
        letterSpacing: '1px',
        color: '#444'
      }}>
        Create Account
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

// shared input style for uniform look
const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '12px',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '15px',
  fontFamily: 'inherit',
  outline: 'none'
};

export default Signup;

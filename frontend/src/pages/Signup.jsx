import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MyProfile.css';

function MyProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setError('You need to sign in to view your profile.');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(res.data);
      } catch (err) {
        console.log('Profile error:', err);
        setError('Unauthorized. Please sign in again.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="profile-container">
      <h2 className="title">My Profile</h2>
      <div className="underline"></div>

      {error && !user ? (
        <div className="guest-view">
          <p className="error-text">{error}</p>
          <div className="btn-group">
            <Link to="/signin">
              <button className="btn btn-dark">Sign In</button>
            </Link>
            <Link to="/signup">
              <button className="btn btn-light">Create Account</button>
            </Link>
          </div>
        </div>
      ) : user ? (
        <div className="profile-card">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default MyProfile;

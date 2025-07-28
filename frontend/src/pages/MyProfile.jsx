import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/MyProfile.css';

function MyProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Check if token is exist
        if (!token) {
            setError('Sign in to view your Profile.');
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
                console.error('Profile fetch error:', err);
                setError('Unauthorized. Please login first.');
            }
        };

        fetchProfile();
    }, [token]);

    return (
        <div className="profile-container">
            <h2 className="title"> {user ? 'My Profile' : 'Welcome Guest'} </h2>
            <div className="underline"></div>

            {/* Will show an error and sign-in buttons if not logged in */}
            {error && !user ? (
                <div className="error-box">
                    <p className="error-text">{error}</p>
                    <div className="auth-buttons">
                        <Link to="/signin" className="auth-button">Sign In</Link>
                        <Link to="/signup" className="auth-button">Sign Up</Link>
                    </div>
                </div>
            ) : user ? (
                <div className="profile-card">
                    <p className="profile-item"><span className="label">Name:</span> {user.name}</p>
                    <p className="profile-item"><span className="label">Email:</span> {user.email}</p>
                    <p className="profile-item"><span className="label">Role:</span> {user.role}</p>
                </div>
            ) : (
                <p>Loading profile...</p>
            )}
        </div>
    );
}

export default MyProfile;

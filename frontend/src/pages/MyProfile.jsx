import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/MyProfile.css';

function MyProfile() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:3000/api/user/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                });
                setUser(res.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
                setError('Unauthorized. Please login first.');
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="profile-container">
            <h2 className="title">My Profile</h2>
            <div className="underline"></div>

            {error && <p className="error-text">{error}</p>}

            {user ? (
                <div className="profile-card">
                    <p className="profile-item"><span className="label">Name:</span> {user.name}</p>
                    <p className="profile-item"><span className="label">Email:</span> {user.email}</p>
                    <p className="profile-item"><span className="label">Role:</span> {user.role}</p>
                </div>
            ) : !error ? (
                <p>Getting user's profile...</p>
            ) : null}
        </div>
    );
}

export default MyProfile;

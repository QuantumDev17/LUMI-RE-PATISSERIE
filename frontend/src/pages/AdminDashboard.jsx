import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // Redirect if not logged in or not admin
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  return (
    <div style={{ maxWidth: 800, margin: '40px auto' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, admin! Here you can manage products, orders, users, etc.</p>
      {/* Add links/buttons to admin features here */}
    </div>
  );
}

export default AdminDashboard;

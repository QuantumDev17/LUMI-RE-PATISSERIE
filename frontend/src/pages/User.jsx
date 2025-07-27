import React from 'react';
import { Link } from 'react-router-dom';

function User() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2>User not logged in.</h2>
        <Link to="/signin">Go to Login</Link>
      </div>
    );
  }

  return (
    <div>
      <main style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Welcome, {user.name}! You can make an order and pick up at the store.</h2>
      </main>
    </div>
  );
}

export default User;

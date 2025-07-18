import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

function User() {

  const { username } = useAuth();

  const WelcomeMessage = () => {
    localStorage.setItem('user', username);
    return (
      <h2>
        Welcome, {username}! You can make an order and pick up at the store.
      </h2>
    );
  };

  return (
    <div>
      <UserNavigation />
      <main>
        <WelcomeMessage />
      </main>
    </div>
  );
};

export default User;
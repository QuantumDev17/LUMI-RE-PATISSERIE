import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.withCredentials = true;

function User() {

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const username = storedUser?.name || 'Guest';

  const WelcomeMessage = () => {
    localStorage.setItem('user', username);
    return (
      <h2>
        Welcome, {username}! You can make an order and pick up at the store.
      </h2>
    );
  };

};

export default User;
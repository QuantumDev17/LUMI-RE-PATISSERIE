import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove token and user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirect to homepage
    navigate('/');
  }, [navigate]);

  return null; // Optional: you can return a spinner/loading message here
}

export default Logout;

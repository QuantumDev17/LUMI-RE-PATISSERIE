import React from 'react';
import { Link } from 'react-router-dom';

export default function GiftCard() {
  return (
    <div style={{
      fontFamily: '"Raleway", sans-serif',
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      width: '100vw',
      minHeight: '100vh',
      position: 'relative',
      left: 'calc(-50vw + 50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        fontWeight: '400',
        color: '#374040',
        marginBottom: '1rem'
      }}>
        Coming Soon
      </h1>

      <div style={{
        width: '50px',
        height: '3px',
        background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
        marginBottom: '1rem'
      }}></div>

      <p style={{
        fontSize: '1.1rem',
        color: '#555',
        marginBottom: '2rem'
      }}>
        We’re cooking up something special. Check back soon for Lumière Gift Cards!
      </p>

      <Link to="/" style={{
        fontSize: '1rem',
        color: '#374040',
        textDecoration: 'underline'
      }}>
        Continue shopping
      </Link>
    </div>
  );
}

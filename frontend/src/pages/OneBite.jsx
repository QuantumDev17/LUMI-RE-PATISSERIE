import React from 'react';
import '../styles/OneBite.css'; // Make sure this file has correct styles

const onebiteProducts = [
  {
    name: 'Petit Fours (Box of 4)',
    image: '/4.png',
    price: '$18.00'
  },
  {
    name: 'Petit Fours (Box of 12)',
    image: '/12.png',
    price: '$54.00'
  }
];

function OneBites() {
  return (
    <div className="onebite-page">
      {/* ✅ Zoomed banner */}
      <div
        style={{
          position: "relative",
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          background: "url('/Bites.jpg') center/cover no-repeat",
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '80px',
          overflow: 'hidden',
        }}
      >
        <div style={{ color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          <p style={{
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            fontFamily: "'Helvetica Neue', sans-serif"
          }}>
            Bite-Sized Creations
          </p>
          <h1 style={{
            fontSize: '52px',
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            margin: 0
          }}>
            Petit Fours
          </h1>
        </div>
      </div>

      {/* ✅ Product Grid */}
      <div className="onebite-collection">
        {onebiteProducts.map((product, index) => (
          <div className="onebite-card" key={index}>
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OneBites;

import React from 'react';
import '../styles/Bread.css';

const breadProducts = [
  {
    name: '100% whole Wheat & Seeds',
    image: '/Sourdough.png',
    price: '$7.50'
  },
  {
    name: 'Country Loaf with Sundried Tomatoes & Garlic',
    image: '/Plain.png',
    price: '$7.50'
  },
  {
    name: 'Rye & Walnuts',
    image: '/Rye.png',
    price: '$7.50'
  },
  {
    name: 'Classic Challah (Fridays Only)',
    image: '/Classic Challah.jpg',
    price: '$7.50'
  },
  {
    name: 'German Baguette',
    image: '/germanbaguette.jpg',
    price: '$7.50'
  },
  {
    name: 'Tartine',
    image: '/Sun-dried.png',
    price: '$7.50'
  },
  {
    name: 'Country Loaf With Greek Olives',
    image: '/Olive.png',
    price: '$7.50'
  },
  {
    name: 'Japanese Milk Bread',
    image: '/japanesemilkbread.jpg',
    price: '$10.50'
  }
];

function Bread() {
  return (
    <div className="bread-page">
      {/* Zoomed Banner */}
      <div
        className="bread-banner"
        style={{
          position: "relative",
          width: '100vw',
          left: '50%',
          right: '50%',
          marginLeft: '-50vw',
          marginRight: '-50vw',
          background: "url('/bread.jpg') center/cover no-repeat",
          minHeight: '500px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '80px',
          overflow: 'hidden'
        }}
      >
        <div style={{ color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.6)' }}>
          <p style={{
            fontSize: '16px',
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '0.5rem',
            fontFamily: "'Filson Pro', sans-serif"
          }}>
            Breads & Buns
          </p>
          <h1 style={{
            fontSize: '52px',
            fontWeight: 500,
            fontFamily: "'Filson Pro', sans-serif",
            margin: 0
          }}>
            Boulangerie
          </h1>
        </div>
      </div>

      {/* Product Grid */}
      <div className="bread-collection">
        {breadProducts.map((product, index) => (
          <div key={index} className="bread-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bread;

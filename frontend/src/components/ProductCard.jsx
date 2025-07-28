import React from 'react';
import '../styles/EBoutique.css';

function ProductCard({ name, image }) {
  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-img" />
      <div className="product-name">{name}</div>
    </div>
  );
}

export default ProductCard;

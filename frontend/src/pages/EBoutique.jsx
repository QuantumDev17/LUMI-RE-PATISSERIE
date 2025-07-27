import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/EBoutique.css';

const categories = [
  { name: 'Cakes', image: '/Coconut.png', link: '/cakes' },
    { name: 'Personal Desserts', image: '/Heart.png', link: '/personaldesserts' },
  { name: 'One-Bite Creations', image: '/Bitters.png', link: '/onebites' },
  { name: 'Pastries', image: '/pastry.png', link: '/pastries' },
  { name: 'Breads', image: '/breads.png', link: '/bread' },
  { name: 'Delicatessen', image: '/Delicatessen.png' },
  { name: 'Bakery Shelf', image: '/bakershelf.png' }
];

function EBoutique() {
  return (
    <div className="eboutique">
      <h1 className="title">E-BOUTIQUE</h1>
      <div className="underline" />
      <div className="product-grid">
        {categories.map((item, index) => {
          const card = <ProductCard name={item.name} image={item.image} />;
          return item.link ? (
            <Link to={item.link} key={index}>
              {card}
            </Link>
          ) : (
            <div key={index}>{card}</div>
          );
        })}
      </div>
    </div>
  );
}

export default EBoutique;

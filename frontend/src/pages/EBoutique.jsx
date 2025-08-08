import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import '../styles/EBoutique.css';

const categories = [
  { name: 'Cakes', image: '/cake/Coconut.png', link: '/cakes' },
    { name: 'Personal Desserts', image: '/personal-dessert/Heart.png', link: '/personal-desserts' },
  { name: 'One-Bite Creations', image: '/Bitters.png', link: '/onebite' },
  { name: 'Pastries', image: '/pastry/pastry.png', link: '/pastries' },
  { name: 'Breads', image: 'breads.png', link: '/bread' },
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

import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Cakes.css';

const cakes = [
    {
        name: 'Noisette Noir',
        image: '/Noisette Noir.png',
        price: '$56.00',
        link: '/product/noisette-noir'
    },
    {
        name: 'Lumiere Cheesecake',
        image: '/Lumiere Cheesecake.png',
        price: '$36.00',
        link: '/product/lumiere-cheesecake'
    },
    {
        name: 'Coconut Dream (Gluten Free & Dairy Free)',
        image: '/Coconut Dream (Gluten Free & Dairy Free).png',
        price: '$55.00',
        link: '/product/coconut-dream'
    },
    {
        name: 'Fraisier',
        image: '/Fraisier.png',
        price: '$45.00',
        link: '/product/fraisier'
    }
];

function Cake() {
    return (
        <div className="cake-page">
            {/* Full-Width Banner */}
            <div
                style={{
                    position: "relative",
                    width: '100vw',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    background: "url('/Strawberry.png') center/cover no-repeat",
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    paddingLeft: '80px',
                    color: '#fff',
                    textAlign: 'left'
                }}
            >
                <p style={{
                    fontSize: '22px',
                    fontWeight: 500,
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    marginBottom: '-3rem',
                    textShadow: '1px 1px 5px rgba(0, 0, 0, 0.5)',
                    fontFamily: "'Filson Pro', sans-serif"
                }}>
                    CAKES
                </p>
                <h1 style={{
                    fontSize: '72px',
                    fontWeight: 150,
                    textShadow: '2px 2px 6px rgba(0, 0, 0, 0.5)',
                    fontFamily: "'Magnat', serif"
                }}>
                    Gâteaux
                </h1>
            </div>

            {/* Sort Dropdown */}
            <div className="sort-box">
                <label>Sort by:</label>
                <select>
                    <option>Best selling</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                </select>
            </div>

            {/* Product Grid */}
            <div className="cake-collection">
                {cakes.map((cake, index) => (
                    <Link to={cake.link} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div className="cake-card">
                            <img src={cake.image} alt={cake.name} />
                            <h3>{cake.name}</h3>
                            <p>{cake.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Cake;

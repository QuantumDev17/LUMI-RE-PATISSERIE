import React from 'react';
import '../styles/PersonalDesserts.css';

const desserts = [
    {
        name: 'Sweet Pleasure',
        image: '/Sweet.png',
        price: '$9.00'
    },
    {
        name: 'Black Forest',
        image: '/Black Forest.png',
        price: '$8.00'
    },
    {
        name: 'Tiramichoux',
        image: '/Tiramichoux.png',
        price: '$10.00'
    },
    {
        name: 'Peaches & Cream',
        image: '/Rings of Paris.png',
        price: '$10.00'
    },
    {
        name: 'Peaches & Cream',
        image: '/Peaches & Cream.png',
        price: '$11.00'
    },
    {
        name: 'Petit Berry Tart',
        image: '/Creme Berry Tart.png',
        price: '$10.00'
    },
    {
        name: 'Pistachio Lemon Meringue (Dairy Free & Gluten Free)',
        image: '/Lemon Pistachio Meringue.png',
        price: '$9.00'
    },
    {
        name: 'Cream & Crumb',
        image: '/Cream & Crumb.png',
        price: '$9.00'
    }
];

function PersonalDesserts() {
    return (
        <div className="desserts-page">
            {/* Banner */}
            <div
                style={{
                    position: "relative",
                    width: '100vw',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    background: "url('/Sweet.png') center/cover no-repeat",
                    minHeight: '500px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start', // 👈 Align text to the left
                    paddingLeft: '80px',      // 👈 Add left padding
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
                        PERSONAL DESSERTS
                    </p>
                    <h1 style={{
                        fontSize: '52px',
                        fontWeight: 700,
                        fontFamily: "'Playfair Display', serif",
                        margin: 0
                    }}>
                        Petit Gâteaux
                    </h1>
                </div>
            </div>

            {/* Product Grid */}
            <div className="dessert-collection">
                {desserts.map((dessert, index) => (
                    <div className="dessert-card" key={index}>
                        <img src={dessert.image} alt={dessert.name} />
                        <h3>{dessert.name}</h3>
                        <p>{dessert.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PersonalDesserts;

import React from 'react';
import '../styles/Pastries.css'; // Make sure the path is correct

function Pastries() {
    return (
        <div className="pastries-page">
            {/* ✅ Banner */}
            <div
                className="pastries-banner"
                style={{
                    position: 'relative',
                    width: '100vw',
                    left: '50%',
                    right: '50%',
                    marginLeft: '-50vw',
                    marginRight: '-50vw',
                    background: "url('/pastry/croisants.jpg') center/cover no-repeat",
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
                    <p
                        style={{
                            fontSize: '16px',
                            fontWeight: 550,
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            marginBottom: '0.5rem',
                            fontFamily: "'Helvetica Neue', sans-serif",
                        }}
                    >
                        SIGNATURE PASTRIES
                    </p>
                    <h1
                        style={{
                            fontSize: '52px',
                            fontWeight: 700,
                            fontFamily: "'Helvetica Neue', sans-serif",
                            margin: 0,
                        }}
                    >
                        Viennoiseries
                    </h1>
                </div>
            </div>

            {/* ✅ Show "no products" message */}
            <div className="pastries-empty">
                Sorry, there are no products in this collection
            </div>
        </div>
    );
}

export default Pastries;

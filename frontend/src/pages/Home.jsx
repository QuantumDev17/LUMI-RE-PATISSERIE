import React from 'react';
import { Link } from 'react-router-dom';

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '0 24px',
};

function Home() {
  return (
    <div>
      {/* HERO SECTION */}
      <div
        style={{
          position: "relative",
          width: '100vw',
          left: '50%',
          marginLeft: '-50vw',
          background: "url('/desserts.jpg') center/cover no-repeat",
          minHeight: '650px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.36)",
          zIndex: 1
        }} />
        <div style={{ position: "relative", zIndex: 2, width: "100%", textAlign: "center" }}>
          <h1 style={{
            color: '#fff',
            fontSize: '3rem',
            fontWeight: 'bold',
            textShadow: '2px 2px 8px #333',
            marginTop: '100px'
          }}>
            Artfully Crafted, Made for Sharing
          </h1>
          <Link to="/e-boutique" style={{
            background: '#fff',
            color: '#b37c40',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            padding: '16px 40px',
            border: 'none',
            borderRadius: '6px',
            margin: '2rem 0',
            boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Browse E-Boutique
          </Link>
        </div>
      </div>

      {/* PRODUCT SECTION */}
      <div style={{ width: '100%', background: '#fafafa', paddingTop: 40, paddingBottom: 40 }}>
        <div style={containerStyle}>
          <h2 style={{
            color: '#624320',
            fontWeight: 'bold',
            fontSize: '2rem',
            marginBottom: '2.5rem',
            letterSpacing: 1,
          }}>
            Patisserie
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(320px, 1fr))',
            gap: '80px',
            justifyItems: 'center',
            alignItems: 'center',
          }}>
            {/* Cakes */}
            <div>
              <img src="/tiramisu.png" alt="Cakes" style={{
                width: 320,
                height: 320,
                borderRadius: 24,
                objectFit: 'cover',
                marginBottom: 18,
                background: '#fff'
              }} />
              <div style={{
                color: '#795223',
                fontWeight: 700,
                fontSize: '1.35rem',
                textAlign: 'center'
              }}>Cakes</div>
            </div>

            {/* Personal Desserts */}
            <div>
              <img src="/Tiramichoux.png" alt="Personal Desserts" style={{
                width: 320,
                height: 320,
                borderRadius: 24,
                objectFit: 'cover',
                marginBottom: 18,
                background: '#fff'
              }} />
              <div style={{
                color: '#795223',
                fontWeight: 700,
                fontSize: '1.35rem',
                textAlign: 'center'
              }}>Personal Desserts</div>
            </div>

            {/* One-Bite Assortments */}
            <div>
              <img src="/12OneBiters.png" alt="One-Bite Assortments" style={{
                width: 320,
                height: 320,
                borderRadius: 24,
                objectFit: 'cover',
                marginBottom: 18,
                background: '#fff'
              }} />
              <div style={{
                color: '#795223',
                fontWeight: 700,
                fontSize: '1.35rem',
                textAlign: 'center'
              }}>One-Bite Assortments</div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED SECTION */}
      <div style={{ ...containerStyle, marginTop: 60 }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 64,
        }}>
          <div style={{ flex: 1, minWidth: 300 }}>
            <h3 style={{
              color: '#444',
              fontWeight: 700,
              fontSize: '1.5rem',
              marginBottom: 12
            }}>
              A little treat for the senses
            </h3>
            <p style={{
              color: '#222',
              lineHeight: 1.6,
              marginBottom: 22,
              maxWidth: 320
            }}>
              Paired with a steaming cappuccino, it is a true cinematic experience of the aromas and flavours of Paris
            </p>
            <button style={{
              background: '#FFC7A1',
              color: '#7B512C',
              border: 'none',
              borderRadius: 3,
              padding: '12px 32px',
              fontWeight: 600,
              fontSize: '1rem',
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}>
              SEE PETITS GÂTEAUX
            </button>
          </div>

          <div style={{ flex: 1, minWidth: 320, textAlign: 'center' }}>
            <img src="/Peaches & Cream.png" alt="Petit Gateaux" style={{
              width: 350,
              height: 350,
              objectFit: 'cover',
              borderRadius: 18,
              marginBottom: 24,
            }} />
            <div>
              <img src="/Strawberry Cheesecake Tart.png" alt="Tart" style={{
                width: 270,
                height: 270,
                objectFit: 'cover',
                borderRadius: 16,
                marginLeft: -180,
                display: 'block'
              }} />
            </div>
          </div>
        </div>

        {/* BOULANGERIE & DELICATESSEN */}
        <div style={{ width: '100%', marginTop: 70, marginBottom: 10 }}>
          <h2 style={{
            fontWeight: '400',
            fontSize: '1.5rem',
            marginBottom: '1rem',
            color: '#303030'
          }}>
            Boulangerie, Delicatessen & Biscuits
          </h2>
        </div>

        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {/* Each bakery card */}
          {[
            { src: '/Plain Sourdough.png', title: 'BOULANGERIE', subtitle: 'Artisanal Breads' },
            { src: '/Almond Criossant.png', title: 'ÉTAGÈRE DE BOULANGERIE', subtitle: 'Bakery Shelf' },
            { src: '/Cinnamon Lemon Roll.png', title: 'DELICATESSEN', subtitle: 'Spreads & Quiches' },
          ].map((item, index) => (
            <div key={index} style={{ position: 'relative', overflow: 'hidden', borderRadius: 16 }}>
              <img
                src={item.src}
                alt={item.subtitle}
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  bottom: 0,
                  background: 'rgba(255,255,255,0.92)',
                  padding: '12px 20px 10px 16px',
                  fontWeight: '500',
                  fontSize: '1rem',
                  color: '#303030'
                }}
              >
                <div style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: 0.5 }}>{item.title}</div>
                <div style={{ fontSize: '1.04rem', color: '#234', fontWeight: 700 }}>{item.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

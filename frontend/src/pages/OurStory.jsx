import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function OurStory() {
  const navigate = useNavigate();

  return (
    <div style={{
      fontFamily: '"Raleway", sans-serif',
      color: '#222',
      backgroundColor: '#fff',
      margin: 0,
      padding: 0,
      width: '100vw',
      minHeight: '100vh',
      position: 'relative',
      left: 'calc(-50vw + 50%)'
    }}>

      {/* Banner Section */}
      <section style={{
        width: '100%',
        backgroundColor: '#ffffff',
        paddingTop: '100px',
        paddingBottom: '100px',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.3rem',
          fontWeight: '400',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          margin: '0 auto',
          color: '#374040',
          lineHeight: '1.6'
        }}>
          IT’S OUR AMBITION TO SURPRISE YOU. IT’S OUR INTENTION TO DELIGHT YOU.
        </h2>
      </section>

      {/* Be Our Guest Section */}
      <section style={{
        width: '100%',
        backgroundColor: '#ffffff',
        padding: '4rem 2rem 6rem',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ flex: '1 1 500px' }}>
            <img
              src="/be-our-guest-bread.png"
              alt="Be our guest pastry"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '400',
              color: '#374040',
              marginBottom: '1rem'
            }}>
              Be our guest
            </h2>
            <p style={{
              fontSize: '1.1rem',
              lineHeight: '1.8',
              color: '#444'
            }}>
              Deep aromas will greet you as you enter Lumière Patisserie — a sweet zest, a delicate spice.
              <br /><br />
              Share a petit gateau and sip a cappuccino on the banks of the Seine; our methods are Parisian,
              and our flavours are harvested from the rich soils and orchards of Ontario.
            </p>
          </div>
        </div>
      </section>

      {/* Lumière Section */}
      <section style={{
        width: '100%',
        backgroundColor: '#f5f7f7',
        padding: '4rem 2rem',
        boxSizing: 'border-box'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <div style={{ flex: '1 1 500px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: '#666' }}>\\ LUMIÈRE \\</p>
            <h2 style={{ fontSize: '2.5rem', margin: '0.5rem 0', color: '#374040' }}>Light</h2>
            <div style={{ width: '50px', height: '3px', background: 'linear-gradient(to right, #ff9a9e, #fad0c4)', margin: '1rem auto' }}></div>
            <p style={{ fontSize: '1.1rem', color: '#444', maxWidth: '500px', margin: '0 auto' }}>
              We take our name from the French word for light "Lumière".
            </p>
          </div>
          <div style={{ flex: '1 1 500px' }}>
            <img
              src="/lumiere-light.png"
              alt="Rainbow light projection"
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </div>
        </div>
      </section>

      {/* Dual Image Navigation Section */}
<section style={{
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  cursor: 'pointer'
}}>
  <div
    onClick={() => navigate('/')}
    style={{
      flex: '1 1 50%',
      position: 'relative',
      overflow: 'hidden',
      height: '400px' // <-- Add fixed height
    }}
  >
    <img
      src="\personal-dessert\Cream & Crumb.png"
      alt="E-Boutique"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
    />
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#fff',
      fontSize: '2rem',
      fontWeight: '400'
    }}>
      E-Boutique
    </div>
  </div>

  <div
    onClick={() => navigate('/contact')}
    style={{
      flex: '1 1 50%',
      position: 'relative',
      overflow: 'hidden',
      height: '400px' // <-- Add fixed height
    }}
  >
    <img
      src="/bread/country-loaf.png"
      alt="Visit Lumière"
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
    />
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: '#fff',
      fontSize: '2rem',
      fontWeight: '400'
    }}>
      Visit Lumière
    </div>
  </div>
</section>
    </div>
  );
}

import React from 'react';

export default function Contact() {
  return (
    <div style={{
  fontFamily: '"Raleway", sans-serif',
  backgroundColor: '#fff',
  margin: 0,
  padding: 0,
  width: '100vw',
  minHeight: '100vh',
  position: 'relative',
  left: 'calc(-50vw + 50%)',
  overflow: 'hidden'  // <-- Add this line
}}>


      {/* Contact Info Section */}
      <section style={{
        paddingTop: '100px',
        paddingBottom: '0px',
        width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '4rem',
        flexWrap: 'wrap',
        paddingLeft: '2rem',
        paddingRight: '2rem'
      }}>
        {/* Contact Info */}
        <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
          <h2 style={{
            fontSize: '2rem',
            fontWeight: '400',
            color: '#374040',
            marginBottom: '1.5rem'
          }}>
            Visit Us
          </h2>

          <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Hours</p>
          <p style={{ marginBottom: '1rem' }}>
            Monday, Off<br />
            Tuesday, 9am - 7pm<br />
            Wednesday, 9am - 7pm<br />
            Thursday, 9am - 7pm<br />
            Friday, 9am - 7pm<br />
            Saturday, 9am - 7pm<br />
            Sunday, 9am - 7pm
          </p>

          <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Phone</p>
          <p style={{ marginBottom: '1rem' }}>(647) 293-8815</p>

          <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Email</p>
          <p style={{ marginBottom: '1rem' }}>contact@LumierePatisserie.ca</p>

          <p style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Address</p>
          <p style={{ marginBottom: '0.5rem' }}>
            1102 Centre St<br />
            Thornhill, ON L4J 3M8, Canada
          </p>
          <a href="https://www.google.com/maps/place/Lumi%C3%A8re+P%C3%A2tisserie/@43.8089956,-79.4643976,17z/data=!3m2!4b1!5s0x882b2c2571548749:0xb2d5338425c0ba65!4m6!3m5!1s0x882b2d3656ef54a1:0xfc1b28b01a017991!8m2!3d43.8089956!4d-79.4618227!16s%2Fg%2F11r_dmkggr?entry=ttu&g_ep=EgoyMDI1MDcyMy4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" style={{
            color: '#374040',
            textDecoration: 'underline'
          }}>Directions</a>
        </div>

        {/* Image */}
        <div style={{ flex: '1 1 400px', maxWidth: '500px' }}>
          <img
            src="/sliced-bread.png"
            alt="Sliced country bread"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px',
              objectFit: 'cover'
            }}
          />
        </div>
      </section>

      {/* Contact Form Section */}
      <section style={{
        width: '100%',
        backgroundColor: '#fff',
        padding: '4rem 2rem 6rem',
        textAlign: 'center',
        boxSizing: 'border-box'
      }}>
        <h2 style={{
          fontSize: '2.5rem',
          fontWeight: '400',
          color: '#374040'
        }}>
          Get in touch
        </h2>
        <div style={{
          width: '50px',
          height: '3px',
          background: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
          margin: '1rem auto 2rem'
        }}></div>
        <p style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          marginBottom: '2rem',
          color: '#222'
        }}>
          Ask a question or share a suggestion. We always love to hear from you.
        </p>

        <form style={{ maxWidth: '600px', margin: '0 auto' }}>
          <input
            type="text"
            placeholder="Name"
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '2px'
            }}
          />
          <input
            type="email"
            placeholder="Email"
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '2px'
            }}
          />
          <textarea
            placeholder="Message"
            rows="5"
            style={{
              width: '100%',
              padding: '1rem',
              marginBottom: '1.5rem',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '2px'
            }}
          />
          <button type="button" style={{
  padding: '0.75rem 2rem',
  fontSize: '1rem',
  backgroundColor: '#fff',
  border: '1px solid #aaa',
  color: '#374040', // <== Added this line
  cursor: 'pointer'
}}>
  Send
</button>

        </form>
      </section>
    </div>
  );
}

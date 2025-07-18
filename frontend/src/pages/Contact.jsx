// Contact.jsx
import React from 'react';
import '../styles/contact.css';

function Contact() {
  return (
    <div>
      <main>
        <section>
          <h2>Contact Us</h2>
          <ContactForm />
        </section>
        <section>
          <h2>Visit Our Partner Website</h2>
          <p>Check out our partner's website for more information.</p>
          <a href="https://www.lumierepatisserie.com" target="_blank" rel="noopener noreferrer">Lumiere Patisserie</a>
        </section>
      </main>
    </div>
  );
}

export default Contact;
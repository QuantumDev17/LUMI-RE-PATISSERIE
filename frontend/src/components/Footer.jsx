import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-columns">
        {/* Social / Intro */}
        <div className="footer-column">
          <h3>Oh La La!</h3>
          <p>We bake with love. Join us</p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <ul>
            <li><a href="#">E-Boutique</a></li>
            <li><a href="#">Our Story</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Lumière Gift Card</a></li>
          </ul>
        </div>

        {/* Info */}
        <div className="footer-column">
          <ul>
            <li><a href="#">Pickup & Delivery</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">FAQ</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column">
          <h4>Contact</h4>
          <p>(647) 293-8815</p>
          <p>1102 Centre St #1, Thornhill, ON L4J 3M8</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Lumière Patisserie.<br />Created by</p>
        <img src="/Home/quantumdev.png" alt="Team Logo" className="footer-logo" />
      </div>
    </footer>
  );
}

export default Footer;

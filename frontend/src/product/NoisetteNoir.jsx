import React, { useState } from 'react';
import '../styles/ProductDetail.css'; // CSS file

const images = [
  '/Noisette Noir.png',
  '/Noisette Noir1.png',
  '/Noisette Noir2.png'
];

const NoisetteNoir = () => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState({ size: true, ingredients: false, allergens: false });

  const toggle = (key) => {
    setOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="product-container">
      {/* Left Image Section */}
      <div className="product-images">
        <img src={selectedImage} alt="Noisette Noir" className="main-image" />
        <div className="thumbnail-group">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Noisette ${index}`}
              className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right Detail Section */}
      <div className="product-details">
        <h2>Noisette Noir</h2>
        <p className="price">$56.00</p>

        {/* Quantity + Add to Cart in one row */}
        <div className="cart-row">
          <div className="quantity-wrapper">
            <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))}>−</button>
            <input
              type="text"
              value={quantity}
              readOnly
              aria-label="Quantity"
              className="quantity-input"
            />
            <button onClick={() => setQuantity(prev => prev + 1)}>+</button>
          </div>
          <button className="add-to-cart with-rainbow-border">
            Add to Cart
          </button>

        </div>

        {/* Accordion */}
        <div className="accordion">
          <div onClick={() => toggle('size')} className="accordion-header">
            Serving size <span>{open.size ? '-' : '+'}</span>
          </div>
          {open.size && <div className="accordion-body">Serves 10–12</div>}

          <div onClick={() => toggle('ingredients')} className="accordion-header">
            Ingredients <span>{open.ingredients ? '-' : '+'}</span>
          </div>
          {open.ingredients && (
            <div className="accordion-body">
              Cocoa crumble & hazelnut crunch, dark chocolate cremeux, dense milk chocolate mousse, cocoa sacher
            </div>
          )}

          <div onClick={() => toggle('allergens')} className="accordion-header">
            Allergens <span>{open.allergens ? '-' : '+'}</span>
          </div>
          {open.allergens && (
            <div className="accordion-body">
              Our products may contain dairy, nuts, and other allergens. Although we take every precaution to prevent cross-contamination, all of our products are baked in the same facility and may contain traces of allergens. If you have questions or concerns, we'll be happy to provide more information.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoisetteNoir;

import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import GiftCard from './pages/GiftCard';
import User from './pages/User';
import OurStory from './pages/OurStory';
import './styles/style.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/gift-card" element={<GiftCard />} />
          <Route path="/user" element={<User />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* fallback */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;

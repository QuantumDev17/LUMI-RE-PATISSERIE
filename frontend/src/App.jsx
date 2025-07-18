import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import User from './pages/User';
import './styles/style.css';

function App() {
  // If you add authentication later, bring back username, etc.

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <main style={{ maxWidth: '1200px', margin: '2rem auto', padding: '0 1rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

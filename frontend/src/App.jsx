import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import User from './pages/User';
import EBoutique from './pages/EBoutique'; 
import Cakes from './pages/Cakes';
import PersonalDesserts from './pages/PersonalDesserts';
import OneBite from './pages/OneBite';
import Pastries from './pages/Pastries';
import Bread from './pages/Bread';
import './styles/style.css';


function App() {
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
            <Route path="/e-boutique" element={<EBoutique />} />
            <Route path="/cakes" element={<Cakes />} />
            <Route path="/personaldesserts" element={<PersonalDesserts />} />
            <Route path="/onebites" element={<OneBite />} />
            <Route path="/pastries" element={<Pastries />} />
            <Route path="/bread" element={<Bread />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


import Home from './pages/Home.jsx';
import './styles/style.css';

import MakeOrder from './pages/MakeOrder.jsx';
import EBoutique from './pages/EBoutique.jsx';
import Contact from './pages/Contact';
import GiftCard from './pages/GiftCard';
import User from './pages/User';
import OurStory from './pages/OurStory';

import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Account from './pages/Account.jsx';
import Signup from './pages/Signup.jsx';
import Signin from './pages/Signin.jsx';
import Logout from './pages/Logout.jsx';
import AdminPage from './pages/AdminPage.jsx';


import Bread from './pages/Bread.jsx';
import Cakes from './pages/Cakes.jsx';
import Pastries from './pages/Pastries.jsx';
import OneBite from './pages/OneBite.jsx';
import PersonalDesserts from './pages/PersonalDesserts.jsx';
import NoisetteNoir from './product/NoisetteNoir';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make-order" element={<MakeOrder />} />
        <Route path="/e-boutique" element={<EBoutique />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/gift-card" element={<GiftCard />} />
        <Route path="/account" element={<Account />} />
        <Route path="/user" element={<User />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/logout" element={<Logout />} />

        {/* Admin Dashboard Route */}
        {/* Uncomment the next line if you want to protect the admin route */}
        {/* <Route path="/admin-dashboard" element={User?.role === "admin" ? <AdminPage /> : <Navigate to="/signin" />} /> */}
        {/* This is a placeholder for the admin dashboard, adjust as needed */}
        <Route path="/admin-dashboard" element={<AdminPage/>} />

        <Route path="/bread" element={<Bread />} />
        <Route path="/cakes" element={<Cakes />} />
        <Route path="/pastries" element={<Pastries />} />
        <Route path="/onebite" element={<OneBite />} />
        <Route path="/personal-desserts" element={<PersonalDesserts />} />

        <Route path="/product/noisette-noir" element={<NoisetteNoir />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
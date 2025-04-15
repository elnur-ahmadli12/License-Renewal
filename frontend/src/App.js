import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Company from './pages/Company';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Contact from './pages/Contact';
import Login from './pages/Loginn';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import SuccessPage from './components/SuccessPage';
function App() {
  return (
    <>
     <Navbar/>
    
      <Routes>
        <Route path="/" element={
          <>
         <HomePage/>
          </>
        } />
        <Route path="/company" element={<Company />} />
        <Route path="/home" element={< HomePage />} />
        <Route path="/contact" element={< Contact />} />
        <Route path="/login" element={< Login />} />
        <Route path="/profile" element={<Profile />} /> {/* Yeni ekledik */}
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
       
      </Routes>
      <Footer/>
    </>
  );
}

export default App;

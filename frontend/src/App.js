import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'; 
import Company from './pages/Company';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Contact from './pages/Contact';
import Login from './pages/Loginn';
import Profile from './pages/Profile';
import AddVehicleForm from './components/AddVehicleForm';

import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <>
     <BrowserRouter>
     <Navbar/>
     <AuthProvider>
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
        <Route path="/add-vehicle" element={<AddVehicleForm />} />
      </Routes>
      </AuthProvider>
      <Footer/>
      
      </BrowserRouter>
      
    </>
  );
}

export default App;

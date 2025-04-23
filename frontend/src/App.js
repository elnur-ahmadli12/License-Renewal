import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Company from './pages/Company';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Login from './pages/Loginn';
import Profile from './pages/Profile';
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import ProfileE from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfileE />} />
          {/* Tüm private routelar burada */}
          <Route element={<PrivateRoute />}>
            <Route path="/UserDashboard" element={<UserDashboard />} />
          </Route>
          
          {/* Fallback route */}
          
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/company" element={<Company />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Footer" element={<Footer />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
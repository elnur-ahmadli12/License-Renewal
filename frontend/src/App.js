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
import Subscription from './pages/Subscription';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      
        {/* Ana Layout Container */}
        <div className="flex flex-col min-h-screen">
          
          {/* TEK Navbar - SADECE BURADA */}
         
          
          {/* Ana İçerik Alanı */}
          <main className="flex-grow">
          <Navbar />
            <Routes>
              {/* Ana Sayfa Route'ları */}
              <Route index element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              
              {/* Diğer Sayfalar */}
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/company" element={<Company />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/Plans" element={<Subscription />} />
              {/* Private Route'lar */}
              <Route element={<PrivateRoute />}>
                <Route path="/UserDashboard" element={<UserDashboard />} />
              </Route>
              
              {/* Fallback Route */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
        </div>
      </AuthProvider>
    </BrowserRouter>
   );
  }
  
  export default App;
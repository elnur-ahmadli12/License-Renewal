<<<<<<< HEAD
import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route ,Outlet, Link} from 'react-router-dom'; 
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> d58c823f01ee7c37545d64904b2a9f145cc232fc
import Company from './pages/Company';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Login from './pages/Loginn'; 
import Profile from './pages/Profile';
<<<<<<< HEAD
import AddVehicleForm from './components/AddVehicleForm';
import { AuthProvider } from './context/AuthContext';
import DashboardSidebar from "./components/DashboardSidebar/DashboradSidebar";
import DashboardHeader from "./components/DashboardHeader/DashboardHeader";
import DashboardHome from "./components/DashboardHeader/DashboardHome";

function PublicLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

function DashboardLayout({isSidebarOpen, toggleSidebar, sidebarRef}) {
    return (
        <>
            <DashboardHeader toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen}  />
            <DashboardSidebar isSidebarOpen={isSidebarOpen}/>
            <Outlet />
        </>
    );
}

function App() {
    const [isSidebarOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef(null);

    // Handle outside clicks to close the sidebar
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                !event.target.classList.contains('header')
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleSidebar = () => {
        setIsOpen(prev => !prev);
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public routes */}
                    <Route element={<PublicLayout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/company" element={<Company />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                    </Route>

                    {/* Dashboard routes under /dashboard */}
                    <Route path="/dashboard" element={<DashboardLayout isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}>
                        {/* Dashboard landing shows links to sub-pages */}
                        <Route index element={<DashboardHome/>} />
                      
                    </Route>
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}
export default App;


=======
import UserDashboard from './pages/UserDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './context/AuthContext';

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
>>>>>>> d58c823f01ee7c37545d64904b2a9f145cc232fc

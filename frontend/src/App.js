import React, {useState, useEffect, useRef} from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route ,Outlet, Link} from 'react-router-dom'; 
import Company from './pages/Company';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Contact from './pages/Contact';
import Login from './pages/Loginn';
import Profile from './pages/Profile';
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



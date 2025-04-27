import React, {useEffect, useRef, useState} from 'react';
import {BrowserRouter, Route, Routes, Outlet} from 'react-router-dom';
import Home from "./Component/Pages/home/Home.jsx";
import Order from "./Component/Pages/Orders/Order.jsx";
import Menu from "./Component/Pages/item/Items.jsx";
import AuthRoutes from "./Component/Pages/auth/AuthRoutes";
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Layout from "./Layout";
import Users from "./Component/Pages/UsersList/Users";
import RegisterUser from "./Component/Pages/UsersList/Register User/RegisterUser";
import AccountSetting from "./Component/Pages/auth/Account Setting/AccountSetting";
import AddPItem from "./Component/Pages/item/additem/AddItem";
import ItemDetails from "./Component/Pages/item/itemDetails/itemDetails";
import WebsiteUI from "./Component/Pages/websiteUI/websiteUI";
import HeroSectionItem from "./Component/Pages/websiteUI/HeroSectionItem/HeroSectionItem";
import HeroSectionDetails from "./Component/Pages/websiteUI/HeroSectionItem/HeroSectionDetails/HeroDetails";
import HeroSectionAdd from "./Component/Pages/websiteUI/HeroSectionItem/HeroSectionAdd/HeroSectionAdd";
import BannerItem from "./Component/Pages/websiteUI/Banner/BannerItem";
import BannerDetail from "./Component/Pages/websiteUI/Banner/BannerDetails/BannerDetails";
import BannerAdd from "./Component/Pages/websiteUI/Banner/BannerAdd/BannerAdd";
import './stylesheet.css';
import PhotoGallery from "./Component/Pages/websiteUI/photoGallery/photoGalleryItem";
import PhotoGalleryAdd from "./Component/Pages/websiteUI/photoGallery/photoGalleryAdd/photoGalleryAdd";
import PhotoGalleryDetail from "./Component/Pages/websiteUI/photoGallery/photoGalleryDetails/photoGalleryDetails";

const ProtectedLayout = ({ isSidebarOpen, toggleSidebar, sidebarRef }) => {
    return (
        <ProtectedRoute>
            <Layout
                isSidebarOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                sidebarRef={sidebarRef}
            >
                <Outlet /> {/* Nested Routes will render here */}
            </Layout>
        </ProtectedRoute>
    );
};

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

    const toggleSidebar = (value) => {
        setIsOpen(value);
    };

    return (
        <AuthProvider>
            <Routes>
                {/* Nested Protected Routes */}
                <Route element={
                    <ProtectedLayout
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                        sidebarRef={sidebarRef}
                    />
                }>
                    <Route
                        path="/home"
                        element={
                            <Home
                                isSidebarOpen={isSidebarOpen}
                            />
                        }/>

                    <Route
                        path="/order"
                        element={
                            <Order
                                useSortableData={useSortableData}
                                isSidebarOpen={isSidebarOpen}
                            />
                        }/>

                    <Route
                        path="/items"
                        element={
                            <Menu
                                useSortableData={useSortableData}
                                isSidebarOpen={isSidebarOpen}
                            />
                        }/>

                    <Route
                        path="/products/:id"
                        element={
                            <ItemDetails
                                useSortableData={useSortableData}
                                isSidebarOpen={isSidebarOpen}
                            />

                        }/>

                    <Route
                        path="/users"
                        element={
                            <Users
                                isSidebarOpen={isSidebarOpen}
                            />
                        }/>

                    <Route
                        path="/users/register"
                        element={
                            <RegisterUser
                                isSidebarOpen={isSidebarOpen}
                            />
                        }/>

                    <Route
                        path="/account-setting"
                        element={
                            <AccountSetting
                                isSidebarOpen={isSidebarOpen}
                            />
                        }/>
                    <Route
                        path="/add-new-item"
                        element={
                            <AddPItem
                                isSidebarOpen={isSidebarOpen}
                            />
                        }/>

                    {/*website ui */}
                    <Route
                        path="/website-ui"
                        element={
                            <WebsiteUI isSidebarOpen={isSidebarOpen}/>
                        }
                    />

                    <Route
                        path="/website-ui/hero-item"
                        element={
                            <HeroSectionItem isSidebarOpen={isSidebarOpen} useSortableData={useSortableData}/>
                        }
                    />

                    <Route
                        path="/website-ui/hero-item/hero-details/:id"
                        element={
                            <HeroSectionDetails isSidebarOpen={isSidebarOpen} useSortableData={useSortableData} />
                        }
                    />

                    <Route
                        path="/website-ui/hero-item/add-new-item"
                        element={
                            <HeroSectionAdd isSidebarOpen={isSidebarOpen} useSortableData={useSortableData} />
                        }
                    />

                    {/* banner */}
                    <Route
                        path="/website-ui/banner-item"
                        element={
                            <BannerItem isSidebarOpen={isSidebarOpen} useSortableData={useSortableData}/>
                        }
                    />

                    <Route
                        path="/website-ui/banner-item/add-new-banner"
                        element={
                            <BannerAdd isSidebarOpen={isSidebarOpen} useSortableData={useSortableData}/>
                        }
                    />

                    <Route
                        path="/website-ui/banner-details/:id"
                        element={
                            <BannerDetail isSidebarOpen={isSidebarOpen} useSortableData={useSortableData} />
                        }
                    />

                    {/* photo gallery */}
                    <Route
                        path="/website-ui/photo-gallery-item"
                        element={
                            <PhotoGallery isSidebarOpen={isSidebarOpen} useSortableData={useSortableData}/>
                        }
                    />

                    <Route
                        path="/website-ui/photo-gallery-add"
                        element={
                            <PhotoGalleryAdd isSidebarOpen={isSidebarOpen} useSortableData={useSortableData}/>
                        }
                    />

                    <Route
                        path="/website-ui/photo-gallery-details/:id"
                        element={
                            <PhotoGalleryDetail isSidebarOpen={isSidebarOpen} useSortableData={useSortableData}/>
                        }
                    />

                </Route>

                {/* Unauthenticated Routes */}
                <Route path="/*" element={<AuthRoutes />} />
            </Routes>
        </AuthProvider>

    );
}

export default App;

// Sorting function for Orders and AddItem
const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = useState(config);

    // Helper function to get nested values from an object using a dot-separated key.
    const getValue = (obj, key) =>
        key.split('.').reduce((o, k) => (o ? o[k] : undefined), obj);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                const aValue = getValue(a, sortConfig.key);
                const bValue = getValue(b, sortConfig.key);

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    return { items: sortedItems, requestSort, sortConfig };
};